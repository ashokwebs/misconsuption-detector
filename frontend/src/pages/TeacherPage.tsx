import { useQuery } from '@tanstack/react-query';
import { fetchSessionStats } from '@/lib/api';
import { useSession } from '@/lib/store';
import { SessionStats, MisconceptionEntry } from '@/types';
import { SeverityBadge } from '@/components/SeverityBadge';
import { truncate, timeAgo } from '@/lib/utils';

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  accent?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium text-ink-light/60 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`font-display text-3xl font-semibold ${accent ?? 'text-ink'}`}>
        {value}
      </p>
      <p className="text-xs text-ink-light/60 mt-1">{sub}</p>
    </div>
  );
}

function MisconceptionBar({ entry, max }: { entry: MisconceptionEntry; max: number }) {
  const pct = max > 0 ? (entry.count / max) * 100 : 0;
  const barColor =
    entry.severity === 'high'
      ? 'bg-ember'
      : entry.severity === 'medium'
      ? 'bg-amber-400'
      : 'bg-moss';

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-ink truncate">{entry.name}</p>
          <SeverityBadge severity={entry.severity} />
        </div>
        <div className="h-1.5 bg-paper-deep rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-ink font-mono">{entry.count}</p>
        <p className="text-[10px] text-ink-light/50">{entry.percentage}%</p>
      </div>
    </div>
  );
}

export function TeacherPage() {
  const { sessionId } = useSession();

  const { data: stats, isLoading } = useQuery<SessionStats>({
    queryKey: ['session-stats', sessionId],
    queryFn: () => fetchSessionStats(sessionId),
    refetchInterval: 8000, // poll every 8 seconds
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
        <p className="text-sm text-ink-light/50">Loading session data…</p>
      </div>
    );
  }

  const isEmpty = !stats || stats.total === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
            Class overview
          </h1>
          <p className="text-sm text-ink-light mt-0.5">
            Session <span className="font-mono font-medium">{sessionId}</span>
            {' · '}
            Updates every 8 seconds
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-moss font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
          Live
        </div>
      </div>

      {isEmpty ? (
        /* Empty state */
        <div className="card p-12 text-center space-y-3">
          <div className="text-4xl">📭</div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Waiting for students
          </h3>
          <p className="text-sm text-ink-light max-w-sm mx-auto">
            Once students in this session submit answers, their misconception
            diagnoses will appear here as a class-wide map.
          </p>
          <p className="text-xs text-ink-light/50 font-mono">
            Share session ID: {sessionId}
          </p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Answers analyzed"
              value={stats.total}
              sub="total submissions"
            />
            <StatCard
              label="Core misconceptions"
              value={stats.coreMisconceptions}
              sub="high-severity diagnoses"
              accent="text-ember"
            />
            <StatCard
              label="Correct reasoning"
              value={stats.mostlyCorrect}
              sub="answered correctly"
              accent="text-moss"
            />
          </div>

          {/* Misconception map */}
          {stats.misconceptionMap.length > 0 && (
            <div className="card">
              <div className="px-6 pt-5 pb-3 border-b border-paper-deep">
                <h2 className="font-display font-semibold text-ink">
                  Misconception frequency map
                </h2>
                <p className="text-xs text-ink-light/60 mt-0.5">
                  Ranked by how many students share each wrong mental model
                </p>
              </div>
              <div className="px-6 py-3 divide-y divide-paper-deep/60">
                {stats.misconceptionMap.map((entry) => (
                  <MisconceptionBar
                    key={entry.name}
                    entry={entry}
                    max={stats.misconceptionMap[0].count}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent submissions feed */}
          <div className="card">
            <div className="px-6 pt-5 pb-3 border-b border-paper-deep">
              <h2 className="font-display font-semibold text-ink">
                Recent answers
              </h2>
              <p className="text-xs text-ink-light/60 mt-0.5">
                Latest student submissions with their diagnoses
              </p>
            </div>
            <div className="divide-y divide-paper-deep/60">
              {stats.recentSubmissions.map((sub) => (
                <div key={sub.id} className="px-6 py-4 space-y-2">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-medium text-ink-light/50 uppercase tracking-widest">
                        {sub.topic}
                      </p>
                      <p className="text-xs font-medium text-ink-light">
                        {truncate(sub.question, 80)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <SeverityBadge
                        severity={sub.diagnosis.severity}
                        correct={sub.diagnosis.correct}
                      />
                      <span className="text-[10px] text-ink-light/40 font-mono">
                        {timeAgo(sub.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="border border-paper-deep rounded-lg px-3 py-2 bg-paper-warm">
                    <p className="text-xs text-ink-light italic leading-relaxed">
                      "{truncate(sub.answer, 120)}"
                    </p>
                  </div>
                  <p className="text-xs font-medium text-ink">
                    {sub.diagnosis.misconception_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
