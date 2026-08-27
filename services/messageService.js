/**
 * StudyShield Outreach & Message Service Layer
 * 
 * Clean, decoupled data access service to query, create, update,
 * and filter outreach communications. Backed by localStorage with
 * fallback to mock data, making it ready for future REST/GraphQL endpoints.
 */

import { MOCK_MESSAGES, calculateOutreachMetrics } from '@/data/mockMessages';

const STORAGE_KEY = 'studyshield_messages_v1';

// Initialize or fetch messages from storage
export const getStoredMessages = () => {
  if (typeof window === 'undefined') {
    return MOCK_MESSAGES;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading messages from localStorage, falling back to mock:', e);
  }
  return MOCK_MESSAGES;
};

// Save messages to storage
export const saveStoredMessages = (messages) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.warn('Error writing messages to localStorage:', e);
  }
};

/**
 * Fetch all messages with optional filtering
 */
export const getMessages = (filters = {}) => {
  let messages = getStoredMessages();

  // Filter by Batch
  if (filters.batch && filters.batch !== 'All Batches') {
    messages = messages.filter(m => m.batch === filters.batch);
  }

  // Filter by Type
  if (filters.type && filters.type !== 'All Types') {
    messages = messages.filter(m => m.type === filters.type);
  }

  // Filter by Delivery Status
  if (filters.status && filters.status !== 'All Status') {
    messages = messages.filter(m => m.status === filters.status);
  }

  // Filter by Response Status
  if (filters.responseStatus && filters.responseStatus !== 'All Responses') {
    messages = messages.filter(m => m.responseStatus === filters.responseStatus);
  }

  // Filter by Risk Level
  if (filters.riskLevel && filters.riskLevel !== 'All Risk Levels') {
    messages = messages.filter(m => m.riskLevel.toLowerCase() === filters.riskLevel.toLowerCase());
  }

  // Filter by Origin (Automated vs Manual)
  if (filters.origin && filters.origin !== 'All') {
    if (filters.origin === 'Automated') {
      messages = messages.filter(m => m.automated === true);
    } else if (filters.origin === 'Manual') {
      messages = messages.filter(m => m.automated === false);
    }
  }

  // Search query (matches student name, email, subject, content, trigger)
  if (filters.search && filters.search.trim()) {
    const query = filters.search.toLowerCase().trim();
    messages = messages.filter(m => {
      return (
        m.studentName?.toLowerCase().includes(query) ||
        m.studentEmail?.toLowerCase().includes(query) ||
        m.subject?.toLowerCase().includes(query) ||
        m.content?.toLowerCase().includes(query) ||
        m.trigger?.toLowerCase().includes(query) ||
        m.batch?.toLowerCase().includes(query)
      );
    });
  }

  return messages;
};

/**
 * Get a single message by ID
 */
export const getMessageById = (id) => {
  const messages = getStoredMessages();
  return messages.find(m => m.id === id) || null;
};

/**
 * Create one or more new messages (supports bulk recipient dispatch)
 */
export const createMessages = (newMessagesData) => {
  const currentMessages = getStoredMessages();
  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date());

  const items = Array.isArray(newMessagesData) ? newMessagesData : [newMessagesData];
  
  const createdItems = items.map((data, index) => {
    const id = `msg-${Date.now()}-${index}`;
    const isScheduled = data.scheduledFor ? true : false;
    const status = isScheduled ? 'Scheduled' : 'Delivered';

    return {
      id,
      studentId: data.studentId,
      studentName: data.studentName,
      studentAvatar: data.studentAvatar || data.studentName.substring(0, 2).toUpperCase(),
      studentEmail: data.studentEmail,
      batch: data.batch,
      type: data.type || 'Check-in',
      subject: data.subject || `${data.type} from Educator`,
      content: data.content,
      trigger: data.trigger || 'Manual Educator Outreach',
      triggerSignalType: data.triggerSignalType || 'manual',
      riskLevel: data.riskLevel || 'Medium',
      riskScore: data.riskScore ?? 50,
      status: status,
      responseStatus: data.requiresResponse !== false ? 'Awaiting Response' : 'Not Required',
      sentAt: isScheduled ? `${data.scheduledFor} (Scheduled)` : dateFormatted,
      deliveredAt: isScheduled ? null : dateFormatted,
      readAt: null,
      respondedAt: null,
      responseContent: null,
      automated: false,
      createdBy: data.createdBy || 'Anurag (Lead Educator)',
      relatedSignals: data.relatedSignals || [],
      timeline: [
        {
          id: `tl-create-${Date.now()}-${index}`,
          date: dateFormatted.split(',')[0],
          time: dateFormatted.split(',')[1]?.trim() || 'Just now',
          title: isScheduled ? 'Message Scheduled' : 'Message Dispatched',
          description: isScheduled 
            ? `Queued for delivery on ${data.scheduledFor}` 
            : 'Personalized message sent via Educator Outreach Console.',
          type: 'sent'
        }
      ]
    };
  });

  const updatedMessages = [...createdItems, ...currentMessages];
  saveStoredMessages(updatedMessages);
  return createdItems;
};

/**
 * Update message status
 */
export const updateMessageStatus = (id, updates) => {
  const currentMessages = getStoredMessages();
  const updatedMessages = currentMessages.map(m => {
    if (m.id === id) {
      return { ...m, ...updates };
    }
    return m;
  });
  saveStoredMessages(updatedMessages);
  return updatedMessages.find(m => m.id === id);
};

/**
 * Delete a message
 */
export const deleteMessage = (id) => {
  const currentMessages = getStoredMessages();
  const updatedMessages = currentMessages.filter(m => m.id !== id);
  saveStoredMessages(updatedMessages);
  return true;
};

/**
 * Get summary metrics for the given message list or full dataset
 */
export const getSummaryMetrics = (messages) => {
  const dataset = messages || getStoredMessages();
  return calculateOutreachMetrics(dataset);
};

/**
 * Reset messages to default mock data
 */
export const resetToDefaultMessages = () => {
  saveStoredMessages(MOCK_MESSAGES);
  return MOCK_MESSAGES;
};
