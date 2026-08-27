/**
 * StudyShield Dashboard Overview Metrics & Intelligence Feeds
 */

export const OVERVIEW_METRICS = {
  totalStudents: {
    value: 248,
    label: 'Total Students',
    description: 'Students currently being monitored',
    trend: '+12 this month',
    trendType: 'neutral',
  },
  studentsAtRisk: {
    value: 31,
    label: 'Students At Risk',
    description: 'Showing elevated warning signals',
    trend: '+5 this week',
    trendType: 'warning',
  },
  highRisk: {
    value: 12,
    label: 'High Risk',
    description: 'Require immediate attention',
    trend: 'Urgent Action',
    trendType: 'danger',
  },
  healthyEngagement: {
    value: 205,
    label: 'Healthy Engagement',
    description: '82.7% of students',
    trend: 'Stable cohort pace',
    trendType: 'positive',
  }
};

export const RISK_DISTRIBUTION_DATA = {
  healthy: {
    count: 205,
    percentage: 82.7,
    label: 'Healthy',
    range: 'Score 0–39',
    color: '#10B981',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  mediumRisk: {
    count: 31,
    percentage: 12.5,
    label: 'Medium Risk',
    range: 'Score 40–69',
    color: '#F59E0B',
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  highRisk: {
    count: 12,
    percentage: 4.8,
    label: 'High Risk',
    range: 'Score 70–100',
    color: '#EF4444',
    bgColor: 'bg-rose-500',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700'
  }
};

export const ENGAGEMENT_TREND_DATA = [
  { week: 'Week 1', label: 'Aug 1 - 7', engagementRate: 84, activeCount: 208, color: '#10B981' },
  { week: 'Week 2', label: 'Aug 8 - 14', engagementRate: 82, activeCount: 203, color: '#10B981' },
  { week: 'Week 3', label: 'Aug 15 - 21', engagementRate: 79, activeCount: 196, color: '#F59E0B' },
  { week: 'Week 4', label: 'Aug 22 - 28', engagementRate: 76, activeCount: 188, color: '#EF4444' }
];

export const EARLY_WARNING_SIGNALS = [
  {
    id: 'sig-inactivity',
    title: 'Inactive for 7+ days',
    count: 18,
    unit: 'students',
    trend: '↑ 4 students this week',
    trendDirection: 'up',
    severity: 'high',
    icon: 'Clock',
    filterKey: 'inactivity'
  },
  {
    id: 'sig-quiz',
    title: 'Quiz completion declining',
    count: 23,
    unit: 'students',
    trend: '↑ 7 students this week',
    trendDirection: 'up',
    severity: 'high',
    icon: 'HelpCircle',
    filterKey: 'quiz'
  },
  {
    id: 'sig-login',
    title: 'Login activity dropping',
    count: 16,
    unit: 'students',
    trend: '↑ 3 students this week',
    trendDirection: 'up',
    severity: 'medium',
    icon: 'LogIn',
    filterKey: 'login'
  },
  {
    id: 'sig-assessment',
    title: 'Assessment performance declining',
    count: 11,
    unit: 'students',
    trend: '↑ 2 students this week',
    trendDirection: 'up',
    severity: 'medium',
    icon: 'TrendingDown',
    filterKey: 'assessment'
  }
];

export const RECENT_ACTIVITY_FEED = [
  {
    id: 'act-1',
    student: 'Rahul Sharma',
    action: 'moved to High Risk',
    time: '8 minutes ago',
    type: 'risk_change',
    severity: 'high',
    icon: 'AlertTriangle',
    details: 'Risk score rose from 79 to 87 following 12th day of inactivity.'
  },
  {
    id: 'act-2',
    student: 'Priya Mehta',
    action: 'missed a scheduled quiz',
    time: '24 minutes ago',
    type: 'missed_quiz',
    severity: 'high',
    icon: 'FileX',
    details: 'Thermodynamics DPP #4 deadline passed without submission.'
  },
  {
    id: 'act-3',
    student: '12 students',
    action: 'showed declining activity',
    time: '1 hour ago',
    type: 'batch_trend',
    severity: 'medium',
    icon: 'TrendingDown',
    details: 'Weekly review flagged reduced study hours across Batch Beta.'
  },
  {
    id: 'act-4',
    student: 'System Intelligence',
    action: 'Weekly engagement report generated',
    time: '2 hours ago',
    type: 'report',
    severity: 'info',
    icon: 'FileText',
    details: 'Full cohort risk breakdown ready for educator export.'
  }
];

export const NUDGE_TEMPLATES = [
  {
    id: 'tmpl-quiz',
    title: 'Missed Quizzes Check-in',
    message: 'Hi {name}, we noticed you missed a few recent quizzes. Please take a look and let us know if you need any support to get back on track!'
  },
  {
    id: 'tmpl-inactivity',
    title: 'Gentle Learning Reconnect',
    message: 'Hi {name}, hope you are doing well. We missed you in class recently! Please log in to catch up on this week\'s key modules.'
  },
  {
    id: 'tmpl-support',
    title: '1-on-1 Academic Support',
    message: 'Hi {name}, I noticed the recent concepts might have felt challenging. Let me know if you would like to book a quick 10-minute 1-on-1 session.'
  }
];
