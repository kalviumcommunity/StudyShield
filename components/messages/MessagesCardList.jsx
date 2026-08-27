"use client";

import React from 'react';
import { Bot, User, Clock, Send, Eye, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { getTypeBadge, getStatusBadge, getResponseBadge } from './MessagesTable';

export default function MessagesCardList({
  messages = [],
  onSelectMessage,
  onOpenComposerForStudent
}) {
  return (
    <div className="space-y-3 md:hidden">
      {messages.map((msg) => {
        const typeBadge = getTypeBadge(msg.type);
        const statusBadge = getStatusBadge(msg.status);
        const responseBadge = getResponseBadge(msg.responseStatus);
        const StatusIcon = statusBadge.icon;
        const isHighRisk = msg.riskLevel === 'High';

        return (
          <div
            key={msg.id}
            onClick={() => onSelectMessage && onSelectMessage(msg)}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-3"
          >
            {/* Header: Student Info & Risk Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ${
                  isHighRisk
                    ? 'bg-rose-100 text-rose-700'
                    : msg.riskLevel === 'Medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {msg.studentAvatar || msg.studentName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">
                    {msg.studentName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {msg.batch}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isHighRisk 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  Risk Score: {msg.riskScore}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {msg.sentAt.split(',')[0]}
                </span>
              </div>
            </div>

            {/* Middle: Type & Subject Preview */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${typeBadge.className}`}>
                  {typeBadge.label}
                </span>
                {msg.automated ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                    <Bot className="w-3 h-3" /> Auto
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                    <User className="w-3 h-3" /> Manual
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                {msg.subject}
              </p>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                &quot;{msg.content}&quot;
              </p>
            </div>

            {/* Trigger Reason */}
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span className="font-bold text-slate-600">Trigger:</span>
              <span className="truncate">{msg.trigger}</span>
            </div>

            {/* Footer Status Badges & Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge.className}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span>{statusBadge.label}</span>
                </span>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] border ${responseBadge.className}`}>
                  {responseBadge.label}
                </span>
              </div>

              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onOpenComposerForStudent && onOpenComposerForStudent(msg)}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  Follow-up
                </button>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
