import { Submission } from '@/types';
import { SeverityBadge } from './SeverityBadge';
import { ConfidenceBar } from './ConfidenceBar';
import { cn } from '@/lib/utils';

interface Props {
  submission: Submission;
}

const severityBorder: Record<string, string> = {
  high: 'border-l-ember',
  medium: 'border-l-amber-500',
  low: 'border-l-moss',
};

export function DiagnosisCard({ submission }: Props) {
  const { diagnosis } = submission;
  const borderColor = diagnosis.correct
    ? 'border-l-moss'
    : severityBorder[diagnosis.severity];

  return (
    <div
      className={cn(
        'card animate-fade-in-up border-l-4',
        borderColor
      )}
    >
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs font-medium text-ink-light/60 uppercase tracking-widest mb-1">
              {diagnosis.correct ? 'Diagnosis' : 'Misconception identified'}
            </p>
            <h3 className="font-display text-xl font-semibold text-ink leading-tight">
              {diagnosis.misconception_name}
            </h3>
          </div>
          <SeverityBadge severity={diagnosis.severity} correct={diagnosis.correct} />
        </div>

        {/* Explanation */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-ink-light/60 uppercase tracking-widest">
            What's happening in your thinking
          </p>
          <p className="text-sm text-ink-light leading-relaxed">
            {diagnosis.explanation}
          </p>
        </div>

        {/* Correct understanding */}
        <div className={cn(
          'rounded-xl p-4 space-y-1',
          diagnosis.correct ? 'bg-moss-50 border border-moss/20' : 'bg-amber-50 border border-amber-200'
        )}>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-light/60">
            {diagnosis.correct ? 'Why you\'re right' : 'The correct understanding'}
          </p>
          <p className="text-sm text-ink leading-relaxed font-medium">
            {diagnosis.correct_understanding}
          </p>
        </div>

        {/* Confidence */}
        <ConfidenceBar value={diagnosis.confidence} />
      </div>
    </div>
  );
}
