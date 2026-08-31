"use client";

import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  Bot, 
  User, 
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { MESSAGE_TYPES, MESSAGE_STATUSES, RESPONSE_STATUSES } from '@/data/mockMessages';

export default function MessagesFilterBar({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedResponse,
  onResponseChange,
  selectedRiskLevel,
  onRiskLevelChange,
  selectedOrigin,
  onOriginChange,
  selectedDateRange,
  onDateRangeChange,
  onClearFilters,
  totalResults,
  totalCount
}) {
  const isFiltered = (
    (searchQuery && searchQuery.trim() !== '') ||
    selectedType !== 'All Types' ||
    selectedStatus !== 'All Status' ||
    selectedResponse !== 'All Responses' ||
    selectedRiskLevel !== 'All Risk Levels' ||
    selectedOrigin !== 'All' ||
    selectedDateRange !== 'All Time'
  );

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3.5">
      
      {/* Top Row: Search Input + Origin Tabs + Clear Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search student, message content, trigger, or email..."
            className="w-full pl-9.5 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Origin Quick Switcher (All / Automated / Manual) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium text-slate-600 border border-slate-200/60 overflow-x-auto max-w-full">
            {[
              { key: 'All', label: 'All Messages', shortLabel: 'All' },
              { key: 'Automated', label: 'Automated Interventions', shortLabel: 'Automated', icon: Bot },
              { key: 'Manual', label: 'Manual Outreach', shortLabel: 'Manual', icon: User }
            ].map((origin) => {
              const Icon = origin.icon;
              const isActive = selectedOrigin === origin.key;
              return (
                <button
                  key={origin.key}
                  onClick={() => onOriginChange(origin.key)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{origin.label}</span>
                  <span className="sm:hidden">{origin.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Filters CTA */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom Row: Multi-Dropdown Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100">
        
        {/* Message Type */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Message Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All Types">All Types</option>
            {MESSAGE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Delivery Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Delivery Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All Status">All Status</option>
            {MESSAGE_STATUSES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Response State */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Response Status
          </label>
          <select
            value={selectedResponse}
            onChange={(e) => onResponseChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All Responses">All Responses</option>
            {RESPONSE_STATUSES.map((rs) => (
              <option key={rs} value={rs}>{rs}</option>
            ))}
          </select>
        </div>

        {/* Risk Level */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Student Risk Level
          </label>
          <select
            value={selectedRiskLevel}
            onChange={(e) => onRiskLevelChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All Risk Levels">All Risk Levels</option>
            <option value="High">High Risk (70–100)</option>
            <option value="Medium">Medium Risk (40–69)</option>
            <option value="Healthy">Healthy (0–39)</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Date Range
          </label>
          <select
            value={selectedDateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>

      </div>

      {/* Active Filter Pills Bar */}
      {isFiltered && (
        <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Query: &quot;{searchQuery}&quot;
              <button onClick={() => onSearchChange('')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedOrigin !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Origin: {selectedOrigin}
              <button onClick={() => onOriginChange('All')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedType !== 'All Types' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Type: {selectedType}
              <button onClick={() => onTypeChange('All Types')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedStatus !== 'All Status' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Status: {selectedStatus}
              <button onClick={() => onStatusChange('All Status')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedResponse !== 'All Responses' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Response: {selectedResponse}
              <button onClick={() => onResponseChange('All Responses')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedRiskLevel !== 'All Risk Levels' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Risk: {selectedRiskLevel}
              <button onClick={() => onRiskLevelChange('All Risk Levels')} className="hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <span className="text-[11px] text-slate-500 ml-auto">
            Showing <strong className="text-slate-900">{totalResults}</strong> of {totalCount} messages
          </span>
        </div>
      )}

    </div>
  );
}
