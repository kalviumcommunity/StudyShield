/**
 * StudyShield Mock Students Dataset & Risk Intelligence Engine
 * 
 * Risk Formula: R(t) = min(100, 0.6 * (100 - Q) + 0.4 * L)
 * where L = min(100, inactive_days * 25)
 * 
 * Risk Categorization:
 * - High Risk: 70 - 100
 * - Medium Risk: 40 - 69
 * - Healthy: 0 - 39
 */

export const RISK_CATEGORIES = {
  HIGH: {
    label: 'High Risk',
    color: 'rose',
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    badgeBg: 'bg-rose-100',
    accentColor: '#EF4444',
    min: 70,
    max: 100,
  },
  MEDIUM: {
    label: 'Medium Risk',
    color: 'amber',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-100',
    accentColor: '#F59E0B',
    min: 40,
    max: 69,
  },
  HEALTHY: {
    label: 'Healthy',
    color: 'emerald',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    accentColor: '#10B981',
    min: 0,
    max: 39,
  }
};

export const getRiskCategory = (score) => {
  if (score >= 70) return RISK_CATEGORIES.HIGH;
  if (score >= 40) return RISK_CATEGORIES.MEDIUM;
  return RISK_CATEGORIES.HEALTHY;
};

export const calculateRiskScore = (quizCompletionRate, inactiveDays) => {
  const L = Math.min(100, inactiveDays * 25);
  const Q = Math.max(0, Math.min(100, quizCompletionRate));
  const score = Math.round(Math.min(100, 0.6 * (100 - Q) + 0.4 * L));
  return score;
};

export const MOCK_STUDENTS = [
  {
    id: 'std-001',
    name: 'Rahul Sharma',
    avatar: 'RS',
    email: 'rahul.sharma@institution.edu',
    batch: 'Batch Alpha 2026',
    riskScore: 87,
    status: 'High Risk',
    statusCategory: 'HIGH',
    inactiveDays: 12,
    quizCompletionRate: 25,
    lastActive: '12 days ago',
    recommendedAction: 'Reach out',
    signals: [
      { id: 'sig-1', text: '12 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-2', text: 'Quiz completion ↓ 48%', type: 'quiz', severity: 'high' },
      { id: 'sig-3', text: 'Login frequency ↓ 63%', type: 'login', severity: 'medium' }
    ],
    details: {
      quizzesAttempted: 2,
      totalQuizzes: 8,
      averageScore: 44,
      missedDeadlines: 4,
      lastLoginDate: 'Aug 13, 2026',
      trend: 'worsening',
      riskHistory: [45, 52, 68, 79, 87],
      notes: 'Has not accessed Module 3 materials since mid-August.'
    }
  },
  {
    id: 'std-002',
    name: 'Priya Mehta',
    avatar: 'PM',
    email: 'priya.mehta@institution.edu',
    batch: 'Batch Beta 2026',
    riskScore: 74,
    status: 'High Risk',
    statusCategory: 'HIGH',
    inactiveDays: 7,
    quizCompletionRate: 44,
    lastActive: '7 days ago',
    recommendedAction: 'Review student',
    signals: [
      { id: 'sig-4', text: '7 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-5', text: '3 missed quizzes', type: 'quiz', severity: 'high' },
      { id: 'sig-6', text: 'Assessment score ↓ 21%', type: 'assessment', severity: 'medium' }
    ],
    details: {
      quizzesAttempted: 4,
      totalQuizzes: 9,
      averageScore: 52,
      missedDeadlines: 3,
      lastLoginDate: 'Aug 18, 2026',
      trend: 'worsening',
      riskHistory: [38, 45, 56, 68, 74],
      notes: 'Drop coincided with start of Thermodynamics weekly tests.'
    }
  },
  {
    id: 'std-003',
    name: 'Arjun Patel',
    avatar: 'AP',
    email: 'arjun.patel@institution.edu',
    batch: 'Batch Alpha 2026',
    riskScore: 61,
    status: 'Medium Risk',
    statusCategory: 'MEDIUM',
    inactiveDays: 3,
    quizCompletionRate: 67,
    lastActive: '3 days ago',
    recommendedAction: 'Monitor',
    signals: [
      { id: 'sig-7', text: 'Activity declining', type: 'activity', severity: 'medium' },
      { id: 'sig-8', text: '2 missed learning sessions', type: 'session', severity: 'medium' }
    ],
    details: {
      quizzesAttempted: 6,
      totalQuizzes: 9,
      averageScore: 68,
      missedDeadlines: 2,
      lastLoginDate: 'Aug 22, 2026',
      trend: 'stable',
      riskHistory: [55, 58, 62, 60, 61],
      notes: 'Submitted DPPs late for the past 2 weeks.'
    }
  },
  {
    id: 'std-004',
    name: 'Meera Singh',
    avatar: 'MS',
    email: 'meera.singh@institution.edu',
    batch: 'Engineering Cohort 4',
    riskScore: 42,
    status: 'Medium Risk',
    statusCategory: 'MEDIUM',
    inactiveDays: 2,
    quizCompletionRate: 78,
    lastActive: '2 days ago',
    recommendedAction: 'Monitor',
    signals: [
      { id: 'sig-9', text: 'Login frequency declining', type: 'login', severity: 'low' },
      { id: 'sig-10', text: 'Quiz activity slightly lower', type: 'quiz', severity: 'low' }
    ],
    details: {
      quizzesAttempted: 7,
      totalQuizzes: 9,
      averageScore: 71,
      missedDeadlines: 1,
      lastLoginDate: 'Aug 23, 2026',
      trend: 'improving',
      riskHistory: [54, 50, 47, 44, 42],
      notes: 'Showed steady recovery after initial orientation dip.'
    }
  },
  {
    id: 'std-005',
    name: 'Devansh Verma',
    avatar: 'DV',
    email: 'devansh.v@institution.edu',
    batch: 'Batch Alpha 2026',
    riskScore: 82,
    status: 'High Risk',
    statusCategory: 'HIGH',
    inactiveDays: 9,
    quizCompletionRate: 33,
    lastActive: '9 days ago',
    recommendedAction: 'Reach out',
    signals: [
      { id: 'sig-11', text: '9 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-12', text: '4 unattempted DPP sets', type: 'quiz', severity: 'high' }
    ],
    details: {
      quizzesAttempted: 3,
      totalQuizzes: 9,
      averageScore: 48,
      missedDeadlines: 4,
      lastLoginDate: 'Aug 16, 2026',
      trend: 'worsening',
      riskHistory: [40, 54, 66, 75, 82],
      notes: 'Immediate phone outreach advised.'
    }
  },
  {
    id: 'std-006',
    name: 'Ananya Deshmukh',
    avatar: 'AD',
    email: 'ananya.d@institution.edu',
    batch: 'Batch Beta 2026',
    riskScore: 78,
    status: 'High Risk',
    statusCategory: 'HIGH',
    inactiveDays: 8,
    quizCompletionRate: 38,
    lastActive: '8 days ago',
    recommendedAction: 'Reach out',
    signals: [
      { id: 'sig-13', text: '8 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-14', text: 'Quiz completion ↓ 39%', type: 'quiz', severity: 'medium' }
    ],
    details: {
      quizzesAttempted: 3,
      totalQuizzes: 8,
      averageScore: 50,
      missedDeadlines: 3,
      lastLoginDate: 'Aug 17, 2026',
      trend: 'worsening',
      riskHistory: [32, 48, 62, 70, 78],
      notes: 'Missed both weekend benchmark assessments.'
    }
  },
  {
    id: 'std-007',
    name: 'Kavya Nair',
    avatar: 'KN',
    email: 'kavya.nair@institution.edu',
    batch: 'Engineering Cohort 4',
    riskScore: 58,
    status: 'Medium Risk',
    statusCategory: 'MEDIUM',
    inactiveDays: 4,
    quizCompletionRate: 62,
    lastActive: '4 days ago',
    recommendedAction: 'Monitor',
    signals: [
      { id: 'sig-15', text: '4 days inactive', type: 'inactivity', severity: 'medium' },
      { id: 'sig-16', text: 'Study duration ↓ 28%', type: 'activity', severity: 'low' }
    ],
    details: {
      quizzesAttempted: 5,
      totalQuizzes: 8,
      averageScore: 65,
      missedDeadlines: 2,
      lastLoginDate: 'Aug 21, 2026',
      trend: 'stable',
      riskHistory: [50, 52, 56, 57, 58],
      notes: 'Active on discussion forums but behind on test submissions.'
    }
  },
  {
    id: 'std-008',
    name: 'Rohan Kulkarni',
    avatar: 'RK',
    email: 'rohan.k@institution.edu',
    batch: 'Batch Alpha 2026',
    riskScore: 22,
    status: 'Healthy',
    statusCategory: 'HEALTHY',
    inactiveDays: 0,
    quizCompletionRate: 92,
    lastActive: '3 hours ago',
    recommendedAction: 'On Track',
    signals: [
      { id: 'sig-17', text: 'Consistent daily logins', type: 'login', severity: 'positive' },
      { id: 'sig-18', text: 'Quiz completion 92%', type: 'quiz', severity: 'positive' }
    ],
    details: {
      quizzesAttempted: 8,
      totalQuizzes: 9,
      averageScore: 88,
      missedDeadlines: 0,
      lastLoginDate: 'Today',
      trend: 'improving',
      riskHistory: [30, 26, 24, 23, 22],
      notes: 'Strong pace and top quartile scores across physics and math.'
    }
  },
  {
    id: 'std-009',
    name: 'Tanvi Joshi',
    avatar: 'TJ',
    email: 'tanvi.j@institution.edu',
    batch: 'Batch Beta 2026',
    riskScore: 16,
    status: 'Healthy',
    statusCategory: 'HEALTHY',
    inactiveDays: 0,
    quizCompletionRate: 100,
    lastActive: '1 hour ago',
    recommendedAction: 'On Track',
    signals: [
      { id: 'sig-19', text: '100% quiz completion', type: 'quiz', severity: 'positive' },
      { id: 'sig-20', text: 'Top 5% engagement streak', type: 'activity', severity: 'positive' }
    ],
    details: {
      quizzesAttempted: 9,
      totalQuizzes: 9,
      averageScore: 94,
      missedDeadlines: 0,
      lastLoginDate: 'Today',
      trend: 'improving',
      riskHistory: [20, 18, 17, 16, 16],
      notes: 'Exemplary learning momentum.'
    }
  },
  {
    id: 'std-010',
    name: 'Siddharth Sen',
    avatar: 'SS',
    email: 'siddharth.s@institution.edu',
    batch: 'Engineering Cohort 4',
    riskScore: 19,
    status: 'Healthy',
    statusCategory: 'HEALTHY',
    inactiveDays: 1,
    quizCompletionRate: 95,
    lastActive: 'Yesterday',
    recommendedAction: 'On Track',
    signals: [
      { id: 'sig-21', text: 'Active daily learner', type: 'activity', severity: 'positive' }
    ],
    details: {
      quizzesAttempted: 8,
      totalQuizzes: 8,
      averageScore: 86,
      missedDeadlines: 0,
      lastLoginDate: 'Yesterday',
      trend: 'improving',
      riskHistory: [25, 22, 20, 20, 19],
      notes: 'Consistent attendance in problem-solving labs.'
    }
  }
];

export const BATCHES = [
  'All Batches',
  'Batch Alpha 2026',
  'Batch Beta 2026',
  'Engineering Cohort 4'
];
