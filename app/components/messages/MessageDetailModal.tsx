"use client";

import React from 'react';
import { 
  X, 
  Bot, 
  User, 
  Send, 
  CheckCircle2, 
  Eye, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  ExternalLink, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { getTypeBadge, getStatusBadge, getResponseBadge } from './MessagesTable';

export default function MessageDetailModal({
  isOpen,
  onClose,
  message,
  onOpenComposerForStudent = (_msg) => {},
  onViewStudentProfile = (_studentId) => {},
  onUpdateStatus = (_status) => {}
}) {
  if (!isOpen || !message) return null;

  const typeBadge = getTypeBadge(message.type);
  const statusBadge = getStatusBadge(message.status);
  const responseBadge = getResponseBadge(message.responseStatus);
  const isHighRisk = message.riskLevel === 'High';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl font-bold text-sm flex items-center justify-center shadow-xs ${
              isHighRisk
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : message.riskLevel === 'Medium'
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {message.studentAvatar || message.studentName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {message.studentName}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isHighRisk
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Risk Score: {message.riskScore}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {message.batch} • {message.studentEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onViewStudentProfile && onViewStudentProfile(message.studentId);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Profile</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 divide-y divide-slate-100">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Message Type
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${typeBadge.className}`}>
                {typeBadge.label}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Origin
              </span>
              {message.automated ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <Bot className="w-3.5 h-3.5" /> Automated Intervention
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Manual Outreach
                </span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Delivery Status
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                message.status === 'Read' ? 'text-sky-700' : 'text-emerald-700'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> {message.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Response
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${responseBadge.className}`}>
                {responseBadge.label}
              </span>
            </div>
          </div>

          {/* Trigger Banner */}
          <div className="pt-5 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Trigger Condition & Root Cause
            </h4>
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <strong className="font-semibold block">{message.trigger}</strong>
                <span className="text-[11px] text-amber-700 mt-0.5 block">
                  Dispatched via: {message.createdBy}
                </span>
              </div>
              <span className="text-[11px] px-2 py-1 bg-white font-mono rounded-lg border border-amber-200 text-amber-800 self-start sm:self-auto shrink-0">
                Formula Score: R = {message.riskScore}
              </span>
            </div>
          </div>

          {/* Complete Message Box */}
          <div className="pt-5 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Message Content
              </h4>
              <span className="text-[11px] text-slate-400">
                Sent on {message.sentAt}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              {message.subject && (
                <div className="border-b border-slate-200/70 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Subject:
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    {message.subject}
                  </p>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {message.content}
              </p>
            </div>

            {/* Delivery / Read Timestamps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 pt-1">
              <div>
                <span className="text-slate-400">Delivered:</span>{' '}
                <strong className="text-slate-700">{message.deliveredAt || 'Instant in-app'}</strong>
              </div>
              <div>
                <span className="text-slate-400">Read:</span>{' '}
                <strong className="text-slate-700">{message.readAt || 'Unread / In Feed'}</strong>
              </div>
              <div>
                <span className="text-slate-400">Response SLA:</span>{' '}
                <strong className="text-slate-700">48 Hours</strong>
              </div>
            </div>
          </div>

          {/* Student Response Section (if exists) */}
          {message.responseContent ? (
            <div className="pt-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Student Response Received
                </h4>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {message.respondedAt}
                </span>
              </div>
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 leading-relaxed italic">
                &quot;{message.responseContent}&quot;
              </div>
            </div>
          ) : message.responseStatus === 'Awaiting Response' ? (
            <div className="pt-5">
              <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center justify-between text-xs text-amber-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Awaiting student reply or quiz completion activity.</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenComposerForStudent && onOpenComposerForStudent(message);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  Send gentle reminder
                </button>
              </div>
            </div>
          ) : null}

          {/* Chronological Communication Timeline */}
          {message.timeline && message.timeline.length > 0 && (
            <div className="pt-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>Intervention & Feedback Timeline</span>
                <span className="text-[10px] text-emerald-600 font-bold capitalize">
                  Cycle: Activity &rarr; Trigger &rarr; Outreach &rarr; Response
                </span>
              </h4>

              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {message.timeline.map((item, idx) => (
                    <div key={item.id || idx} className="relative">
                      <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                        item.type === 'response' 
                          ? 'bg-emerald-500 ring-2 ring-emerald-100' 
                          : item.type === 'risk_change'
                          ? 'bg-rose-500 ring-2 ring-rose-100'
                          : item.type === 'sent'
                          ? 'bg-emerald-600 ring-2 ring-emerald-100'
                          : 'bg-slate-400'
                      }`} />
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {item.date} {item.time ? `• ${item.time}` : ''}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onViewStudentProfile && onViewStudentProfile(message.studentId);
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 sm:hidden"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenComposerForStudent && onOpenComposerForStudent(message);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Follow-up</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
