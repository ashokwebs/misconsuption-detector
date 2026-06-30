import { useSession } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Nav() {
  const { role, setRole, sessionId } = useSession();

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

        {/* Tab toggle */}
        <div className="flex items-center gap-1 bg-paper-warm rounded-xl p-1 border border-paper-deep">
          {(['student', 'teacher'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 capitalize',
                role === r
                  ? 'bg-white text-ink shadow-sm border border-paper-deep'
                  : 'text-ink-light hover:text-ink'
              )}
            >
              {r === 'student' ? '✏️ Student' : '📊 Teacher'}
            </button>
          ))}
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
