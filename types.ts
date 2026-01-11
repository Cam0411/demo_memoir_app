
export interface QuizQuestion {
  id: string;
  stage: 'AWARENESS' | 'CONSIDERATION' | 'DECISION';
  question: string;
  options: string[];
}
