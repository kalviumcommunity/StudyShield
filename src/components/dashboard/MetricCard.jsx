import React from 'react';
import { Users, AlertTriangle, ShieldAlert, CheckCircle2, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export default function MetricCard({ 
  type = 'totalStudents', 
  title, 
  value, 
  subtitle, 
  trend, 
  trendType = 'neutral',
  onClick,
  isSelected
}) {
  const configs = {
    totalStudents: {
      defaultTitle: 'Total Students',
      defaultSubtitle: 'Students currently being monitored',
      icon: Users,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      borderHover: 'hover:border-slate-300',
      accentBar: 'bg-slate-400'
    },
    studentsAtRisk: {
      defaultTitle: 'Students At Risk',
      defaultSubtitle: 'Showing elevated warning signals',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderHover: 'hover:border-amber-300',
      accentBar: 'bg-amber-500'
    },
    highRisk: {
      defaultTitle: 'High Risk',
      defaultSubtitle: 'Require immediate attention',
      icon: ShieldAlert,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      borderHover: 'hover:border-rose-300',
      accentBar: 'bg-rose-500'
    },
    healthyEngagement: {
      defaultTitle: 'Healthy Engagement',
      defaultSubtitle: '82.7% of students',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      accentBar: 'bg-emerald-500'
    }
  };

  const config = configs[type] || configs.totalStudents;
  const IconComponent = config.icon;

  const getTrendBadge = () => {
    if (!trend) return null;

    if (trendType === 'danger') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          {trend}
        </span>
      );
    }
    if (trendType === 'warning') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      );
    }
    if (trendType === 'positive') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3 h-3" />
          {trend}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
        {trend}
      </span>
    );
  };

  return (
    <div 
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected 
          ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md' 
          : 'border-slate-200/90 hover:shadow-md ' + config.borderHover
      }`}
    >
      {/* Top row: Title and Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title || config.defaultTitle}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${config.iconBg} ${config.iconColor}`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      {/* Metric value and trend */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          {value}
        </span>
        <div>
          {getTrendBadge()}
        </div>
      </div>

      {/* Explanatory description */}
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        {subtitle || config.defaultSubtitle}
      </p>

      {/* Subtle bottom indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${config.accentBar} opacity-80`} />
    </div>
  );
}
