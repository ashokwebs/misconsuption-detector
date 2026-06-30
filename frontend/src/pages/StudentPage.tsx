import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TOPICS, getTopicById } from '@/lib/questions';
import { analyzeAnswer } from '@/lib/api';
import { useSession } from '@/lib/store';
import { Submission } from '@/types';
import { TopicSelector } from '@/components/TopicSelector';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import { ThinkingSpinner } from '@/components/ThinkingSpinner';
import { cn } from '@/lib/utils';

export function StudentPage() {
  const { sessionId } = useSession();
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<Submission | null>(null);

  const topic = getTopicById(topicId)!;
  const question = topic.questions[questionIdx];

  const mutation = useMutation({
    mutationFn: () =>
      analyzeAnswer({
        sessionId,
        topic: topic.label,
        question: question.text,
        answer,
      }),
    onSuccess: (data) => setResult(data),
  });

  const handleTopicChange = useCallback((id: string) => {
    setTopicId(id);
    setQuestionIdx(0);
    setAnswer('');
    setResult(null);
  }, []);

  const handleReset = () => {
    setAnswer('');
    setResult(null);
    // Pick a different question
    const nextIdx = (questionIdx + 1) % topic.questions.length;
    setQuestionIdx(nextIdx);
  };

  const canSubmit = answer.trim().length >= 10 && !mutation.isPending;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Hero text */}
      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-tight">
          What's the reasoning behind your answer?
        </h1>
        <p className="text-sm text-ink-light">
          Write out your thinking — not just the answer. The more you explain, the more precise the diagnosis.
        </p>
      </div>

      {/* Topic selector */}
      <TopicSelector selected={topicId} onChange={handleTopicChange} />

      {/* Question card */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-ink-light/60 uppercase tracking-widest">
          <span>{topic.icon}</span>
          {topic.label}
          <span className="text-paper-deep">·</span>
          <span>
            Question {questionIdx + 1} of {topic.questions.length}
          </span>
        </div>
        <p className="text-base sm:text-lg font-medium text-ink leading-snug text-balance">
          {question.text}
        </p>
        {question.hint && (
          <p className="text-xs text-ink-light/60 italic">
            Hint: {question.hint}
          </p>
        )}

        {/* Question nav dots */}
        <div className="flex gap-1.5 pt-1">
          {topic.questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => {
                setQuestionIdx(i);
                setAnswer('');
                setResult(null);
              }}
              className={cn(
                'w-5 h-1.5 rounded-full transition-all duration-150',
                i === questionIdx ? 'bg-ink' : 'bg-paper-deep hover:bg-ink-light/30'
              )}
            />
          ))}
        </div>
      </div>

      {/* Answer area */}
      {!result && !mutation.isPending && (
        <div className="space-y-3">
          <textarea
            className="textarea h-36"
            placeholder="Explain your reasoning here. Why do you think this is the answer? What's the logic behind it?"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={mutation.isPending}
          />
          <div className="flex items-center justify-between">
            <p className={cn('text-xs', answer.length < 10 ? 'text-ink-light/40' : 'text-ink-light/60')}>
              {answer.length < 10
                ? `${10 - answer.length} more characters needed`
                : `${answer.length} characters — good`}
            </p>
            <button
              className="btn-primary"
              disabled={!canSubmit}
              onClick={() => mutation.mutate()}
            >
              Analyze my thinking →
            </button>
          </div>
          {mutation.isError && (
            <div className="rounded-xl border border-ember/20 bg-ember-50 p-3">
              <p className="text-xs text-ember font-medium">
                {(mutation.error as Error).message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {mutation.isPending && <ThinkingSpinner />}

      {/* Result */}
      {result && !mutation.isPending && (
        <div className="space-y-4">
          <DiagnosisCard submission={result} />
          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={handleReset}>
              Try next question →
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                setAnswer('');
                setResult(null);
              }}
            >
              Edit my answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
