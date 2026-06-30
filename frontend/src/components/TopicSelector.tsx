import { TOPICS } from '@/lib/questions';
import { cn } from '@/lib/utils';

interface Props {
  selected: string;
  onChange: (topicId: string) => void;
}

export function TopicSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onChange(topic.id)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150',
            selected === topic.id
              ? 'bg-ink text-paper-warm shadow-sm'
              : 'bg-white border border-paper-deep text-ink-light hover:text-ink hover:border-sand/40 hover:bg-paper-warm'
          )}
        >
          <span>{topic.icon}</span>
          {topic.label}
        </button>
      ))}
    </div>
  );
}
