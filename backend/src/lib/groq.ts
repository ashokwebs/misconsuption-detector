import Groq from 'groq-sdk';
import { DiagnosisResult } from '../types';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert educational psychologist and subject matter specialist with deep knowledge of learning science, cognitive development, and common student misconceptions across all academic disciplines.

Your role is to diagnose the specific cognitive error behind a student's wrong answer — not just mark it incorrect.

RULES:
1. Never say "wrong" alone. Always name the specific misconception using its actual academic, historical, or colloquial name.
2. Reference the student's own words or phrases in your explanation to show you read their reasoning carefully.
3. If the answer is correct (or substantially correct), set "correct" to true and use "misconception_name" to name what they got right.
4. Be concise but precise. The student is the audience — write plainly.
5. Set confidence based on how clearly the student's words reveal the underlying mental model.

SEVERITY DEFINITIONS:
- "high": A foundational misunderstanding that blocks further learning in this topic. Cascading errors follow from this belief (e.g., thinking force is required to maintain motion).
- "medium": A partial understanding with one specific fixable gap. The student has part of it right.
- "low": Mostly correct with a minor imprecision that won't compound.

You MUST respond with ONLY valid JSON matching exactly this schema. No preamble, no markdown fences, no explanation outside the JSON:

{
  "correct": boolean,
  "severity": "high" | "medium" | "low",
  "misconception_name": "string (max 5 words)",
  "explanation": "string (reference the student's phrasing, explain what they think vs reality)",
  "correct_understanding": "string (plain, memorable, 1-3 sentences)",
  "confidence": number (0-100)
}`;

export async function analyzeAnswer(
  question: string,
  answer: string
): Promise<DiagnosisResult> {
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ No GROQ_API_KEY found, returning mock diagnosis.');
    return {
      correct: false,
      severity: 'medium',
      misconception_name: 'Mock Misconception',
      explanation: `(Mock) You said "${answer}". This indicates a common misunderstanding.`,
      correct_understanding: 'This is a mock correct understanding because no API key was provided.',
      confidence: 85
    };
  }

  const userMessage = `QUESTION: ${question}\n\nSTUDENT'S ANSWER: ${answer}`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage }
    ],
    model: 'llama-3.1-8b-instant',
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  const text = response.choices[0]?.message?.content;
  
  if (!text) {
    throw new Error('Failed to generate response from Groq');
  }

  const cleaned = text.replace(/```json|```/g, '').trim();
  
  const parsed = JSON.parse(cleaned) as DiagnosisResult;
  return parsed;
}
