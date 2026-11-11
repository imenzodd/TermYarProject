import React from 'react';
import {
  Activity,
  Award,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SemesterHealthScoreData } from '../types';

interface SemesterHealthScoreCardProps {
  healthData: SemesterHealthScoreData;
  lang?: 'en' | 'fa';
  onOpenAnalysisModal: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const SemesterHealthScoreCard: React.FC<SemesterHealthScoreCardProps> = ({
  healthData,
  lang = 'en',
  onOpenAnalysisModal,
  onNavigateTab,
}) => {
  const isFa = lang === 'fa';
  const { overallScore, status, statusLabel, statusLabelFa, indicators, recommendations, weeklyComparison, hasMissingData } = healthData;

  // Status-based color themes
  const getTheme = () => {
    switch (status) {
      case 'excellent':
        return {
          ring: 'stroke-emerald-400',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400',
          accent: 'text-emerald-400',
        };
      case 'good':
        return {
          ring: 'stroke-[#39A7FF]',
          badge: 'bg-[#39A7FF]/15 text-[#65D5FF] border-[#39A7FF]/30',
          dot: 'bg-[#39A7FF]',
          accent: 'text-[#39A7FF]',
        };
      case 'needs_attention':
        return {
          ring: 'stroke-amber-400',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
          accent: 'text-amber-400',
        };
      case 'at_risk':
      default:
        return {
          ring: 'stroke-rose-400',
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          dot: 'bg-rose-400',
          accent: 'text-rose-400',
        };
    }
  };

  const theme = getTheme();
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const topRecommendation = recommendations[0];

  return (
    <div className="glass-card p-5 transition-all glow-purple-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/[0.08] mb-4">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#663AF3]/20 border border-[#663AF3]/35 flex items-center justify-center text-[#C9BAFF] shrink-0">
            <Activity className="w-4 h-4 text-[#39A7FF]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-[#F1F3FA] flex items-center gap-1.5 flex-wrap">
              <span>{isFa ? 'امتیاز سلامت ترم' : 'Semester Health Score'}</span>
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                {isFa ? statusLabelFa : statusLabel}
              </span>
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#707B96] truncate">
              {isFa ? 'پایش هوشمند و وزنی تعادل تحصیلی' : 'Intelligent weighted academic momentum'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAnalysisModal}
          className="text-xs font-semibold text-[#C9BAFF] hover:text-white flex items-center gap-1 transition-colors px-2.5 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] shrink-0 self-end sm:self-auto"
        >
          <span>{isFa ? 'تحلیل جامع' : 'Full Analysis'}</span>
          <ChevronRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Score & 4 Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Circular Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[#11182A]"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`${theme.ring} transition-all duration-1000 ease-out`}
                style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#F1F3FA] tracking-tight">
                {overallScore}
              </span>
              <span className="text-[10px] font-medium text-[#707B96] uppercase tracking-wider">
                / 100
              </span>
            </div>
          </div>

          {/* Weekly trend badge */}
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#A6AEC3]">
            {weeklyComparison.trend === 'up' ? (
              <span className="inline-flex items-center text-emerald-400 font-semibold gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +{weeklyComparison.diff} {isFa ? 'نمره نسبت به هفته قبل' : 'pts vs last week'}
              </span>
            ) : weeklyComparison.trend === 'down' ? (
              <span className="inline-flex items-center text-rose-400 font-semibold gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {weeklyComparison.diff} {isFa ? 'نمره نسبت به هفته قبل' : 'pts vs last week'}
              </span>
            ) : (
              <span>{isFa ? 'ثابت نسبت به هفته قبل' : 'Stable vs last week'}</span>
            )}
          </div>
        </div>

        {/* Right: 4 Weighted Indicators */}
        <div className="md:col-span-8 space-y-2.5">
          {/* Indicator 1: Assignments (25%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#F1F3FA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#39A7FF] shadow-[0_0_4px_#39A7FF]"></span>
                <span>{isFa ? 'تکمیل تکالیف' : 'Assignments'}</span>
                <span className="text-[10px] text-[#707B96] font-normal">
                  ({Math.round(indicators.assignment.normalizedWeight * 100)}%)
                </span>
              </span>
              <span className="font-semibold text-[#F1F3FA] text-xs">
                {indicators.assignment.isAvailable ? `${indicators.assignment.score}%` : (isFa ? 'در انتظار داده' : 'No data')}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#11182A] rounded-full overflow-hidden border border-white/[0.04]">
              <div
                className={`h-full rounded-full ${indicators.assignment.score >= 75 ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF]' : 'bg-amber-400'} transition-all duration-700`}
                style={{ width: `${indicators.assignment.isAvailable ? indicators.assignment.score : 0}%` }}
              />
            </div>
          </div>

          {/* Indicator 2: Exam Readiness (30%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#F1F3FA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#663AF3] shadow-[0_0_4px_#663AF3]"></span>
                <span>{isFa ? 'آمادگی امتحانات' : 'Exam Readiness'}</span>
                <span className="text-[10px] text-[#707B96] font-normal">
                  ({Math.round(indicators.exam.normalizedWeight * 100)}%)
                </span>
              </span>
              <span className="font-semibold text-[#F1F3FA] text-xs">
                {indicators.exam.isAvailable ? `${indicators.exam.score}%` : (isFa ? 'در انتظار داده' : 'No data')}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#11182A] rounded-full overflow-hidden border border-white/[0.04]">
              <div
                className={`h-full rounded-full ${indicators.exam.score >= 70 ? 'bg-gradient-to-r from-[#663AF3] to-[#C9BAFF]' : 'bg-amber-400'} transition-all duration-700`}
                style={{ width: `${indicators.exam.isAvailable ? indicators.exam.score : 0}%` }}
              />
            </div>
          </div>

          {/* Indicator 3: Study Goal (20%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#F1F3FA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]"></span>
                <span>{isFa ? 'هدف هفتگی مطالعه' : 'Study Goal'}</span>
                <span className="text-[10px] text-[#707B96] font-normal">
                  ({Math.round(indicators.studyGoal.normalizedWeight * 100)}%)
                </span>
              </span>
              <span className="font-semibold text-[#F1F3FA] text-xs">
                {indicators.studyGoal.score}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#11182A] rounded-full overflow-hidden border border-white/[0.04]">
              <div
                className={`h-full rounded-full ${indicators.studyGoal.score >= 75 ? 'bg-emerald-400' : 'bg-amber-400'} transition-all duration-700`}
                style={{ width: `${indicators.studyGoal.score}%` }}
              />
            </div>
          </div>

          {/* Indicator 4: Course Progress (25%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#F1F3FA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_4px_#38bdf8]"></span>
                <span>{isFa ? 'پیشرفت سرفصل‌ها' : 'Course Progress'}</span>
                <span className="text-[10px] text-[#707B96] font-normal">
                  ({Math.round(indicators.courseProgress.normalizedWeight * 100)}%)
                </span>
              </span>
              <span className="font-semibold text-[#F1F3FA] text-xs">
                {indicators.courseProgress.isAvailable ? `${indicators.courseProgress.score}%` : (isFa ? 'در انتظار داده' : 'No data')}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#11182A] rounded-full overflow-hidden border border-white/[0.04]">
              <div
                className={`h-full rounded-full ${indicators.courseProgress.score >= 70 ? 'bg-sky-400' : 'bg-amber-400'} transition-all duration-700`}
                style={{ width: `${indicators.courseProgress.isAvailable ? indicators.courseProgress.score : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Missing data notice if applicable */}
      {hasMissingData && (
        <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-[11px] text-amber-300">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            {isFa
              ? 'برخی شاخص‌ها داده ثبت‌شده ندارند؛ اوزان باقی‌مانده به‌صورت نرمال محاسبه شده‌اند.'
              : 'Some indicators lack entries; weights are normalized proportionally across active metrics.'}
          </span>
        </div>
      )}

      {/* Quick Actionable Recommendation Banner */}
      {topRecommendation && (
        <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[#A6AEC3] truncate">
              {isFa ? topRecommendation.titleFa : topRecommendation.title}
            </span>
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              +{topRecommendation.impactPts} pts
            </span>
          </div>

          <button
            onClick={() => {
              if (topRecommendation.actionTab && onNavigateTab) {
                onNavigateTab(topRecommendation.actionTab);
              } else {
                onOpenAnalysisModal();
              }
            }}
            className="shrink-0 text-[11px] font-semibold text-[#C9BAFF] hover:text-white flex items-center gap-1 self-start sm:self-auto transition-colors"
          >
            <span>{isFa ? topRecommendation.actionLabelFa : topRecommendation.actionLabel}</span>
            <ArrowRight className={`w-3 h-3 ${isFa ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};
