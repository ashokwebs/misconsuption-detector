export type Severity = 'high' | 'medium' | 'low';

export interface DiagnosisResult {
  correct: boolean;
  severity: Severity;
  misconception_name: string;
  explanation: string;
  correct_understanding: string;
  confidence: number;
}

export interface Submission {
  id: string;
  sessionId: string;
  topic: string;
  question: string;
  answer: string;
  diagnosis: DiagnosisResult;
  timestamp: string;
}

export interface SessionStats {
  total: number;
  coreMisconceptions: number;
  mostlyCorrect: number;
  misconceptionMap: MisconceptionEntry[];
  recentSubmissions: Submission[];
}

export interface MisconceptionEntry {
  name: string;
  count: number;
  severity: Severity;
  percentage: number;
}

export interface Question {
  id: string;
  text: string;
  hint?: string;
}

export interface Topic {
  id: string;
  label: string;
  icon: string;
  questions: Question[];
}
