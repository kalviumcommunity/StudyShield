import React, { useState, useEffect, useMemo } from 'react';
import MessagesHeader from '../components/messages/MessagesHeader';
import MessagesFilterBar from '../components/messages/MessagesFilterBar';
import MessagesTable from '../components/messages/MessagesTable';
import MessagesCardList from '../components/messages/MessagesCardList';
import MessagesEmptyState from '../components/messages/MessagesEmptyState';
import MessageDetailModal from '../components/messages/MessageDetailModal';
import MessageComposerModal from '../components/messages/MessageComposerModal';

import { 
  getStoredMessages, 
  getMessages, 
  createMessages, 
  updateMessageStatus,
  getSummaryMetrics 
} from '../services/messageService';
import { MOCK_STUDENTS } from '../data/mockStudents';

export default function MessagesOutreach({
  students = MOCK_STUDENTS,
  selectedBatch = 'All Batches',
  onViewStudentDetail,
  onShowToast
}) {
  const [allMessages, setAllMessages] = useState(() => getStoredMessages());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedResponse, setSelectedResponse] = useState('All Responses');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
  const [activeQuickFilter, setActiveQuickFilter] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal / Drawer state
  const [selectedMessageForDetail, setSelectedMessageForDetail] = useState(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerInitialStudent, setComposerInitialStudent] = useState(null);

  // Re-fetch messages from storage on mount
  useEffect(() => {
    setAllMessages(getStoredMessages());
  }, []);

  // Compute dynamic summary metrics based on current batch
  const summaryMetrics = useMemo(() => {
    const batchMessages = selectedBatch === 'All Batches'
      ? allMessages
      : allMessages.filter(m => m.batch === selectedBatch);
    return getSummaryMetrics(batchMessages);
  }, [allMessages, selectedBatch]);

  // Compute filtered messages
  const filteredMessages = useMemo(() => {
    return allMessages.filter((msg) => {
      // Batch filter
      if (selectedBatch !== 'All Batches' && msg.batch !== selectedBatch) {
        return false;
      }

      // Quick metric card filters
      if (activeQuickFilter === 'DELIVERED') {
        if (!['Delivered', 'Read'].includes(msg.status)) return false;
      } else if (activeQuickFilter === 'READ') {
        if (msg.status !== 'Read') return false;
      } else if (activeQuickFilter === 'AWAITING') {
        if (msg.responseStatus !== 'Awaiting Response') return false;
      } else if (activeQuickFilter === 'FOLLOWUPS') {
        const isFollowup = msg.type === 'Follow-up' || 
          (msg.riskLevel === 'High' && (msg.responseStatus === 'No Response' || msg.responseStatus === 'Awaiting Response'));
        if (!isFollowup) return false;
      }

      // Dropdown filters
      if (selectedType !== 'All Types' && msg.type !== selectedType) return false;
      if (selectedStatus !== 'All Status' && msg.status !== selectedStatus) return false;
      if (selectedResponse !== 'All Responses' && msg.responseStatus !== selectedResponse) return false;
      if (selectedRiskLevel !== 'All Risk Levels' && msg.riskLevel.toLowerCase() !== selectedRiskLevel.toLowerCase()) return false;

      // Origin filter (Automated vs Manual)
      if (selectedOrigin === 'Automated' && !msg.automated) return false;
      if (selectedOrigin === 'Manual' && msg.automated) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = msg.studentName?.toLowerCase().includes(query);
        const matchesEmail = msg.studentEmail?.toLowerCase().includes(query);
        const matchesSubject = msg.subject?.toLowerCase().includes(query);
        const matchesContent = msg.content?.toLowerCase().includes(query);
        const matchesTrigger = msg.trigger?.toLowerCase().includes(query);
        const matchesBatch = msg.batch?.toLowerCase().includes(query);

        if (!matchesName && !matchesEmail && !matchesSubject && !matchesContent && !matchesTrigger && !matchesBatch) {
          return false;
        }
      }

      return true;
    });
  }, [
    allMessages,
    selectedBatch,
    activeQuickFilter,
    selectedType,
    selectedStatus,
    selectedResponse,
    selectedRiskLevel,
    selectedOrigin,
    searchQuery
  ]);

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAllMessages(getStoredMessages());
      setIsRefreshing(false);
      onShowToast && onShowToast('Outreach delivery records and responses updated.');
    }, 500);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedStatus('All Status');
    setSelectedResponse('All Responses');
    setSelectedRiskLevel('All Risk Levels');
    setSelectedOrigin('All');
    setSelectedDateRange('All Time');
    setActiveQuickFilter('ALL');
  };

  const handleSelectQuickFilter = (key) => {
    if (activeQuickFilter === key) {
      setActiveQuickFilter('ALL');
    } else {
      setActiveQuickFilter(key);
    }
  };

  const handleSendMessage = (payloads) => {
    const created = createMessages(payloads);
    setAllMessages(getStoredMessages());
    const count = Array.isArray(created) ? created.length : 1;
    onShowToast && onShowToast(
      count === 1
        ? `Outreach dispatched successfully to ${created[0].studentName}.`
        : `Dispatched outreach to ${count} students successfully.`
    );
  };

  const handleOpenComposerForStudent = (msg) => {
    setComposerInitialStudent(msg);
    setIsComposerOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Header with dynamic summary cards & + New Message */}
      <MessagesHeader
        metrics={summaryMetrics}
        activeQuickFilter={activeQuickFilter}
        onSelectQuickFilter={handleSelectQuickFilter}
        onOpenComposer={() => {
          setComposerInitialStudent(null);
          setIsComposerOpen(true);
        }}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Comprehensive Filter Bar */}
      <MessagesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedResponse={selectedResponse}
        onResponseChange={setSelectedResponse}
        selectedRiskLevel={selectedRiskLevel}
        onRiskLevelChange={setSelectedRiskLevel}
        selectedOrigin={selectedOrigin}
        onOriginChange={setSelectedOrigin}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        onClearFilters={handleClearFilters}
        totalResults={filteredMessages.length}
        totalCount={allMessages.length}
      />

      {/* 3. Messages List / Empty State */}
      {allMessages.length === 0 ? (
        <MessagesEmptyState
          type="no_messages"
          onAction={() => {
            setComposerInitialStudent(null);
            setIsComposerOpen(true);
          }}
        />
      ) : filteredMessages.length === 0 ? (
        <MessagesEmptyState
          type="no_results"
          onResetFilters={handleClearFilters}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <MessagesTable
              messages={filteredMessages}
              onSelectMessage={(msg) => setSelectedMessageForDetail(msg)}
              onOpenComposerForStudent={handleOpenComposerForStudent}
              onViewStudentProfile={(studentId) => {
                const found = students.find(s => s.id === studentId);
                if (found && onViewStudentDetail) onViewStudentDetail(found);
              }}
            />
          </div>

          {/* Mobile & Tablet Cards View */}
          <div className="md:hidden">
            <MessagesCardList
              messages={filteredMessages}
              onSelectMessage={(msg) => setSelectedMessageForDetail(msg)}
              onOpenComposerForStudent={handleOpenComposerForStudent}
            />
          </div>
        </>
      )}

      {/* Detail Modal */}
      <MessageDetailModal
        isOpen={!!selectedMessageForDetail}
        onClose={() => setSelectedMessageForDetail(null)}
        message={selectedMessageForDetail}
        onOpenComposerForStudent={handleOpenComposerForStudent}
        onViewStudentProfile={(studentId) => {
          const found = students.find(s => s.id === studentId);
          if (found && onViewStudentDetail) {
            setSelectedMessageForDetail(null);
            onViewStudentDetail(found);
          }
        }}
      />

      {/* Composer Modal */}
      <MessageComposerModal
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerInitialStudent(null);
        }}
        initialStudent={composerInitialStudent}
        students={students}
        onSendMessage={handleSendMessage}
      />

    </div>
  );
}
