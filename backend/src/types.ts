export type Severity = 'high' | 'medium' | 'low';

export interface DiagnosisResult {
  correct: boolean;
  severity: Severity;
  misconception_name: string;
  explanation: string;
  correct_understanding: string;
  confidence: number;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: 'student' | 'teacher';
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

export interface AnalyzeRequest {
  sessionId: string;
  topic: string;
  question: string;
  answer: string;
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
