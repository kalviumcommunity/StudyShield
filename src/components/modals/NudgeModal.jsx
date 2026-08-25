import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare, Check, User } from 'lucide-react';
import { NUDGE_TEMPLATES } from '../../data/dashboardMetrics';

export default function NudgeModal({ isOpen, onClose, student, onSendNudge }) {
  const [selectedTemplate, setSelectedTemplate] = useState('tmpl-quiz');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (student) {
      const tmpl = NUDGE_TEMPLATES.find(t => t.id === selectedTemplate) || NUDGE_TEMPLATES[0];
      setCustomMessage(tmpl.message.replace('{name}', student.name.split(' ')[0]));
    }
  }, [student, selectedTemplate]);

  if (!isOpen || !student) return null;

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSendNudge && onSendNudge(student.id, customMessage);
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {student.avatar}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Send Nudge to {student.name}
              </h3>
              <p className="text-xs text-slate-500">
                {student.batch} • Risk Score: <strong className="text-rose-600">{student.riskScore}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSend} className="p-5 space-y-4">
          
          {/* Template Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Outreach Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {NUDGE_TEMPLATES.map((tmpl) => (
                <button
                  type="button"
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    selectedTemplate === tmpl.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <p className="truncate font-semibold">{tmpl.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Personalized Message
            </label>
            <textarea
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white resize-none"
              placeholder="Write a supportive note..."
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Delivered directly into the student&apos;s StudyShield portal and notification feed.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Formula R(t) updates on student response
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending || isSuccess}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all disabled:opacity-50"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Nudge Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-spin' : ''}`} />
                    <span>{isSending ? 'Sending...' : 'Send Nudge'}</span>
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
