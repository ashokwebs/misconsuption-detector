interface Props {
  value: number; // 0–100
}

export function ConfidenceBar({ value }: Props) {
  const color =
    value >= 75 ? 'bg-moss' : value >= 50 ? 'bg-amber-500' : 'bg-sand';

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-ink-light">
        <span>Diagnosis confidence</span>
        <span className="font-medium font-mono">{value}%</span>
      </div>
      <div className="h-1.5 bg-paper-deep rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full confidence-bar ${color}`}
          style={{ '--target-width': `${value}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
