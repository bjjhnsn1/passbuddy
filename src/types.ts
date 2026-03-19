export interface Answer {
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  correctIndex: number;
  explanation: string;
}

export interface ExamConfig {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  dataPath: string;
  category: string;
  relatedTopics: { href: string; label: string }[];
  appStoreUrl: string;
}
