import React from 'react';
import { 
  X, 
  Clock, 
  HelpCircle, 
  TrendingDown, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  UserCheck,
  AlertTriangle,
  Sparkles,
  Calculator
} from 'lucide-react';
import { getRiskCategory } from '../../data/mockStudents';

export default function StudentDetailDrawer({ isOpen, onClose, student, onOpenNudge }) {
  if (!isOpen || !student) return null;

  const category = getRiskCategory(student.riskScore);
  const isHighRisk = student.statusCategory === 'HIGH';

  // Calculate formula variables for transparency
  const Q = student.quizCompletionRate;
  const inactiveDays = student.inactiveDays;
  const L = Math.min(100, inactiveDays * 25);
  const quizFactor = Math.round(0.6 * (100 - Q));
  const inactivityFactor = Math.round(0.4 * L);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl font-bold text-sm flex items-center justify-center shadow-xs ${
              isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {student.avatar}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {student.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {student.batch} • {student.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 divide-y divide-slate-100">
          
          {/* Top Score Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isHighRisk ? 'bg-rose-50/70 border-rose-200' : 'bg-amber-50/70 border-amber-200'
          }`}>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Retention Risk Level
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-2xl font-extrabold ${
                  isHighRisk ? 'text-rose-700' : 'text-amber-700'
                }`}>
                  {student.riskScore}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ 100</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isHighRisk ? 'bg-rose-200/80 text-rose-800' : 'bg-amber-200/80 text-amber-800'
                }`}>
                  {student.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenNudge && onOpenNudge(student);
              }}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reach out</span>
            </button>
          </div>

          {/* Mathematical Formula Breakdown Card */}
          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              Formula Breakdown: R(t)
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
              <p className="text-[11px] text-slate-600 font-sans font-medium">
                R(t) = min(100, 0.6 × (100 − Q) + 0.4 × L)
              </p>
              <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1 border-t border-slate-200">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-sans block">Quiz Deficit (60%)</span>
                  <span className="font-bold text-slate-900">+{quizFactor} pts</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Q = {Q}%</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-sans block">Inactivity (40%)</span>
                  <span className="font-bold text-rose-600">+{inactivityFactor} pts</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">L = {L} ({inactiveDays}d)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detected Early Warning Signals */}
          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Triggered Warning Signals
            </h4>
            <div className="space-y-1.5">
              {student.signals.map((sig) => (
                <div 
                  key={sig.id} 
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-medium ${
                    sig.severity === 'high' 
                      ? 'bg-rose-50 text-rose-800 border-rose-100' 
                      : 'bg-amber-50 text-amber-800 border-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{sig.text}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-white rounded border">
                    {sig.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Week Risk History Timeline */}
          {student.details && student.details.riskHistory && (
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>5-Week Risk Trajectory</span>
                <span className="text-[10px] text-rose-600 font-bold capitalize">
                  Trend: {student.details.trend}
                </span>
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-end justify-between h-20 gap-2 pt-2">
                  {student.details.riskHistory.map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-700">{val}</span>
                      <div 
                        style={{ height: `${(val / 100) * 48}px` }} 
                        className={`w-full rounded-t-md ${
                          val >= 70 ? 'bg-rose-500' : val >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} 
                      />
                      <span className="text-[9px] text-slate-400">W{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Academic Snapshot */}
          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Learning Activity Summary
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px]">Quizzes Attempted</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {student.details?.quizzesAttempted || 2} / {student.details?.totalQuizzes || 8}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px]">Average Score</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {student.details?.averageScore || 44}%
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px]">Missed Deadlines</span>
                <p className="text-sm font-bold text-rose-600 mt-0.5">
                  {student.details?.missedDeadlines || 3} items
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px]">Last Activity</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {student.lastActive}
                </p>
              </div>
            </div>
          </div>

          {/* Educator Notes */}
          {student.details?.notes && (
            <div className="pt-4 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Observation Note
              </h4>
              <p className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl text-xs text-amber-900 leading-relaxed">
                {student.details.notes}
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Enrolled in {student.batch}
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenNudge && onOpenNudge(student);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Compose Nudge &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
