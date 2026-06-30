import { Submission, SessionStats } from '@/types';

const BASE = '/api';

export async function analyzeAnswer(payload: {
  sessionId: string;
  topic: string;
  question: string;
  answer: string;
}): Promise<Submission> {
  const res = await fetch(`${BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error ?? 'Failed to analyze answer');
  }

  const data = await res.json();
  return data.submission as Submission;
}

export async function fetchSessionStats(sessionId: string): Promise<SessionStats> {
  const res = await fetch(`${BASE}/sessions/${sessionId}/stats`);
  if (!res.ok) throw new Error('Failed to fetch session stats');
  return res.json();
}

export async function fetchSubmissions(sessionId: string): Promise<Submission[]> {
  const res = await fetch(`${BASE}/sessions/${sessionId}/submissions`);
  if (!res.ok) throw new Error('Failed to fetch submissions');
  const data = await res.json();
  return data.submissions;
}
