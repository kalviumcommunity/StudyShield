"use client";

import React from 'react';
import { 
  Send, 
  CheckCircle2, 
  Eye, 
  Clock, 
  AlertTriangle, 
  Plus, 
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function MessagesHeader({
  metrics,
  activeQuickFilter,
  onSelectQuickFilter,
  onOpenComposer,
  onRefresh,
  isRefreshing
}) {
  const metricCards = [
    {
      id: 'totalSent',
      title: 'Total Sent',
      value: metrics.totalSent,
      subtitle: 'Dispatched student interventions',
      icon: Send,
      iconColor: 'text-slate-700',
      iconBg: 'bg-slate-100',
      badge: 'All Time',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      filterKey: 'ALL'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      value: metrics.delivered,
      subtitle: 'Reached student portal & apps',
      icon: CheckCircle2,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      badge: `${Math.round((metrics.delivered / (metrics.totalSent || 1)) * 100)}% Rate`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      filterKey: 'DELIVERED'
    },
    {
      id: 'read',
      title: 'Read',
      value: metrics.read,
      subtitle: 'Opened & viewed by students',
      icon: Eye,
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-100',
      badge: `${Math.round((metrics.read / (metrics.delivered || 1)) * 100)}% Open Rate`,
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      filterKey: 'READ'
    },
    {
      id: 'awaitingResponse',
      title: 'Awaiting Response',
      value: metrics.awaitingResponse,
      subtitle: 'Pending learner action/reply',
      icon: Clock,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-100',
      badge: 'Action Required',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      filterKey: 'AWAITING'
    },
    {
      id: 'followupsDue',
      title: 'Follow-ups Due',
      value: metrics.followupsDue,
      subtitle: 'High-risk cases needing attention',
      icon: AlertTriangle,
      iconColor: 'text-rose-700',
      iconBg: 'bg-rose-100',
      badge: 'Urgent Priority',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      filterKey: 'FOLLOWUPS'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              Messages & Outreach
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Formula R(t) Interventions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Track student communication, interventions, and follow-ups in one place.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all disabled:opacity-50"
              title="Refresh messages and delivery statuses"
              aria-label="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          )}

          <button
            onClick={onOpenComposer}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span>+ New Message</span>
          </button>
        </div>
      </div>

      {/* Summary Cards Grid (5 Cards) */}
      <section aria-labelledby="outreach-summary-heading">
        <h2 id="outreach-summary-heading" className="sr-only">Outreach Summary Metrics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            const isSelected = activeQuickFilter === card.filterKey;
            const isLastOnMobile = idx === 4;

            return (
              <div
                key={card.id}
                onClick={() => onSelectQuickFilter && onSelectQuickFilter(card.filterKey)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none relative overflow-hidden ${
                  isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'bg-emerald-50/50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                    {card.title}
                  </span>
                  <div className={`w-7 h-7 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {card.subtitle}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-700">
                      Active Filter
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
