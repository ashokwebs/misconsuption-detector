import { useSession } from '@/lib/store';

export function Nav() {
  const { role, sessionId } = useSession();

  return (
    <header className="sticky top-0 z-20 bg-paper/80 backdrop-blur-md border-b border-paper-deep">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
            <span className="text-sm">🧠</span>
          </div>
          <span className="font-display font-semibold text-ink text-[15px] tracking-tight hidden sm:block">
            Misconception Detector
          </span>
          <span className="font-display font-semibold text-ink text-[15px] tracking-tight sm:hidden">
            MD
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="capitalize">{role === 'teacher' ? '📊 Teacher' : '✏️ Student'}</span>
          </div>
          <button
            onClick={() => useSession.getState().setUser(null)}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Log Out
          </button>
        </div>

        {/* Session ID */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-light/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
          Session {sessionId}
        </div>
      </div>
    </header>
  );
}
