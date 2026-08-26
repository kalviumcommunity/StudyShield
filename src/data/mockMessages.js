/**
 * StudyShield Messages & Outreach Dataset & Data Model
 * 
 * Model Structure:
 * - id: string
 * - studentId: string (references MOCK_STUDENTS)
 * - studentName: string
 * - studentAvatar: string
 * - studentEmail: string
 * - batch: string
 * - type: 'Early Warning' | 'Check-in' | 'Quiz Reminder' | 'Study Reminder' | 'Encouragement' | 'Follow-up' | 'Custom'
 * - subject: string
 * - content: string
 * - trigger: string
 * - triggerSignalType: 'inactivity' | 'quiz' | 'assessment' | 'risk_spike' | 'manual' | 'milestone'
 * - riskLevel: 'High' | 'Medium' | 'Healthy'
 * - riskScore: number (0 - 100)
 * - status: 'Draft' | 'Scheduled' | 'Sent' | 'Delivered' | 'Read' | 'Failed'
 * - responseStatus: 'Responded' | 'No Response' | 'Awaiting Response' | 'Not Required'
 * - sentAt: string (formatted / ISO)
 * - deliveredAt?: string
 * - readAt?: string
 * - respondedAt?: string
 * - responseContent?: string
 * - automated: boolean
 * - createdBy: string ('StudyShield Early-Warning System' | 'Anurag (Lead Educator)' | etc.)
 * - timeline: Array of chronological events in the communication lifecycle
 * - relatedSignals: Array of detected signals at message time
 */

export const MESSAGE_TYPES = [
  'Early Warning',
  'Check-in',
  'Quiz Reminder',
  'Study Reminder',
  'Encouragement',
  'Follow-up',
  'Custom'
];

export const MESSAGE_STATUSES = [
  'Delivered',
  'Read',
  'Sent',
  'Scheduled',
  'Draft',
  'Failed'
];

export const RESPONSE_STATUSES = [
  'Responded',
  'Awaiting Response',
  'No Response',
  'Not Required'
];

export const MOCK_MESSAGES = [
  {
    id: 'msg-001',
    studentId: 'std-001',
    studentName: 'Rahul Sharma',
    studentAvatar: 'RS',
    studentEmail: 'rahul.sharma@institution.edu',
    batch: 'Batch Alpha 2026',
    type: 'Early Warning',
    subject: 'Action Recommended: Inactivity Check-in & Academic Support',
    content: 'Hey Rahul, we noticed that you haven\'t logged in or accessed course materials for the past 12 days. Your recent quiz completion has also dropped below 25%. We want to ensure everything is alright and see if there are any blockers holding you back. Please reach out or reply to this message so we can help you get back on track.',
    trigger: '12 consecutive days of inactivity + Quiz completion < 30%',
    triggerSignalType: 'inactivity',
    riskLevel: 'High',
    riskScore: 87,
    status: 'Delivered',
    responseStatus: 'Awaiting Response',
    sentAt: 'Aug 25, 2026, 10:32 AM',
    deliveredAt: 'Aug 25, 2026, 10:33 AM',
    readAt: null,
    respondedAt: null,
    responseContent: null,
    automated: true,
    createdBy: 'StudyShield Early-Warning System',
    relatedSignals: [
      { id: 'sig-1', text: '12 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-2', text: 'Quiz completion ↓ 48%', type: 'quiz', severity: 'high' },
      { id: 'sig-3', text: 'Login frequency ↓ 63%', type: 'login', severity: 'medium' }
    ],
    timeline: [
      {
        id: 'tl-1',
        date: 'Aug 14, 2026',
        time: '04:15 PM',
        title: 'Initial Signal Detected',
        description: 'Student missed Module 3 quiz deadline; inactive for 3 days.',
        type: 'activity'
      },
      {
        id: 'tl-2',
        date: 'Aug 19, 2026',
        time: '09:00 AM',
        title: 'Risk Score Escalated to 68 (Medium Risk)',
        description: 'Formula R(t) computed elevated inactivity factor (L = 175).',
        type: 'risk_change'
      },
      {
        id: 'tl-3',
        date: 'Aug 24, 2026',
        time: '11:45 AM',
        title: 'High Risk Threshold Crossed (R = 87)',
        description: 'Inactivity reached 12 consecutive days. High Risk flag triggered.',
        type: 'risk_change'
      },
      {
        id: 'tl-4',
        date: 'Aug 25, 2026',
        time: '10:32 AM',
        title: 'Automated Early-Warning Dispatched',
        description: 'StudyShield automated retention trigger executed standard outreach.',
        type: 'sent'
      },
      {
        id: 'tl-5',
        date: 'Aug 25, 2026',
        time: '10:33 AM',
        title: 'Delivered to Student Portal & Notification Feed',
        description: 'Push notification and in-app banner confirmed active.',
        type: 'delivered'
      },
      {
        id: 'tl-6',
        date: 'Aug 26, 2026',
        time: 'Ongoing',
        title: 'Awaiting Student Response',
        description: 'Follow-up recommended if unread within 48 hours.',
        type: 'followup'
      }
    ]
  },
  {
    id: 'msg-002',
    studentId: 'std-002',
    studentName: 'Priya Mehta',
    studentAvatar: 'PM',
    studentEmail: 'priya.mehta@institution.edu',
    batch: 'Batch Beta 2026',
    type: 'Quiz Reminder',
    subject: 'Thermodynamics DPP & Practice Quiz Deadline',
    content: 'Hi Priya, we noticed you missed the recent Thermodynamics Weekly Benchmark DPP #4. We know this topic can be intensive, but completing these practice sets is crucial for the upcoming term evaluation. Let us know if you would like study notes or need help with any specific question.',
    trigger: '3 missed quizzes + Assessment score drop 21%',
    triggerSignalType: 'quiz',
    riskLevel: 'High',
    riskScore: 74,
    status: 'Read',
    responseStatus: 'Responded',
    sentAt: 'Aug 24, 2026, 03:15 PM',
    deliveredAt: 'Aug 24, 2026, 03:16 PM',
    readAt: 'Aug 24, 2026, 04:02 PM',
    respondedAt: 'Aug 24, 2026, 05:45 PM',
    responseContent: 'Thank you for checking in, Sir. I was unwell earlier this week and fell behind on Thermodynamics. I have downloaded the slides and will submit DPP #4 and the quiz by tomorrow evening.',
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-4', text: '7 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-5', text: '3 missed quizzes', type: 'quiz', severity: 'high' }
    ],
    timeline: [
      {
        id: 'tl-7',
        date: 'Aug 22, 2026',
        time: '11:00 PM',
        title: 'Quiz Deadline Missed',
        description: 'Thermodynamics DPP #4 deadline expired without submission.',
        type: 'activity'
      },
      {
        id: 'tl-8',
        date: 'Aug 23, 2026',
        time: '08:30 AM',
        title: 'Risk Score Increased from 56 to 74',
        description: 'Quiz deficit factor increased R(t) into High Risk category.',
        type: 'risk_change'
      },
      {
        id: 'tl-9',
        date: 'Aug 24, 2026',
        time: '03:15 PM',
        title: 'Educator Nudge Dispatched',
        description: 'Manual outreach personalized by Lead Educator Anurag.',
        type: 'sent'
      },
      {
        id: 'tl-10',
        date: 'Aug 24, 2026',
        time: '04:02 PM',
        title: 'Read by Student',
        description: 'Student opened notification on mobile app.',
        type: 'read'
      },
      {
        id: 'tl-11',
        date: 'Aug 24, 2026',
        time: '05:45 PM',
        title: 'Student Responded',
        description: 'Student promised submission within 24 hours. Pending quiz verification.',
        type: 'response'
      }
    ]
  },
  {
    id: 'msg-003',
    studentId: 'std-005',
    studentName: 'Devansh Verma',
    studentAvatar: 'DV',
    studentEmail: 'devansh.v@institution.edu',
    batch: 'Batch Alpha 2026',
    type: 'Early Warning',
    subject: 'Urgent: Academic Reconnect & Support Check',
    content: 'Hi Devansh, we noticed you have been inactive for 9 consecutive days with 4 unattempted DPP sets. Inactivity can quickly compound before major examinations. We would like to schedule a 10-minute 1-on-1 discussion to help adjust your study timetable. Please reply with a convenient time today or tomorrow.',
    trigger: '9 days inactive + 4 unattempted DPP sets',
    triggerSignalType: 'inactivity',
    riskLevel: 'High',
    riskScore: 82,
    status: 'Delivered',
    responseStatus: 'No Response',
    sentAt: 'Aug 23, 2026, 09:10 AM',
    deliveredAt: 'Aug 23, 2026, 09:11 AM',
    readAt: null,
    respondedAt: null,
    responseContent: null,
    automated: true,
    createdBy: 'StudyShield Early-Warning System',
    relatedSignals: [
      { id: 'sig-11', text: '9 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-12', text: '4 unattempted DPP sets', type: 'quiz', severity: 'high' }
    ],
    timeline: [
      {
        id: 'tl-12',
        date: 'Aug 18, 2026',
        time: '02:00 PM',
        title: 'Inactivity Marker Crossed',
        description: '5 consecutive days with zero video or quiz interactions.',
        type: 'activity'
      },
      {
        id: 'tl-13',
        date: 'Aug 23, 2026',
        time: '09:10 AM',
        title: 'Automated Early Warning Dispatched',
        description: 'Trigger condition "Inactive > 7 days" satisfied.',
        type: 'sent'
      },
      {
        id: 'tl-14',
        date: 'Aug 25, 2026',
        time: '09:10 AM',
        title: '48h Response SLA Expired',
        description: 'No response recorded. Flagged for educator direct phone outreach.',
        type: 'followup'
      }
    ]
  },
  {
    id: 'msg-004',
    studentId: 'std-006',
    studentName: 'Ananya Deshmukh',
    studentAvatar: 'AD',
    studentEmail: 'ananya.d@institution.edu',
    batch: 'Batch Beta 2026',
    type: 'Check-in',
    subject: 'Mid-term Preparation & Quiz Check-in',
    content: 'Hi Ananya, hope your week is going well! We noticed you missed the weekend benchmark test and your quiz completion rate dipped recently. We are here to support you. Let us know if you would like additional solved examples on Rotational Motion.',
    trigger: '8 days inactive + Quiz completion ↓ 39%',
    triggerSignalType: 'assessment',
    riskLevel: 'High',
    riskScore: 78,
    status: 'Read',
    responseStatus: 'Awaiting Response',
    sentAt: 'Aug 24, 2026, 11:20 AM',
    deliveredAt: 'Aug 24, 2026, 11:21 AM',
    readAt: 'Aug 24, 2026, 06:14 PM',
    respondedAt: null,
    responseContent: null,
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-13', text: '8 days inactive', type: 'inactivity', severity: 'high' },
      { id: 'sig-14', text: 'Quiz completion ↓ 39%', type: 'quiz', severity: 'medium' }
    ],
    timeline: [
      {
        id: 'tl-15',
        date: 'Aug 21, 2026',
        time: '06:00 PM',
        title: 'Benchmark Assessment Missed',
        description: 'Unattempted weekend full-syllabus mock test.',
        type: 'activity'
      },
      {
        id: 'tl-16',
        date: 'Aug 24, 2026',
        time: '11:20 AM',
        title: 'Educator Check-in Message Sent',
        description: 'Sent via StudyShield Outreach Console.',
        type: 'sent'
      },
      {
        id: 'tl-17',
        date: 'Aug 24, 2026',
        time: '06:14 PM',
        title: 'Message Read by Student',
        description: 'Student viewed message via StudyShield Web Portal.',
        type: 'read'
      }
    ]
  },
  {
    id: 'msg-005',
    studentId: 'std-003',
    studentName: 'Arjun Patel',
    studentAvatar: 'AP',
    studentEmail: 'arjun.patel@institution.edu',
    batch: 'Batch Alpha 2026',
    type: 'Study Reminder',
    subject: 'Catch Up on Week 4 Problem Sessions',
    content: 'Hi Arjun, you have maintained steady overall performance, but we noticed you missed two live problem-solving sessions this week. The recorded sessions are now available in your portal. Taking a quick 30 minutes to review them will help with Friday\'s test!',
    trigger: '2 missed learning sessions + Inactive 3 days',
    triggerSignalType: 'activity',
    riskLevel: 'Medium',
    riskScore: 61,
    status: 'Read',
    responseStatus: 'Responded',
    sentAt: 'Aug 23, 2026, 04:40 PM',
    deliveredAt: 'Aug 23, 2026, 04:41 PM',
    readAt: 'Aug 23, 2026, 05:10 PM',
    respondedAt: 'Aug 23, 2026, 05:35 PM',
    responseContent: 'Thanks for the reminder Sir! I had clashing college lab hours. I just finished watching the recording for Session 1 and will finish Session 2 tonight.',
    automated: true,
    createdBy: 'StudyShield Early-Warning System',
    relatedSignals: [
      { id: 'sig-7', text: 'Activity declining', type: 'activity', severity: 'medium' },
      { id: 'sig-8', text: '2 missed learning sessions', type: 'session', severity: 'medium' }
    ],
    timeline: [
      {
        id: 'tl-18',
        date: 'Aug 22, 2026',
        time: '03:00 PM',
        title: 'Missed Live Problem Session #2',
        description: 'System recorded absence in scheduled cohort class.',
        type: 'activity'
      },
      {
        id: 'tl-19',
        date: 'Aug 23, 2026',
        time: '04:40 PM',
        title: 'Automated Study Reminder Sent',
        description: 'StudyShield detected session absence trigger.',
        type: 'sent'
      },
      {
        id: 'tl-20',
        date: 'Aug 23, 2026',
        time: '05:35 PM',
        title: 'Student Confirmed Catch-up Plan',
        description: 'Arjun watched recording and acknowledged reminder.',
        type: 'response'
      }
    ]
  },
  {
    id: 'msg-006',
    studentId: 'std-007',
    studentName: 'Kavya Nair',
    studentAvatar: 'KN',
    studentEmail: 'kavya.nair@institution.edu',
    batch: 'Engineering Cohort 4',
    type: 'Check-in',
    subject: 'Study Pace & DPP Submissions',
    content: 'Hi Kavya, we love seeing your active questions on the forum! We noticed your daily study hours dropped slightly over the past 4 days. Let us know if the current cohort pacing feels comfortable or if you need extra practice materials.',
    trigger: '4 days inactive + Study duration drop 28%',
    triggerSignalType: 'activity',
    riskLevel: 'Medium',
    riskScore: 58,
    status: 'Delivered',
    responseStatus: 'Awaiting Response',
    sentAt: 'Aug 25, 2026, 08:30 AM',
    deliveredAt: 'Aug 25, 2026, 08:31 AM',
    readAt: null,
    respondedAt: null,
    responseContent: null,
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-15', text: '4 days inactive', type: 'inactivity', severity: 'medium' },
      { id: 'sig-16', text: 'Study duration ↓ 28%', type: 'activity', severity: 'low' }
    ],
    timeline: [
      {
        id: 'tl-21',
        date: 'Aug 24, 2026',
        time: '08:00 PM',
        title: 'Study Duration Drop Flagged',
        description: 'Weekly aggregate study time dropped below cohort median.',
        type: 'activity'
      },
      {
        id: 'tl-22',
        date: 'Aug 25, 2026',
        time: '08:30 AM',
        title: 'Educator Check-in Sent',
        description: 'Manual outreach from Educator workspace.',
        type: 'sent'
      }
    ]
  },
  {
    id: 'msg-007',
    studentId: 'std-004',
    studentName: 'Meera Singh',
    studentAvatar: 'MS',
    studentEmail: 'meera.singh@institution.edu',
    batch: 'Engineering Cohort 4',
    type: 'Encouragement',
    subject: 'Great Progress on Module 2 Recovery!',
    content: 'Hi Meera, great job recovering your quiz completion rate over the last 10 days! Your risk score has dropped steadily into the healthy range. Keep up the consistent pace for this week\'s assessments!',
    trigger: 'Risk Score decreased from 54 to 42 (Recovery Signal)',
    triggerSignalType: 'milestone',
    riskLevel: 'Medium',
    riskScore: 42,
    status: 'Read',
    responseStatus: 'Responded',
    sentAt: 'Aug 22, 2026, 02:15 PM',
    deliveredAt: 'Aug 22, 2026, 02:16 PM',
    readAt: 'Aug 22, 2026, 02:40 PM',
    respondedAt: 'Aug 22, 2026, 03:05 PM',
    responseContent: 'Thank you Sir! The practice problem sessions helped a lot. Feeling much more confident with Calculus now.',
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-9', text: 'Login frequency declining', type: 'login', severity: 'low' }
    ],
    timeline: [
      {
        id: 'tl-23',
        date: 'Aug 20, 2026',
        time: '07:00 PM',
        title: 'Quiz Submission Streak Achieved',
        description: 'Completed 3 consecutive DPPs with average score 78%.',
        type: 'activity'
      },
      {
        id: 'tl-24',
        date: 'Aug 22, 2026',
        time: '02:15 PM',
        title: 'Encouragement Message Sent',
        description: 'Positive reinforcement outreach dispatched.',
        type: 'sent'
      },
      {
        id: 'tl-25',
        date: 'Aug 22, 2026',
        time: '03:05 PM',
        title: 'Student Acknowledged',
        description: 'Student shared positive feedback.',
        type: 'response'
      }
    ]
  },
  {
    id: 'msg-008',
    studentId: 'std-008',
    studentName: 'Rohan Kulkarni',
    studentAvatar: 'RK',
    studentEmail: 'rohan.k@institution.edu',
    batch: 'Batch Alpha 2026',
    type: 'Encouragement',
    subject: 'Cohort Recognition: Top 5% Quiz Streak',
    content: 'Hi Rohan, exceptional work on maintaining a 92% quiz completion rate and zero missed deadlines throughout August. You are in the top tier of Batch Alpha. Keep setting the standard!',
    trigger: 'Top quartile performance & consistent daily logins',
    triggerSignalType: 'milestone',
    riskLevel: 'Healthy',
    riskScore: 22,
    status: 'Read',
    responseStatus: 'Not Required',
    sentAt: 'Aug 21, 2026, 10:00 AM',
    deliveredAt: 'Aug 21, 2026, 10:01 AM',
    readAt: 'Aug 21, 2026, 10:20 AM',
    respondedAt: null,
    responseContent: null,
    automated: true,
    createdBy: 'StudyShield Early-Warning System',
    relatedSignals: [
      { id: 'sig-17', text: 'Consistent daily logins', type: 'login', severity: 'positive' },
      { id: 'sig-18', text: 'Quiz completion 92%', type: 'quiz', severity: 'positive' }
    ],
    timeline: [
      {
        id: 'tl-26',
        date: 'Aug 21, 2026',
        time: '10:00 AM',
        title: 'Automated Positive Reinforcement',
        description: 'Triggered for students with risk score < 25 and 100% attendance.',
        type: 'sent'
      },
      {
        id: 'tl-27',
        date: 'Aug 21, 2026',
        time: '10:20 AM',
        title: 'Read by Student',
        description: 'Student viewed badge notification.',
        type: 'read'
      }
    ]
  },
  {
    id: 'msg-009',
    studentId: 'std-009',
    studentName: 'Tanvi Joshi',
    studentAvatar: 'TJ',
    studentEmail: 'tanvi.j@institution.edu',
    batch: 'Batch Beta 2026',
    type: 'Custom',
    subject: 'Advanced Problem Solving Mentorship Invitation',
    content: 'Hi Tanvi, given your flawless 100% quiz completion and 94% average score across Thermodynamics and Mechanics, we would like to invite you to join the Advanced Problem Solving cohort on Saturdays.',
    trigger: 'Academic Excellence: R(t) = 16 (Top 1%)',
    triggerSignalType: 'milestone',
    riskLevel: 'Healthy',
    riskScore: 16,
    status: 'Read',
    responseStatus: 'Responded',
    sentAt: 'Aug 20, 2026, 11:30 AM',
    deliveredAt: 'Aug 20, 2026, 11:31 AM',
    readAt: 'Aug 20, 2026, 12:05 PM',
    respondedAt: 'Aug 20, 2026, 01:15 PM',
    responseContent: 'I would be delighted to join the Saturday advanced sessions! Thank you so much for this opportunity.',
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-19', text: '100% quiz completion', type: 'quiz', severity: 'positive' }
    ],
    timeline: [
      {
        id: 'tl-28',
        date: 'Aug 20, 2026',
        time: '11:30 AM',
        title: 'Mentorship Invitation Dispatched',
        description: 'Personalized invite sent by Educator.',
        type: 'sent'
      },
      {
        id: 'tl-29',
        date: 'Aug 20, 2026',
        time: '01:15 PM',
        title: 'Student Accepted Invitation',
        description: 'Enrolled into Saturday Advanced Circle.',
        type: 'response'
      }
    ]
  },
  {
    id: 'msg-010',
    studentId: 'std-010',
    studentName: 'Siddharth Sen',
    studentAvatar: 'SS',
    studentEmail: 'siddharth.s@institution.edu',
    batch: 'Engineering Cohort 4',
    type: 'Study Reminder',
    subject: 'Upcoming Weekly Assessment Schedule',
    content: 'Hi Siddharth, a reminder that the Module 4 assessment opens tomorrow morning at 09:00 AM. You have maintained great momentum this month!',
    trigger: 'Cohort Assessment Reminder',
    triggerSignalType: 'quiz',
    riskLevel: 'Healthy',
    riskScore: 19,
    status: 'Read',
    responseStatus: 'Not Required',
    sentAt: 'Aug 19, 2026, 05:00 PM',
    deliveredAt: 'Aug 19, 2026, 05:01 PM',
    readAt: 'Aug 19, 2026, 06:12 PM',
    respondedAt: null,
    responseContent: null,
    automated: true,
    createdBy: 'StudyShield Early-Warning System',
    relatedSignals: [
      { id: 'sig-21', text: 'Active daily learner', type: 'activity', severity: 'positive' }
    ],
    timeline: [
      {
        id: 'tl-30',
        date: 'Aug 19, 2026',
        time: '05:00 PM',
        title: 'Scheduled Reminder Dispatched',
        description: 'Standard cohort announcement trigger.',
        type: 'sent'
      }
    ]
  },
  {
    id: 'msg-011',
    studentId: 'std-001',
    studentName: 'Rahul Sharma',
    studentAvatar: 'RS',
    studentEmail: 'rahul.sharma@institution.edu',
    batch: 'Batch Alpha 2026',
    type: 'Follow-up',
    subject: 'Follow-up: 1-on-1 Academic Counseling',
    content: 'Hi Rahul, this is a quick follow-up to our check-in yesterday. We have reserved a 15-minute slot for you with our academic counselor on Friday at 04:00 PM. Please confirm if this time suits you.',
    trigger: 'Unanswered Early Warning after 24h',
    triggerSignalType: 'manual',
    riskLevel: 'High',
    riskScore: 87,
    status: 'Scheduled',
    responseStatus: 'Awaiting Response',
    sentAt: 'Aug 26, 2026, 09:00 AM (Scheduled)',
    deliveredAt: null,
    readAt: null,
    respondedAt: null,
    responseContent: null,
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-1', text: '12 days inactive', type: 'inactivity', severity: 'high' }
    ],
    timeline: [
      {
        id: 'tl-31',
        date: 'Aug 25, 2026',
        time: '05:00 PM',
        title: 'Scheduled for Morning Dispatch',
        description: 'Educator queued proactive counseling outreach.',
        type: 'sent'
      }
    ]
  },
  {
    id: 'msg-012',
    studentId: 'std-002',
    studentName: 'Priya Mehta',
    studentAvatar: 'PM',
    studentEmail: 'priya.mehta@institution.edu',
    batch: 'Batch Beta 2026',
    type: 'Follow-up',
    subject: 'Thermodynamics DPP Study Notes & Solution Guide',
    content: 'Hi Priya, following up on your message: here is the direct link to the Thermodynamics simplified formula sheet and video solutions for DPP #4. Take your time, and reach out if any derivation is unclear.',
    trigger: 'Educator follow-up to student promise',
    triggerSignalType: 'manual',
    riskLevel: 'High',
    riskScore: 74,
    status: 'Delivered',
    responseStatus: 'Awaiting Response',
    sentAt: 'Aug 25, 2026, 09:45 AM',
    deliveredAt: 'Aug 25, 2026, 09:46 AM',
    readAt: null,
    respondedAt: null,
    responseContent: null,
    automated: false,
    createdBy: 'Anurag (Lead Educator)',
    relatedSignals: [
      { id: 'sig-5', text: '3 missed quizzes', type: 'quiz', severity: 'high' }
    ],
    timeline: [
      {
        id: 'tl-32',
        date: 'Aug 25, 2026',
        time: '09:45 AM',
        title: 'Study Materials Dispatched',
        description: 'Educator shared supplemental notes as promised.',
        type: 'sent'
      }
    ]
  }
];

export const OUTREACH_TEMPLATES = [
  {
    id: 'tmpl-early-warning',
    type: 'Early Warning',
    title: 'Severe Inactivity & Risk Warning',
    subject: 'Action Recommended: Inactivity Check-in & Academic Support',
    body: 'Hi {name},\n\nWe noticed you haven\'t logged into your course modules recently and your quiz activity has dropped. Your progress is important to us, and we want to ensure you have all the support you need.\n\nPlease let us know if you\'re experiencing any blockers or if you\'d like to schedule a 1-on-1 session to get back on track.\n\nWarm regards,\nLead Educator Anurag'
  },
  {
    id: 'tmpl-quiz-reminder',
    type: 'Quiz Reminder',
    title: 'Missed DPP / Quiz Reminder',
    subject: 'Upcoming Quiz & Practice DPP Reminder',
    body: 'Hi {name},\n\nThis is a friendly reminder that you have missed recent quiz milestones. Consistent practice with Daily Practice Problems (DPPs) is key to mastering these concepts.\n\nPlease log in today to complete your pending quizzes.\n\nBest,\nStudyShield Learning Team'
  },
  {
    id: 'tmpl-checkin',
    type: 'Check-in',
    title: 'Supportive Progress Check-in',
    subject: 'How are your studies going, {name}?',
    body: 'Hi {name},\n\nHope your week is going well! We wanted to check in and see how you are feeling about the latest course topics. If you feel stuck on any concepts or need extra explanation notes, we are here to help.\n\nLet us know,\nEducator Workspace'
  },
  {
    id: 'tmpl-study-reminder',
    type: 'Study Reminder',
    title: 'Study Momentum & Schedule Reminder',
    subject: 'Weekly Learning Modules & Problem Sessions',
    body: 'Hi {name},\n\nWe noticed a slight dip in your study pace over the past few days. To keep your momentum strong for the upcoming assessment, take 30–45 minutes today to catch up on key recordings.\n\nYou\'ve got this!\nStudyShield Retention Team'
  },
  {
    id: 'tmpl-encouragement',
    type: 'Encouragement',
    title: 'Positive Reinforcement & Recovery Praise',
    subject: 'Great Effort on Your Recent Recovery, {name}!',
    body: 'Hi {name},\n\nWe wanted to celebrate your recent consistency! Your quiz completion and engagement have improved significantly, moving your risk indicators into a healthy range.\n\nKeep up the wonderful work!\nLead Educator Anurag'
  },
  {
    id: 'tmpl-followup',
    type: 'Follow-up',
    title: 'Academic Follow-up & 1-on-1 Booking',
    subject: 'Follow-up on Your Study Plan',
    body: 'Hi {name},\n\nFollowing up on our earlier note, we have arranged dedicated counseling and 1-on-1 doubt clearing slots this week. Please let us know what time works best for you.\n\nBest,\nLead Educator Anurag'
  }
];

export const calculateOutreachMetrics = (messages = []) => {
  // Aggregate stats across messages
  const totalSent = messages.filter(m => m.status !== 'Draft').length;
  const delivered = messages.filter(m => ['Delivered', 'Read'].includes(m.status)).length;
  const read = messages.filter(m => m.status === 'Read').length;
  const awaitingResponse = messages.filter(m => m.responseStatus === 'Awaiting Response').length;
  
  // Follow-ups due: High-risk students with no response or awaiting response over 24h
  const followupsDue = messages.filter(m => 
    (m.riskLevel === 'High' && (m.responseStatus === 'No Response' || m.responseStatus === 'Awaiting Response')) ||
    m.type === 'Follow-up'
  ).length;

  return {
    totalSent: totalSent || 128,
    delivered: delivered || 124,
    read: read || 96,
    awaitingResponse: awaitingResponse || 18,
    followupsDue: followupsDue || 7
  };
};
