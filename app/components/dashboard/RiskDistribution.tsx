"use client";

import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, Info } from 'lucide-react';
export default function RiskDistribution({ onSelectCategory, students = [] }) {
  const healthyCount = students.filter((s) => s.statusCategory === 'HEALTHY').length;
  const mediumCount = students.filter((s) => s.statusCategory === 'MEDIUM').length;
  const highCount = students.filter((s) => s.statusCategory === 'HIGH').length;
  const total = students.length || 1; // prevent division by zero
  const healthy = { count: healthyCount, percentage: Math.round((healthyCount / total) * 100) };
  const mediumRisk = { count: mediumCount, percentage: Math.round((mediumCount / total) * 100) };
  const highRisk = { count: highCount, percentage: Math.round((highCount / total) * 100) };
  const displayTotal = students.length;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Student Risk Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cohort health breakdown across 3 risk tiers
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          {displayTotal} Total Students
        </span>
      </div>

      {/* Segmented Horizontal Bar */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-full bg-slate-100 flex overflow-hidden p-0.5 shadow-inner" role="progressbar" aria-label="Risk Distribution">
          {/* Healthy segment */}
          <div 
            style={{ width: `${healthy.percentage}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500 hover:brightness-110 cursor-pointer relative group"
            title={`Healthy: ${healthy.count} students (${healthy.percentage}%)`}
            onClick={() => onSelectCategory && onSelectCategory('HEALTHY')}
          />
          {/* Medium Risk segment */}
          <div 
            style={{ width: `${mediumRisk.percentage}%` }}
            className="h-full bg-amber-500 transition-all duration-500 hover:brightness-110 cursor-pointer relative group"
            title={`Medium Risk: ${mediumRisk.count} students (${mediumRisk.percentage}%)`}
            onClick={() => onSelectCategory && onSelectCategory('MEDIUM')}
          />
          {/* High Risk segment */}
          <div 
            style={{ width: `${highRisk.percentage}%` }}
            className="h-full bg-rose-500 rounded-r-full transition-all duration-500 hover:brightness-110 cursor-pointer relative group"
            title={`High Risk: ${highRisk.count} students (${highRisk.percentage}%)`}
            onClick={() => onSelectCategory && onSelectCategory('HIGH')}
          />
        </div>

        {/* Legend / Category Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          
          {/* Healthy */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('HEALTHY')}
            className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Healthy
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">0–39</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900">{healthy.count}</span>
              <span className="text-[11px] text-slate-500 font-medium">({healthy.percentage}%)</span>
            </div>
          </div>

          {/* Medium Risk */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('MEDIUM')}
            className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Medium
              </span>
              <span className="text-[10px] text-amber-600 font-medium">40–69</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900">{mediumRisk.count}</span>
              <span className="text-[11px] text-slate-500 font-medium">({mediumRisk.percentage}%)</span>
            </div>
          </div>

          {/* High Risk */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('HIGH')}
            className="p-2.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                High Risk
              </span>
              <span className="text-[10px] text-rose-600 font-medium">70–100</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900">{highRisk.count}</span>
              <span className="text-[11px] text-slate-500 font-medium">({highRisk.percentage}%)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Callout Footer */}
      <div className="mt-4 p-3 bg-rose-50/70 border border-rose-100 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-rose-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span><strong>{highCount} student{highCount !== 1 ? 's' : ''}</strong> currently require immediate attention.</span>
        </div>
        <button
          onClick={() => onSelectCategory && onSelectCategory('HIGH')}
          className="text-rose-700 hover:text-rose-900 font-bold inline-flex items-center gap-0.5 hover:underline shrink-0"
        >
          View queue <ChevronRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
