import React from 'react';
import { MessageSquare, Plus, SearchX, RotateCcw } from 'lucide-react';

export default function MessagesEmptyState({ 
  type = 'no_messages', // 'no_messages' | 'no_results'
  onAction,
  onResetFilters 
}) {
  if (type === 'no_results') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          No messages match your filters
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
          We couldn&apos;t find any student outreach matching the selected criteria. Try adjusting your search query, type, or status filters.
        </p>
        <div className="mt-5">
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-14 text-center shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <MessageSquare className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">
        No messages yet
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
        Messages and student interventions will appear here once communication begins. You can send targeted nudges or trigger early-warning outreach.
      </p>
      <div className="mt-6">
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Send a Message</span>
        </button>
      </div>
    </div>
  );
}
