import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Send, 
  Clock, 
  Sparkles, 
  Search, 
  Check, 
  UserCheck, 
  Users, 
  AlertTriangle,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { MESSAGE_TYPES, OUTREACH_TEMPLATES } from '../../data/mockMessages';
import { MOCK_STUDENTS } from '../../data/mockStudents';

export default function MessageComposerModal({
  isOpen,
  onClose,
  initialStudent = null,
  students = MOCK_STUDENTS,
  onSendMessage
}) {
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [messageType, setMessageType] = useState('Early Warning');
  const [selectedTemplateId, setSelectedTemplateId] = useState('tmpl-early-warning');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendMode, setSendMode] = useState('now'); // 'now' | 'schedule'
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [studentRiskFilter, setStudentRiskFilter] = useState('ALL'); // ALL | HIGH | MEDIUM | HEALTHY
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // When initialStudent is passed, pre-select it
  useEffect(() => {
    if (initialStudent) {
      const studentId = initialStudent.studentId || initialStudent.id;
      setSelectedStudentIds([studentId]);
      
      // Auto-set message type if provided
      if (initialStudent.type) {
        setMessageType(initialStudent.type);
      }
    } else {
      // Default to top high-risk student if none selected
      const highRisk = students.find(s => s.statusCategory === 'HIGH');
      if (highRisk && selectedStudentIds.length === 0) {
        setSelectedStudentIds([highRisk.id]);
      }
    }
  }, [initialStudent, isOpen, students]);

  // Apply template changes
  useEffect(() => {
    const tmpl = OUTREACH_TEMPLATES.find(t => t.id === selectedTemplateId) || OUTREACH_TEMPLATES[0];
    if (tmpl) {
      setMessageType(tmpl.type);
      
      // Get first selected student name for personalization preview
      const firstStudent = students.find(s => selectedStudentIds.includes(s.id));
      const firstName = firstStudent ? firstStudent.name.split(' ')[0] : 'Student';
      
      setSubject(tmpl.subject.replace('{name}', firstName));
      setContent(tmpl.body.replace('{name}', firstName));
    }
  }, [selectedTemplateId, selectedStudentIds]);

  // Filter student list for recipient picker
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (studentRiskFilter === 'HIGH' && s.statusCategory !== 'HIGH') return false;
      if (studentRiskFilter === 'MEDIUM' && s.statusCategory !== 'MEDIUM') return false;
      if (studentRiskFilter === 'HEALTHY' && s.statusCategory !== 'HEALTHY') return false;

      if (searchStudent.trim()) {
        const query = searchStudent.toLowerCase();
        return s.name.toLowerCase().includes(query) || s.email.toLowerCase().includes(query) || s.batch.toLowerCase().includes(query);
      }
      return true;
    });
  }, [students, studentRiskFilter, searchStudent]);

  if (!isOpen) return null;

  const handleToggleStudent = (id) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter(item => item !== id));
    } else {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  };

  const handleSelectAllHighRisk = () => {
    const highRiskIds = students.filter(s => s.statusCategory === 'HIGH').map(s => s.id);
    setSelectedStudentIds(highRiskIds);
  };

  const handleSelectAllFiltered = () => {
    const allFilteredIds = filteredStudents.map(s => s.id);
    setSelectedStudentIds(allFilteredIds);
  };

  const handleClearSelection = () => {
    setSelectedStudentIds([]);
  };

  const handleSubmit = (e, asDraft = false) => {
    if (e) e.preventDefault();
    if (selectedStudentIds.length === 0) return;

    setIsSubmitting(true);

    const selectedStudentsData = students.filter(s => selectedStudentIds.includes(s.id));
    
    // Construct message payloads for all selected students
    const payloads = selectedStudentsData.map(s => {
      const firstName = s.name.split(' ')[0];
      const personalizedBody = content.replace(/Hi\s+[A-Za-z]+,/i, `Hi ${firstName},`);
      const personalizedSubject = subject.replace(/\{name\}/g, firstName);

      return {
        studentId: s.id,
        studentName: s.name,
        studentAvatar: s.avatar || s.name.substring(0, 2).toUpperCase(),
        studentEmail: s.email,
        batch: s.batch,
        type: messageType,
        subject: personalizedSubject,
        content: personalizedBody,
        trigger: s.signals?.[0]?.text ? `Active Alert: ${s.signals[0].text}` : 'Manual Educator Outreach',
        triggerSignalType: s.signals?.[0]?.type || 'manual',
        riskLevel: s.statusCategory === 'HIGH' ? 'High' : s.statusCategory === 'MEDIUM' ? 'Medium' : 'Healthy',
        riskScore: s.riskScore,
        scheduledFor: sendMode === 'schedule' ? scheduledDateTime || 'Tomorrow, 09:00 AM' : null,
        requiresResponse: messageType !== 'Encouragement',
        relatedSignals: s.signals || []
      };
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSendMessage && onSendMessage(payloads);
        onClose();
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                Compose Outreach Message
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Send targeted interventions, check-ins, and study nudges to learners.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Section 1: Recipient Selection with Rich Student Cards */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Select Recipients ({selectedStudentIds.length} selected)
              </label>

              {/* Quick group action buttons */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAllHighRisk}
                  className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold border border-rose-200 text-[11px]"
                >
                  + All High Risk ({students.filter(s => s.statusCategory === 'HIGH').length})
                </button>
                <button
                  type="button"
                  onClick={handleSelectAllFiltered}
                  className="text-slate-600 hover:text-slate-900 text-[11px] underline"
                >
                  Select All
                </button>
                {selectedStudentIds.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-rose-600 hover:text-rose-700 text-[11px]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Recipient Filter & Search */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Search students to message..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600 border border-slate-200/60">
                {['ALL', 'HIGH', 'MEDIUM'].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setStudentRiskFilter(r)}
                    className={`px-2 py-1 rounded text-[11px] ${
                      studentRiskFilter === r
                        ? 'bg-white font-bold text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {r === 'ALL' ? 'All' : r === 'HIGH' ? 'High Risk' : 'Medium'}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Picker List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
              {filteredStudents.map((student) => {
                const isSelected = selectedStudentIds.includes(student.id);
                const isHighRisk = student.statusCategory === 'HIGH';

                return (
                  <div
                    key={student.id}
                    onClick={() => handleToggleStudent(student.id)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent div
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 pointer-events-none"
                      />
                      <div className={`w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {student.avatar || student.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-slate-900 truncate leading-tight">
                          {student.name}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {student.batch}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        R: {student.riskScore}
                      </span>
                      <span className="block text-[9px] text-slate-400 mt-0.5">
                        {student.lastActive}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedStudentIds.length === 0 && (
              <p className="text-[11px] text-rose-600 font-medium">
                Please select at least one student recipient.
              </p>
            )}
          </div>

          {/* Section 2: Outreach Template Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Choose Outreach Template</span>
              <span className="text-[11px] text-emerald-700 font-normal lowercase">
                auto-personalizes with learner name
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {OUTREACH_TEMPLATES.map((tmpl) => (
                <button
                  type="button"
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    selectedTemplateId === tmpl.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <span className="text-[9px] uppercase font-bold text-emerald-600 block mb-0.5">
                    {tmpl.type}
                  </span>
                  <p className="truncate font-semibold text-slate-900">{tmpl.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Subject & Message Body */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Important: Academic Check-in..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Personalized Message Body
                </label>
                <span className="text-[11px] text-slate-400">
                  {content.length} characters
                </span>
              </div>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your message..."
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white resize-none"
                required
              />
            </div>
          </div>

          {/* Section 4: Dispatch Options (Send Now vs Schedule) */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                <input
                  type="radio"
                  name="sendMode"
                  checked={sendMode === 'now'}
                  onChange={() => setSendMode('now')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Send Immediately</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                <input
                  type="radio"
                  name="sendMode"
                  checked={sendMode === 'schedule'}
                  onChange={() => setSendMode('schedule')}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Schedule for Later</span>
              </label>
            </div>

            {sendMode === 'schedule' && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  placeholder="e.g. Aug 27, 09:00 AM"
                  className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Delivery confirmed to Student Dashboard & In-App Alerts
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || selectedStudentIds.length === 0 || isSuccess}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all disabled:opacity-50"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                    <span>
                      {isSubmitting 
                        ? 'Dispatching...' 
                        : sendMode === 'schedule' 
                        ? `Schedule for (${selectedStudentIds.length})` 
                        : `Send to ${selectedStudentIds.length} Student${selectedStudentIds.length === 1 ? '' : 's'}`
                      }
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
