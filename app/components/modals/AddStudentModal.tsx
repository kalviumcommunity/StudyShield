"use client";

import React, { useState } from 'react';
import { X, UserPlus, Check, Sparkles } from 'lucide-react';
import { BATCHES, calculateRiskScore } from '@/data/mockStudents';

export default function AddStudentModal({ isOpen, onClose, onAddStudent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('Batch Alpha 2026');
  const [inactiveDays, setInactiveDays] = useState(0);
  const [quizCompletionRate, setQuizCompletionRate] = useState(100);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const riskScore = calculateRiskScore(Number(quizCompletionRate), Number(inactiveDays));
    const statusCategory = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'HEALTHY';
    const status = statusCategory === 'HIGH' ? 'High Risk' : statusCategory === 'MEDIUM' ? 'Medium Risk' : 'Healthy';

    const newStudent = {
      id: `std-${Date.now()}`,
      name,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST',
      email,
      batch,
      riskScore,
      status,
      statusCategory,
      inactiveDays: Number(inactiveDays),
      quizCompletionRate: Number(quizCompletionRate),
      lastActive: inactiveDays === 0 ? 'Today' : `${inactiveDays} days ago`,
      recommendedAction: statusCategory === 'HIGH' ? 'Reach out' : statusCategory === 'MEDIUM' ? 'Monitor' : 'On Track',
      signals: inactiveDays > 0 
        ? [{ id: `sig-${Date.now()}`, text: `${inactiveDays} days inactive`, type: 'inactivity', severity: inactiveDays > 5 ? 'high' : 'medium' }]
        : [{ id: `sig-${Date.now()}`, text: 'Consistent daily logins', type: 'login', severity: 'positive' }],
      details: {
        quizzesAttempted: Math.round((Number(quizCompletionRate) / 100) * 8),
        totalQuizzes: 8,
        averageScore: 80,
        missedDeadlines: Math.max(0, 8 - Math.round((Number(quizCompletionRate) / 100) * 8)),
        lastLoginDate: 'Today',
        trend: 'stable',
        riskHistory: [riskScore, riskScore, riskScore, riskScore, riskScore],
        notes: 'Recently enrolled in cohort monitoring.'
      }
    };

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onAddStudent && onAddStudent(newStudent);
      setName('');
      setEmail('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Enroll New Student
              </h3>
              <p className="text-xs text-slate-500">
                Add learner to StudyShield retention model
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Neha Verma"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. neha.v@institution.edu"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cohort / Batch
            </label>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {BATCHES.filter(b => b !== 'All Batches').map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Days Inactive
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={inactiveDays}
                onChange={(e) => setInactiveDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quiz Completion %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={quizCompletionRate}
                onChange={(e) => setQuizCompletionRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
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
              disabled={isSuccess}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Enrolled!</span>
                </>
              ) : (
                <span>Add to Monitor</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
