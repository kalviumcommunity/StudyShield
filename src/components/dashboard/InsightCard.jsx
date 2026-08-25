import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

export default function InsightCard({ onExploreSignals }) {
  return (
    <div className="relative rounded-2xl p-6 sm:p-7 overflow-hidden text-white studyshield-dark-mesh border border-emerald-800/40 shadow-lg">
      
      {/* Decorative ambient radial aura */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-40 h-40 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>StudyShield Intelligence</span>
        </div>

        {/* Heading */}
        <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-white tracking-tight font-sans">
          Key Predictive Insight
        </h3>

        {/* Content */}
        <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          Students who become inactive for more than <strong className="text-emerald-400 font-bold">7 days</strong> are showing the strongest correlation with rising risk scores this week. Early nudges sent within 48 hours reduced drop-off by <strong className="text-emerald-400 font-bold">64%</strong>.
        </p>

        {/* CTA Button */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => onExploreSignals && onExploreSignals()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-150 group"
          >
            <span>Explore risk signals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs text-emerald-200/70 hidden sm:inline-block">
            Based on cohort analysis of 248 learners
          </span>
        </div>

      </div>

    </div>
  );
}
