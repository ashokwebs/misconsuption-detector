import { Severity } from '@/types';
import { severityLabel } from '@/lib/utils';

interface Props {
  severity: Severity;
  correct?: boolean;
}

const icons: Record<Severity, string> = {
  high: '⚠',
  medium: '◎',
  low: '◈',
};

export function SeverityBadge({ severity, correct }: Props) {
  if (correct) {
    return (
      <span className="badge-correct">
        <span>✓</span>
        Correct
      </span>
    );
  }

  return (
    <span
      className={
        severity === 'high'
          ? 'badge-high'
          : severity === 'medium'
          ? 'badge-medium'
          : 'badge-low'
      }
    >
      <span>{icons[severity]}</span>
      {severityLabel(severity)}
    </span>
  );
}
