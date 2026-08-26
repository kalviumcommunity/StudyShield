import React from 'react';
import { 
  Bot, 
  User, 
  Clock, 
  CheckCircle2, 
  Eye, 
  AlertCircle, 
  Send, 
  ExternalLink, 
  ChevronRight, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getRiskCategory } from '../../data/mockStudents';

export const getTypeBadge = (type) => {
  switch (type) {
    case 'Early Warning':
      return {
        label: 'Early Warning',
        className: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    case 'Check-in':
      return {
        label: 'Check-in',
        className: 'bg-sky-50 text-sky-700 border-sky-200'
      };
    case 'Quiz Reminder':
      return {
        label: 'Quiz Reminder',
        className: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'Study Reminder':
      return {
        label: 'Study Reminder',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    case 'Encouragement':
      return {
        label: 'Encouragement',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    case 'Follow-up':
      return {
        label: 'Follow-up',
        className: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    default:
      return {
        label: type || 'Custom',
        className: 'bg-slate-100 text-slate-700 border-slate-200'
      };
  }
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'Read':
      return {
        label: 'Read',
        icon: Eye,
        className: 'bg-sky-50 text-sky-700 border-sky-200'
      };
    case 'Delivered':
      return {
        label: 'Delivered',
        icon: CheckCircle2,
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    case 'Sent':
      return {
        label: 'Sent',
        icon: Send,
        className: 'bg-slate-100 text-slate-700 border-slate-200'
      };
    case 'Scheduled':
      return {
        label: 'Scheduled',
        icon: Clock,
        className: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'Draft':
      return {
        label: 'Draft',
        icon: Clock,
        className: 'bg-slate-100 text-slate-500 border-slate-200'
      };
    case 'Failed':
      return {
        label: 'Failed',
        icon: AlertCircle,
        className: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    default:
      return {
        label: status,
        icon: CheckCircle2,
        className: 'bg-slate-100 text-slate-700 border-slate-200'
      };
  }
};

export const getResponseBadge = (responseStatus) => {
  switch (responseStatus) {
    case 'Responded':
      return {
        label: 'Responded',
        className: 'bg-emerald-100/80 text-emerald-800 border-emerald-200 font-semibold'
      };
    case 'Awaiting Response':
      return {
        label: 'Awaiting Response',
        className: 'bg-amber-100/80 text-amber-800 border-amber-200 font-medium'
      };
    case 'No Response':
      return {
        label: 'No Response',
        className: 'bg-rose-100/80 text-rose-800 border-rose-200 font-medium'
      };
    case 'Not Required':
    default:
      return {
        label: 'Not Required',
        className: 'bg-slate-100 text-slate-500 border-slate-200'
      };
  }
};

export default function MessagesTable({
  messages = [],
  onSelectMessage,
  onOpenComposerForStudent,
  onViewStudentProfile
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-3.5 pl-6 pr-4">Recipient</th>
              <th scope="col" className="py-3.5 px-4">Message Preview</th>
              <th scope="col" className="py-3.5 px-4">Type & Trigger</th>
              <th scope="col" className="py-3.5 px-4">Sent At</th>
              <th scope="col" className="py-3.5 px-4 text-center">Status</th>
              <th scope="col" className="py-3.5 px-4 text-center">Response</th>
              <th scope="col" className="py-3.5 pr-6 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {messages.map((msg) => {
              const typeBadge = getTypeBadge(msg.type);
              const statusBadge = getStatusBadge(msg.status);
              const responseBadge = getResponseBadge(msg.responseStatus);
              const StatusIcon = statusBadge.icon;
              const isHighRisk = msg.riskLevel === 'High';

              return (
                <tr
                  key={msg.id}
                  onClick={() => onSelectMessage && onSelectMessage(msg)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  
                  {/* Recipient / Student Info */}
                  <td className="py-4 pl-6 pr-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ${
                        isHighRisk
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : msg.riskLevel === 'Medium'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {msg.studentAvatar || msg.studentName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                            {msg.studentName}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-sm ${
                            isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            R: {msg.riskScore}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{msg.batch}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Message Preview */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {msg.automated ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <Bot className="w-3 h-3" />
                            Auto
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <User className="w-3 h-3" />
                            Manual
                          </span>
                        )}
                        <span className="font-semibold text-slate-800 truncate block text-xs">
                          {msg.subject || 'Outreach Note'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        &quot;{msg.content}&quot;
                      </p>
                    </div>
                  </td>

                  {/* Type & Trigger Reason */}
                  <td className="py-4 px-4 max-w-[200px]">
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${typeBadge.className}`}>
                        {typeBadge.label}
                      </span>
                      <p className="text-[11px] text-slate-500 truncate" title={msg.trigger}>
                        {msg.trigger}
                      </p>
                    </div>
                  </td>

                  {/* Sent Date / Time */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-slate-700 font-medium text-xs">
                      {msg.sentAt}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      By {msg.createdBy?.split(' ')[0] || 'System'}
                    </div>
                  </td>

                  {/* Delivery Status */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusBadge.className}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </td>

                  {/* Response Status */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] border ${responseBadge.className}`}>
                      {responseBadge.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectMessage && onSelectMessage(msg)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        title="View complete message & timeline"
                      >
                        View
                      </button>
                      
                      <button
                        onClick={() => onOpenComposerForStudent && onOpenComposerForStudent(msg)}
                        className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
                        title="Send follow-up"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Displaying <strong className="text-slate-800">{messages.length}</strong> communication records
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          Synchronized with Student Early-Warning Engine
        </span>
      </div>
    </div>
  );
}
