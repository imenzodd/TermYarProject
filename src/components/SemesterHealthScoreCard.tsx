import React from 'react';
import {
  Activity,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ArrowRight,
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
  const {
    overallScore,
    status,
    statusLabel,
    statusLabelFa,
    indicators,
    recommendations,
    weeklyComparison,
    hasMissingData,
  } = healthData;

  const getTheme = () => {
    switch (status) {
      case 'excellent':
        return {
          ring: 'stroke-emerald-500 dark:stroke-emerald-400',
          statusText: 'text-emerald-700 dark:text-emerald-300',
          statusBg: 'bg-emerald-50 dark:bg-emerald-500/12 border-emerald-200 dark:border-emerald-500/25',
        };
      case 'good':
        return {
          ring: 'stroke-[#0284C7] dark:stroke-[#39A7FF]',
          statusText: 'text-[#0284C7] dark:text-[#65D5FF]',
          statusBg: 'bg-sky-50 dark:bg-[#39A7FF]/12 border-sky-200 dark:border-[#39A7FF]/25',
        };
      case 'needs_attention':
        return {
          ring: 'stroke-amber-500 dark:stroke-amber-400',
          statusText: 'text-amber-700 dark:text-amber-300',
          statusBg: 'bg-amber-50 dark:bg-amber-500/12 border-amber-200 dark:border-amber-500/25',
        };
      case 'at_risk':
      default:
        return {
          ring: 'stroke-rose-500 dark:stroke-rose-400',
          statusText: 'text-rose-700 dark:text-rose-300',
          statusBg: 'bg-rose-50 dark:bg-rose-500/12 border-rose-200 dark:border-rose-500/25',
        };
    }
  };

  const theme = getTheme();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const topRecommendation = recommendations[0];

  const metricRows = [
    {
      key: 'assignment',
      label: isFa ? 'تکمیل تکالیف' : 'Assignments',
      weight: Math.round(indicators.assignment.normalizedWeight * 100),
      score: indicators.assignment.score,
      isAvailable: indicators.assignment.isAvailable,
      barColor: indicators.assignment.score >= 75 ? 'bg-[#39A7FF]' : 'bg-amber-400',
    },
    {
      key: 'exam',
      label: isFa ? 'آمادگی امتحانات' : 'Exam Readiness',
      weight: Math.round(indicators.exam.normalizedWeight * 100),
      score: indicators.exam.score,
      isAvailable: indicators.exam.isAvailable,
      barColor: indicators.exam.score >= 70 ? 'bg-[#663AF3]' : 'bg-amber-400',
    },
    {
      key: 'studyGoal',
      label: isFa ? 'هدف مطالعه هفتگی' : 'Study Goal',
      weight: Math.round(indicators.studyGoal.normalizedWeight * 100),
      score: indicators.studyGoal.score,
      isAvailable: true,
      barColor: indicators.studyGoal.score >= 75 ? 'bg-emerald-500' : 'bg-amber-400',
    },
    {
      key: 'courseProgress',
      label: isFa ? 'پیشرفت سرفصل‌ها' : 'Syllabus Progress',
      weight: Math.round(indicators.courseProgress.normalizedWeight * 100),
      score: indicators.courseProgress.score,
      isAvailable: indicators.courseProgress.isAvailable,
      barColor: indicators.courseProgress.score >= 70 ? 'bg-sky-500' : 'bg-amber-400',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs dark:shadow-none h-full flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-[#663AF3] dark:text-[#C9BAFF] flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
              {isFa ? 'سلامت تحصیلی ترم' : 'Semester Health'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
              {isFa ? statusLabelFa : statusLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAnalysisModal}
          className="text-xs font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:text-[#4F46E5] dark:hover:text-white flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] shrink-0 cursor-pointer whitespace-nowrap"
        >
          <span>{isFa ? 'تحلیل کامل' : 'Details'}</span>
          <ChevronRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Gauge + 4 Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center py-4">
        {/* Compact Circular Score */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 88 88">
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="stroke-slate-100 dark:stroke-white/[0.08]"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                className={`${theme.ring} transition-all duration-700 ease-out`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 dark:text-[#F1F3FA] tabular-nums tracking-tight">
                {overallScore}
              </span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-[#707B96] tabular-nums">
                / 100
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 dark:text-[#A6AEC3] tabular-nums">
            {weeklyComparison.trend === 'up' ? (
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +{weeklyComparison.diff} {isFa ? 'هفته قبل' : 'vs last wk'}
              </span>
            ) : weeklyComparison.trend === 'down' ? (
              <span className="inline-flex items-center text-rose-600 dark:text-rose-400 font-semibold gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
                {weeklyComparison.diff} {isFa ? 'هفته قبل' : 'vs last wk'}
              </span>
            ) : (
              <span>{isFa ? 'ثابت نسبت به هفته قبل' : 'Steady pace'}</span>
            )}
          </div>
        </div>

        {/* Clean Progress Indicators */}
        <div className="sm:col-span-8 space-y-2.5">
          {metricRows.map((row) => (
            <div key={row.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-[#E2E8F0] truncate">
                  {row.label}
                  <span className="text-[10px] text-slate-400 dark:text-[#707B96] ms-1.5 tabular-nums">
                    ({row.weight}%)
                  </span>
                </span>
                <span className="font-semibold text-slate-900 dark:text-[#F1F3FA] text-xs tabular-nums shrink-0">
                  {row.isAvailable ? `${row.score}%` : isFa ? 'بدون داده' : 'N/A'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${row.barColor} transition-all duration-700`}
                  style={{ width: `${row.isAvailable ? row.score : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing data hint or Top Recommendation */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/[0.07] space-y-2">
        {hasMissingData && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {isFa
                ? 'برخی شاخص‌ها داده ندارند؛ وزن‌دهی به‌صورت نرمال انجام شد.'
                : 'Some metrics lack entries; weights normalized automatically.'}
            </span>
          </div>
        )}

        {topRecommendation && (
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-600 dark:text-[#A6AEC3] truncate">
              {isFa ? topRecommendation.titleFa : topRecommendation.title}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold ms-2 tabular-nums">
                +{topRecommendation.impactPts}
              </span>
            </span>

            <button
              type="button"
              onClick={() => {
                if (topRecommendation.actionTab && onNavigateTab) {
                  onNavigateTab(topRecommendation.actionTab);
                } else {
                  onOpenAnalysisModal();
                }
              }}
              className="shrink-0 text-[11px] font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>{isFa ? topRecommendation.actionLabelFa : topRecommendation.actionLabel}</span>
              <ArrowRight className={`w-3 h-3 ${isFa ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
