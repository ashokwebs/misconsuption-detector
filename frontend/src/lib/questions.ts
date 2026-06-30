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
      },
      {
        id: 'p3',
        text: 'A spaceship in deep space turns off its engines. Will it eventually slow down and stop? Explain your reasoning.',
        hint: 'Think about Newton\'s First Law.'
      },
      {
        id: 'p4',
        text: 'When a car abruptly stops, a passenger lunges forward. Did a forward force push them? Explain.',
        hint: 'Consider inertia and frames of reference.'
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
      },
      {
        id: 'b3',
        text: 'Do plants "breathe" oxygen like humans do? Explain the relationship between photosynthesis and cellular respiration in plants.',
        hint: 'Plants need energy at night too.'
      },
      {
        id: 'b4',
        text: 'Are antibiotics effective against the common cold? Why or why not?',
        hint: 'Think about what causes the cold vs what antibiotics target.'
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
      },
      {
        id: 'm3',
        text: 'Is 0.999... (repeating) less than 1, or exactly equal to 1? Explain your logic.',
        hint: 'Think about fractions, like 1/3 = 0.333...'
      },
      {
        id: 'm4',
        text: 'If a jacket is on sale for 20% off, and you have an additional 10% off coupon, do you get 30% off the original price? Explain.',
        hint: 'Percentages compound sequentially.'
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
      },
      {
        id: 'h2',
        text: 'Did people in the Middle Ages believe the Earth was flat? Explain.',
        hint: 'Think about what scholars and navigators actually wrote at the time.'
      },
      {
        id: 'h3',
        text: 'Who "invented" the light bulb? Was Thomas Edison the sole creator from scratch? Explain.',
        hint: 'Innovation is often incremental.'
      },
      {
        id: 'h4',
        text: 'Did Paul Revere ride alone shouting "The British are coming!"? Explain the historical reality.',
        hint: 'Think about the secrecy needed and other riders involved.'
      }
    ]
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    icon: '🧪',
    questions: [
      {
        id: 'c1',
        text: 'When water boils, what is inside the bubbles that form at the bottom of the pot?',
        hint: 'Think about phase changes, not chemical breakdown.'
      },
      {
        id: 'c2',
        text: 'Are all chemicals dangerous or artificial? Explain your reasoning.',
        hint: 'Think about the composition of water and air.'
      }
    ]
  }
];

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id);
}
