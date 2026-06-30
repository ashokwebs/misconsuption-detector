export function ThinkingSpinner() {
  return (
    <div className="card p-8 flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-paper-deep" />
        <div className="absolute inset-0 rounded-full border-2 border-t-sand spinner" />
      </div>
      <div>
        <p className="font-medium text-ink text-sm">Analyzing your thinking</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="thinking-dot w-1.5 h-1.5 rounded-full bg-ink-light/40"
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-ink-light/50 max-w-xs">
        Looking for the specific mental model behind your answer
      </p>
    </div>
  );
}
