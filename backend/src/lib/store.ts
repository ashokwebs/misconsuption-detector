import { Submission, SessionStats, MisconceptionEntry, User } from '../types';

// In-memory store — replace with a database for production persistence
const submissions: Map<string, Submission[]> = new Map();
const users: Map<string, User> = new Map();

export const store = {
  // --- Auth ---
  registerUser(user: User): boolean {
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
    const subs = this.getSubmissions(sessionId);

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

