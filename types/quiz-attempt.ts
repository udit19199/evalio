export type QuizAttempt = {
  id: string;
  userEmail: string;
  correctAnswers: number;
  totalQuestions: number;
  scorePercent: number;
  createdAt: string;
};
