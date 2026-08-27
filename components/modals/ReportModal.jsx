"use client";

import React, { useState } from 'react';
import { X, FileText, Download, Check, Sparkles, Calendar, Layers } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, metrics, batch = 'All Batches' }) {
  const [format, setFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleExport = (e) => {
    e.preventDefault();
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Generate Retention Report
              </h3>
              <p className="text-xs text-slate-500">
                Cohort risk & engagement analysis
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
        <form onSubmit={handleExport} className="p-5 space-y-4">
          
          {/* Summary Preview Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Selected Scope: {batch}</span>
              <span className="text-emerald-700 font-semibold">248 Students</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px] block">High Risk</span>
                <span className="font-bold text-rose-600">12 Students</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Medium Risk</span>
                <span className="font-bold text-amber-600">31 Students</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Healthy</span>
                <span className="font-bold text-emerald-600">205 Students</span>
              </div>
            </div>
          </div>

          {/* Export Format Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  format === 'pdf'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="block font-bold">Executive PDF</span>
                <span className="text-[11px] text-slate-500">Formatted summary & charts</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  format === 'csv'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="block font-bold">Raw CSV Data</span>
                <span className="text-[11px] text-slate-500">Student rows & risk scores</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isExporting || isDone}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              {isDone ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
                  <span>{isExporting ? 'Generating...' : 'Export Report'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
