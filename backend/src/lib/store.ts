import { Submission, SessionStats, MisconceptionEntry, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

// In-memory store — replace with a database for production persistence
const submissions: Map<string, Submission[]> = new Map();
const users: Map<string, User> = new Map();

// --- SEED DATA ---
const defaultTeacher: User = { id: 'teacher-1', username: 'teacher1', password: 'Teacher@123', role: 'teacher' };
users.set(defaultTeacher.id, defaultTeacher);

const dummyStudents: User[] = [
  { id: 'student-1', username: 'alice', password: 'password', role: 'student' },
  { id: 'student-2', username: 'bob', password: 'password', role: 'student' },
];
dummyStudents.forEach(s => users.set(s.id, s));

const dummySubmissions: Submission[] = [
  {
    id: uuidv4(),
    sessionId: 'session-1',
    topic: 'Physics',
    question: 'A heavy bowling ball and a light tennis ball are dropped from the same height in a vacuum. Which one hits the ground first and why?',
    answer: 'The bowling ball hits first because heavier things fall faster due to gravity pulling them harder.',
    diagnosis: { correct: false, severity: 'high', misconception_name: 'Heavier Objects Fall Faster', explanation: 'You thought the heavier ball falls faster.', correct_understanding: 'All objects fall at the same rate in a vacuum.', confidence: 90 },
    timestamp: new Date().toISOString()
  },
  {
    id: uuidv4(),
    sessionId: 'session-2',
    topic: 'Biology',
    question: 'Why do giraffes have long necks? Explain how this trait evolved over time.',
    answer: 'They stretched their necks to reach high leaves and passed those longer necks to their babies.',
    diagnosis: { correct: false, severity: 'high', misconception_name: 'Lamarckian Inheritance', explanation: 'You thought stretching caused the trait to be inherited.', correct_understanding: 'Evolution happens through natural selection of existing traits.', confidence: 95 },
    timestamp: new Date().toISOString()
  },
  {
    id: uuidv4(),
    sessionId: 'session-3',
    topic: 'Physics',
    question: 'A spaceship in deep space turns off its engines. Will it eventually slow down and stop? Explain your reasoning.',
    answer: 'Yes, without the engines pushing it, it will eventually stop moving because force is needed for motion.',
    diagnosis: { correct: false, severity: 'high', misconception_name: 'Impetus Theory', explanation: 'You believed force is required to maintain motion.', correct_understanding: 'An object in motion stays in motion unless acted upon by a force.', confidence: 85 },
    timestamp: new Date().toISOString()
  }
];
submissions.set('dummy', dummySubmissions);
// -----------------

export const store = {
  // --- Auth ---
  registerUser(user: User): boolean {
    if (user.role === 'teacher') {
      return false; // Prevent new teacher registration
    }
    if (Array.from(users.values()).some((u) => u.username === user.username)) {
      return false; // username exists
    }
    users.set(user.id, user);
    return true;
  },

  getUserByUsername(username: string): User | undefined {
    return Array.from(users.values()).find((u) => u.username === username);
  },

  getUserById(id: string): User | undefined {
    return users.get(id);
  },

  // --- Submissions ---
  addSubmission(submission: Submission): void {
    const existing = submissions.get(submission.sessionId) ?? [];
    submissions.set(submission.sessionId, [submission, ...existing]);
  },

  getSubmissions(sessionId: string): Submission[] {
    return submissions.get(sessionId) ?? [];
  },

  getAllSubmissions(): Submission[] {
    const all: Submission[] = [];
    for (const subs of submissions.values()) {
      all.push(...subs);
    }
    return all.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  getSessionStats(sessionId: string): SessionStats {
    // For MVP, aggregate ALL submissions for the teacher view instead of by sessionId
    const subs = this.getAllSubmissions();

    const total = subs.length;
    const coreMisconceptions = subs.filter(
      (s) => !s.diagnosis.correct && s.diagnosis.severity === 'high'
    ).length;
    const mostlyCorrect = subs.filter((s) => s.diagnosis.correct).length;

    // Build misconception frequency map
    const nameCount: Map<string, { count: number; severity: string }> = new Map();
    for (const sub of subs) {
      if (!sub.diagnosis.correct) {
        const key = sub.diagnosis.misconception_name;
        const existing = nameCount.get(key);
        if (existing) {
          existing.count++;
        } else {
          nameCount.set(key, { count: 1, severity: sub.diagnosis.severity });
        }
      }
    }

    const misconceptionMap: MisconceptionEntry[] = Array.from(nameCount.entries())
      .map(([name, { count, severity }]) => ({
        name,
        count,
        severity: severity as MisconceptionEntry['severity'],
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      coreMisconceptions,
      mostlyCorrect,
      misconceptionMap,
      recentSubmissions: subs.slice(0, 20),
    };
  },
};

