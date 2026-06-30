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

export const TOPICS: Topic[] = [
  {
    id: 'physics',
    label: 'Physics',
    icon: '🚀',
    questions: [
      {
        id: 'p1',
        text: 'A heavy bowling ball and a light tennis ball are dropped from the same height in a vacuum. Which one hits the ground first and why?',
        hint: 'Think about gravity and air resistance.'
      },
      {
        id: 'p2',
        text: 'You push a heavy box across the floor at a constant speed. Is the force you are applying greater than, equal to, or less than the friction force? Why?',
        hint: 'Constant speed means no acceleration.'
      }
    ]
  },
  {
    id: 'biology',
    label: 'Biology',
    icon: '🧬',
    questions: [
      {
        id: 'b1',
        text: 'If a person inherits a gene for a genetic disease from one parent, will they definitely get the disease? Explain your reasoning.',
        hint: 'Consider dominant and recessive traits.'
      },
      {
        id: 'b2',
        text: 'Why do giraffes have long necks? Explain how this trait evolved over time.',
        hint: 'Think about natural selection, not just stretching.'
      }
    ]
  },
  {
    id: 'math',
    label: 'Mathematics',
    icon: '➗',
    questions: [
      {
        id: 'm1',
        text: 'Which is larger: 1/4 or 1/5? Explain how you know.',
        hint: 'Consider the size of the pieces.'
      },
      {
        id: 'm2',
        text: 'If x^2 = 25, what is the value of x? Explain your steps.',
        hint: 'Remember that squaring a negative number results in a positive.'
      }
    ]
  },
  {
    id: 'history',
    label: 'History',
    icon: '🏛️',
    questions: [
      {
        id: 'h1',
        text: 'What was the primary cause of World War II in Europe? Was it solely the assassination of Archduke Franz Ferdinand?',
        hint: 'WWI vs WWII causes.'
      }
    ]
  }
];

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id);
}
