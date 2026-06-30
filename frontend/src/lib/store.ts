import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  role: 'student' | 'teacher';
}

interface SessionState {
  sessionId: string;
  user: User | null;
  setUser: (user: User | null) => void;
  role: 'student' | 'teacher'; // Keep this for fallback/legacy or derived from user
}

function generateSessionId(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: generateSessionId(),
      user: null,
      role: 'student',
      setUser: (user) => set({ user, role: user?.role || 'student' }),
    }),
    { name: 'md-session' }
  )
);
