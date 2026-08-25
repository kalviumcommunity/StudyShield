import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  TrendingDown, 
  ChevronRight, 
  Search, 
  Filter, 
  Mail, 
  UserCheck, 
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { getRiskCategory } from '../../data/mockStudents';

export default function StudentsNeedingAttention({ 
  students = [], 
  onReachOut, 
  onReviewStudent,
  onToggleMonitor,
  selectedBatch,
  initialRiskFilter = 'ALL'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState(initialRiskFilter); // ALL, HIGH, MEDIUM, HEALTHY
  const [sortBy, setSortBy] = useState('riskDesc'); // riskDesc, inactiveDesc, quizAsc

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Batch filter
      if (selectedBatch && selectedBatch !== 'All Batches' && student.batch !== selectedBatch) {
        return false;
      }
      // Risk category filter
      if (riskFilter === 'HIGH' && student.statusCategory !== 'HIGH') return false;
      if (riskFilter === 'MEDIUM' && student.statusCategory !== 'MEDIUM') return false;
      if (riskFilter === 'HEALTHY' && student.statusCategory !== 'HEALTHY') return false;
      if (riskFilter === 'AT_RISK' && student.statusCategory === 'HEALTHY') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesEmail = student.email.toLowerCase().includes(query);
        const matchesSignal = student.signals.some(s => s.text.toLowerCase().includes(query));
        return matchesName || matchesEmail || matchesSignal;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'riskDesc') return b.riskScore - a.riskScore;
      if (sortBy === 'inactiveDesc') return b.inactiveDays - a.inactiveDays;
      if (sortBy === 'quizAsc') return a.quizCompletionRate - b.quizCompletionRate;
      return 0;
    });
  }, [students, selectedBatch, riskFilter, searchQuery, sortBy]);

  const getSignalIcon = (type) => {
    switch (type) {
      case 'inactivity':
        return <Clock className="w-3 h-3 text-rose-500 shrink-0" />;
      case 'quiz':
        return <HelpCircle className="w-3 h-3 text-amber-500 shrink-0" />;
      case 'login':
      case 'activity':
      case 'assessment':
      case 'session':
        return <TrendingDown className="w-3 h-3 text-rose-500 shrink-0" />;
      default:
        return <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />;
    }
  };

  const getActionButton = (student) => {
    if (student.recommendedAction === 'Reach out') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReachOut && onReachOut(student);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs hover:shadow transition-all group"
        >
          <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>Reach out</span>
        </button>
      );
    }
    if (student.recommendedAction === 'Review student') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReviewStudent && onReviewStudent(student);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          <span>Review</span>
        </button>
      );
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReviewStudent ? onReviewStudent(student) : onToggleMonitor && onToggleMonitor(student);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
      >
        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>{student.recommendedAction || 'Monitor'}</span>
      </button>
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden" aria-labelledby="students-attention-heading">
      
      {/* Section Header with Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="students-attention-heading" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Students Needing Attention
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                {filteredStudents.filter(s => s.statusCategory === 'HIGH').length} High Priority
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Students showing significant changes in learning activity, quiz completion, and login frequency.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Search Input */}
            <div className="relative min-w-[180px] sm:min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name or signal..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
              />
            </div>

            {/* Risk Category Filter Pills */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium text-slate-600 border border-slate-200/60">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'HIGH', label: 'High Risk (70–100)' },
                { key: 'MEDIUM', label: 'Medium (40–69)' },
                { key: 'HEALTHY', label: 'Healthy (0–39)' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setRiskFilter(filter.key)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    riskFilter === filter.key
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-2.5 pr-7 py-1.5 text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer appearance-none"
                aria-label="Sort students list"
              >
                <option value="riskDesc">Highest Risk First</option>
                <option value="inactiveDesc">Longest Inactivity</option>
                <option value="quizAsc">Lowest Quiz Rate</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

          </div>
        </div>
      </div>

      {/* Table & List View */}
      {filteredStudents.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No students match current filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching to All risk categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setRiskFilter('ALL');
            }}
            className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th scope="col" className="py-3.5 pl-6 pr-4">Student</th>
                <th scope="col" className="py-3.5 px-4 text-center">Risk Score</th>
                <th scope="col" className="py-3.5 px-4">Detected Signals</th>
                <th scope="col" className="py-3.5 px-4">Last Activity</th>
                <th scope="col" className="py-3.5 pr-6 pl-4 text-right">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((student) => {
                const category = getRiskCategory(student.riskScore);
                const isHighRisk = student.statusCategory === 'HIGH';

                return (
                  <tr 
                    key={student.id} 
                    onClick={() => onReviewStudent && onReviewStudent(student)}
                    className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                  >
                    
                    {/* Student Info */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ${
                          isHighRisk 
                            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                            : category.label === 'Medium Risk'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}>
                          {student.avatar || student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                              {student.name}
                            </span>
                            {isHighRisk && (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span>{student.batch}</span>
                            <span>•</span>
                            <span className="truncate max-w-[140px] text-slate-400">{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Risk Score */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          isHighRisk
                            ? 'bg-rose-100 text-rose-800 border border-rose-200/80'
                            : category.label === 'Medium Risk'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200/80'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200/80'
                        }`}>
                          <span className="text-sm font-extrabold">{student.riskScore}</span>
                          <span className="text-[10px] text-slate-500 font-normal ml-1">/100</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-tight">
                          {student.status}
                        </span>
                      </div>
                    </td>

                    {/* Detected Early Warning Signals */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-md">
                        {student.signals.map((signal) => (
                          <span
                            key={signal.id}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                              signal.severity === 'high'
                                ? 'bg-rose-50/80 text-rose-800 border-rose-200/60'
                                : signal.severity === 'medium'
                                ? 'bg-amber-50/80 text-amber-800 border-amber-200/60'
                                : 'bg-emerald-50/80 text-emerald-800 border-emerald-200/60'
                            }`}
                          >
                            {getSignalIcon(signal.type)}
                            <span>{signal.text}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Last Activity */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-slate-700 font-medium">
                        {student.lastActive}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Quiz completion: {student.quizCompletionRate}%
                      </div>
                    </td>

                    {/* Action CTA */}
                    <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                      {getActionButton(student)}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Table Footer Summary */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-800">{filteredStudents.length}</strong> of{' '}
          <strong className="text-slate-800">{students.length}</strong> students
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Formula: R(t) = min(100, 0.6×(100−Q) + 0.4×L)
          </span>
        </div>
      </div>

    </section>
  );
}
