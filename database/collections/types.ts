export type RiskLevel = 'high' | 'medium' | 'low';

export type DocumentId = string;

export interface StudentDocument {
  _id: DocumentId;
  name: string;
  email: string;
  batchId: DocumentId;
  quizCompletionRate: number;
  inactiveDays: number;
  currentRiskScore: number;
  currentRiskLevel: RiskLevel;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BatchDocument {
  _id: DocumentId;
  name: string;
  educatorId: DocumentId;
  createdAt: string;
}

export interface QuizAttemptDocument {
  _id: DocumentId;
  studentId: DocumentId;
  quizId: DocumentId;
  status: 'completed' | 'missed' | 'pending';
  score: number | null;
  submittedAt: string | null;
  createdAt: string;
}

export interface NudgeDocument {
  _id: DocumentId;
  studentId: DocumentId;
  educatorId: DocumentId;
  message: string;
  readAt: string | null;
  sentAt: string;
}

export interface RiskHistoryDocument {
  _id: DocumentId;
  studentId: DocumentId;
  score: number;
  level: RiskLevel;
  reason: 'login' | 'quiz_completed' | 'quiz_missed' | 'manual';
  recordedAt: string;
}
