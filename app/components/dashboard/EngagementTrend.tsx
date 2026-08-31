"use client";

import React, { useState } from 'react';
import { TrendingDown, ArrowRight, Activity, Calendar } from 'lucide-react';
import { ENGAGEMENT_TREND_DATA } from '@/data/dashboardMetrics';

export default function EngagementTrend({ onViewActivityDetails }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG Chart Dimensions
  const width = 500;
  const height = 180;
  const paddingX = 45;
  const paddingTop = 25;
  const paddingBottom = 35;

  const minVal = 70;
  const maxVal = 90;

  // Calculate points
  const points = ENGAGEMENT_TREND_DATA.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (ENGAGEMENT_TREND_DATA.length - 1);
    const y = height - paddingBottom - ((d.engagementRate - minVal) / (maxVal - minVal)) * (height - paddingTop - paddingBottom);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Smooth bezier curve
    const prev = points[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Engagement Trend
              </h3>
              <p className="text-xs text-slate-500">
                Student activity over the last 30 days
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Last 4 Weeks
          </span>
        </div>

        {/* Interactive SVG Line Chart */}
        <div className="mt-4 relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[70, 75, 80, 85, 90].map((val) => {
              const y = height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * (height - paddingTop - paddingBottom);
              return (
                <g key={val}>
                  <line 
                    x1={paddingX} 
                    y1={y} 
                    x2={width - paddingX} 
                    y2={y} 
                    stroke="#E2E8F0" 
                    strokeDasharray="4 4" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={paddingX - 10} 
                    y={y + 3} 
                    fontSize="10" 
                    fill="#94A3B8" 
                    textAnchor="end"
                    fontFamily="inherit"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* Gradient Area */}
            <path d={areaD} fill="url(#engagementGradient)" />

            {/* Curve Line */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="#059669" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Data Points */}
            {points.map((p, index) => {
              const isHovered = hoveredPoint === index;
              return (
                <g 
                  key={p.week}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                >
                  {/* Outer circle on hover */}
                  {isHovered && (
                    <circle cx={p.x} cy={p.y} r="9" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
                  )}
                  {/* Point */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r={isHovered ? "6" : "4.5"} 
                    fill="#FFFFFF" 
                    stroke={p.engagementRate < 80 ? '#EF4444' : '#10B981'} 
                    strokeWidth="2.5" 
                  />
                  {/* X-axis Label */}
                  <text 
                    x={p.x} 
                    y={height - 12} 
                    fontSize="11" 
                    fontWeight="600"
                    fill={isHovered ? '#0F172A' : '#64748B'} 
                    textAnchor="middle"
                    fontFamily="inherit"
                  >
                    {p.week}
                  </text>
                  {/* Score Label above point */}
                  <text 
                    x={p.x} 
                    y={p.y - 10} 
                    fontSize="11" 
                    fontWeight="700"
                    fill="#0F172A" 
                    textAnchor="middle"
                    fontFamily="inherit"
                  >
                    {p.engagementRate}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip display */}
          {hoveredPoint !== null && (
            <div className="absolute top-2 right-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg animate-in fade-in duration-100">
              <span className="font-bold">{points[hoveredPoint].week}</span>: {points[hoveredPoint].engagementRate}% ({points[hoveredPoint].activeCount} active learners)
            </div>
          )}
        </div>
      </div>

      {/* Insight Banner & CTA */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/50">
          <TrendingDown className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Overall engagement has decreased by <strong>9%</strong> over the last 30 days.</span>
        </div>
        <button
          onClick={() => onViewActivityDetails && onViewActivityDetails()}
          className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline text-xs shrink-0 self-end sm:self-auto"
        >
          <span>View activity details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
