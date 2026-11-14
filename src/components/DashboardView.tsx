import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Plus,
  Flame,
  BarChart2,
  ShoppingBag,
  Timer,
  GraduationCap,
  ArrowRight,
  Scan,
  Layers,
  Check,
  FileCheck,
  CheckCircle2,
  Target,
} from 'lucide-react';
import {
  Course,
  MarketItem,
  NeedRequest,
  SemesterHealthScoreData,
  StudyLog,
  Task,
  UserProfile,
} from '../types';
import { SemesterHealthScoreCard } from './SemesterHealthScoreCard';

interface DashboardViewProps {
  user: UserProfile;
  tasks: Task[];
  courses: Course[];
  marketItems: MarketItem[];
  needRequests: NeedRequest[];
  studyLogs?: StudyLog[];
  lang?: 'en' | 'fa';
  healthData?: SemesterHealthScoreData;
  onOpenHealthModal?: () => void;
  onToggleTask: (taskId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenNewTaskModal: () => void;
  onOpenNewMarketModal?: () => void;
  onOpenProfileModal?: () => void;
  onOpenGolestanModal?: () => void;
  onAddStudyLog?: (log: StudyLog) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  tasks,
  courses,
  marketItems,
  needRequests,
  studyLogs = [],
  lang = 'en',
  healthData,
  onOpenHealthModal,
  onToggleTask,
  onNavigateTab,
  onOpenNewTaskModal,
  onOpenGolestanModal,
  onAddStudyLog,
}) => {
  const isFa = lang === 'fa';
  const displayName = user.name ? user.name.trim().split(' ')[0] : isFa ? 'دوست عزیز' : 'Student';

  // Interactive Pomodoro Timer state
  const FOCUS_DURATION = 25 * 60;
  const [timerSeconds, setTimerSeconds] = useState(FOCUS_DURATION);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Derived real academic statistics
  const pendingTasks = useMemo(() => tasks.filter((t) => !t.done), [tasks]);
  const completedTasksCount = tasks.length - pendingTasks.length;
  const upcomingExams = useMemo(
    () => pendingTasks.filter((t) => t.type === 'exam'),
    [pendingTasks]
  );

  const totalUnits = useMemo(
    () => courses.reduce((sum, c) => sum + (c.units || c.credits || 0), 0),
    [courses]
  );

  const averageGrade = useMemo(() => {
    const graded = courses.filter((c) => typeof c.currentGrade === 'number');
    if (graded.length === 0) return null;
    const totalWeighted = graded.reduce(
      (sum, c) => sum + (c.currentGrade || 0) * (c.units || c.credits || 1),
      0
    );
    const weightSum = graded.reduce((sum, c) => sum + (c.units || c.credits || 1), 0);
    return weightSum > 0 ? (totalWeighted / weightSum).toFixed(2) : null;
  }, [courses]);

  const averageCourseProgress = useMemo(() => {
    if (courses.length === 0) return 0;
    return Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length);
  }, [courses]);

  // Select top priority pending task/exam for Primary Focus Area
  const primaryFocusTask = useMemo(() => {
    if (pendingTasks.length === 0) return null;
    const priorityRank = (p?: string) => (p === 'high' ? 0 : p === 'medium' ? 1 : 2);
    return [...pendingTasks].sort((a, b) => {
      const pDiff = priorityRank(a.priority) - priorityRank(b.priority);
      if (pDiff !== 0) return pDiff;
      const aToday = a.relativeDue === 'امروز' || a.relativeDue?.toLowerCase() === 'today' ? 0 : 1;
      const bToday = b.relativeDue === 'امروز' || b.relativeDue?.toLowerCase() === 'today' ? 0 : 1;
      if (aToday !== bToday) return aToday - bToday;
      return a.date.localeCompare(b.date);
    })[0];
  }, [pendingTasks]);

  // Sorted tasks list (pending urgent first, completed at bottom)
  const prioritizedTasks = useMemo(() => {
    const priorityRank = (p?: string) => (p === 'high' ? 0 : p === 'medium' ? 1 : 2);
    return [...tasks]
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return priorityRank(a.priority) - priorityRank(b.priority);
      })
      .slice(0, 5);
  }, [tasks]);

  // Timer countdown + real StudyLog persistence on completion
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          setSessionsCompleted((c) => (c < 4 ? c + 1 : 1));
          if (onAddStudyLog) {
            onAddStudyLog({
              id: `log-${Date.now()}`,
              courseName: primaryFocusTask?.courseName || (isFa ? 'مطالعه متمرکز' : 'Focus Session'),
              durationMinutes: 25,
              timestamp: Date.now(),
              date: new Date().toISOString(),
            });
          }
          return FOCUS_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, onAddStudyLog, primaryFocusTask, isFa]);

  const toggleTimer = () => setTimerRunning((prev) => !prev);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(FOCUS_DURATION);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timerProgressPercent = Math.round(((FOCUS_DURATION - timerSeconds) / FOCUS_DURATION) * 100);

  // Weekly study activity derived strictly from real studyLogs
  const weeklyActivity = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayNamesFa = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];
    const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const buckets = Array.from({ length: 7 }, (_, idx) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - idx));
      const key = d.toISOString().slice(0, 10);
      const mins = studyLogs
        .filter((l) => l.date.slice(0, 10) === key)
        .reduce((acc, l) => acc + l.durationMinutes, 0);
      return {
        key,
        label: isFa ? dayNamesFa[d.getDay()] : dayNamesEn[d.getDay()],
        mins,
      };
    });

    const maxMins = Math.max(25, ...buckets.map((b) => b.mins));
    const totalMins = buckets.reduce((sum, b) => sum + b.mins, 0);

    // Consecutive active days ending today or yesterday
    let streak = 0;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].mins > 0) {
        streak += 1;
      } else if (i < buckets.length - 1) {
        break;
      }
    }

    return { buckets, maxMins, totalMins, streak };
  }, [studyLogs, isFa]);

  const formatDuration = (mins: number) => {
    if (mins === 0) return isFa ? '۰ دقیقه' : '0m';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return isFa ? `${m} دقیقه` : `${m}m`;
    if (m === 0) return isFa ? `${h} ساعت` : `${h}h`;
    return isFa ? `${h} ساعت و ${m} دقیقه` : `${h}h ${m}m`;
  };

  const getPriorityMeta = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          label: isFa ? 'فوری' : 'High',
          dot: 'bg-rose-500',
          text: 'text-rose-600 dark:text-rose-400',
        };
      case 'medium':
        return {
          label: isFa ? 'متوسط' : 'Medium',
          dot: 'bg-amber-500',
          text: 'text-amber-600 dark:text-amber-400',
        };
      default:
        return {
          label: isFa ? 'عادی' : 'Normal',
          dot: 'bg-emerald-500',
          text: 'text-emerald-600 dark:text-emerald-400',
        };
    }
  };

  const quickActions = [
    {
      id: 'new-task',
      label: isFa ? 'افزودن تکلیف' : 'Add Task',
      icon: FileCheck,
      accent: 'text-[#663AF3] dark:text-[#C9BAFF]',
      onClick: onOpenNewTaskModal,
    },
    {
      id: 'courses',
      label: isFa ? 'دروس من' : 'Courses',
      icon: BookOpen,
      accent: 'text-[#0284C7] dark:text-[#39A7FF]',
      onClick: () => onNavigateTab('courses'),
    },
    {
      id: 'exams',
      label: isFa ? 'امتحانات' : 'Exams',
      icon: Calendar,
      accent: 'text-amber-600 dark:text-amber-400',
      onClick: () => onNavigateTab('exams'),
    },
    ...(onOpenGolestanModal
      ? [
          {
            id: 'golestan',
            label: isFa ? 'دریافت از گلستان' : 'Import Schedule',
            icon: Scan,
            accent: 'text-emerald-600 dark:text-emerald-400',
            onClick: onOpenGolestanModal,
          },
        ]
      : []),
    {
      id: 'timer',
      label: isFa ? 'تایمر کامل' : 'Full Timer',
      icon: Timer,
      accent: 'text-indigo-600 dark:text-indigo-400',
      onClick: () => onNavigateTab('timer'),
    },
    {
      id: 'resources',
      label: isFa ? 'بانک جزوات' : 'Vault',
      icon: Layers,
      accent: 'text-sky-600 dark:text-[#65D5FF]',
      onClick: () => onNavigateTab('resources'),
    },
    {
      id: 'marketplace',
      label: isFa ? 'بازارچه خوابگاه' : 'Marketplace',
      icon: ShoppingBag,
      accent: 'text-rose-600 dark:text-rose-400',
      onClick: () => onNavigateTab('marketplace'),
    },
  ];

  return (
    <div className="space-y-6 pb-8 text-slate-900 dark:text-[#F1F3FA]">
      {/* 1. Welcome Header & Compact Real Indicators */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#F1F3FA] tracking-tight flex items-center gap-2">
            <span className="truncate">
              {isFa ? `صبح بخیر، ${displayName}` : `Good morning, ${displayName}`}
            </span>
            <span className="text-xl shrink-0" aria-hidden="true">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A6AEC3] mt-1">
            {isFa
              ? 'خلاصه وضعیت امروز، اولویت‌های نزدیک و پیشرفت ترم جاری'
              : 'Today’s priorities, upcoming deadlines, and semester progress'}
          </p>
        </div>

        {/* Compact Single-Row Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => onNavigateTab('tasks')}
            className="px-3.5 py-2.5 bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.16] rounded-xl text-start transition-colors cursor-pointer"
          >
            <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
              {isFa ? 'تکالیف باز' : 'Open Tasks'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] mt-0.5 tabular-nums">
              {pendingTasks.length} {isFa ? 'مورد' : ''}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('exams')}
            className="px-3.5 py-2.5 bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.16] rounded-xl text-start transition-colors cursor-pointer"
          >
            <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
              {isFa ? 'امتحانات پیش‌رو' : 'Upcoming Exams'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] mt-0.5 tabular-nums">
              {upcomingExams.length} {isFa ? 'آزمون' : ''}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('courses')}
            className="px-3.5 py-2.5 bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.16] rounded-xl text-start transition-colors cursor-pointer"
          >
            <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
              {isFa ? 'دروس و واحد' : 'Courses & Units'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] mt-0.5 tabular-nums">
              {courses.length} {isFa ? `درس (${totalUnits} واحد)` : `(${totalUnits}u)`}
            </div>
          </button>

          <button
            type="button"
            onClick={() => (onOpenHealthModal ? onOpenHealthModal() : onNavigateTab('courses'))}
            className="px-3.5 py-2.5 bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.16] rounded-xl text-start transition-colors cursor-pointer"
          >
            <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
              {averageGrade !== null
                ? isFa ? 'میانگین فعلی دروس' : 'Current Avg'
                : isFa ? 'پیشرفت سرفصل' : 'Syllabus Avg'}
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] mt-0.5 tabular-nums">
              {averageGrade !== null ? averageGrade : `${averageCourseProgress}%`}
            </div>
          </button>
        </div>
      </section>

      {/* 2. Primary Focus Area + Semester Health */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Primary Focus Card */}
        <div className="xl:col-span-7 bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xs dark:shadow-none flex flex-col justify-between transition-colors">
          {/* Focus Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#663AF3]/10 dark:bg-[#663AF3]/20 text-[#663AF3] dark:text-[#C9BAFF] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#663AF3] dark:text-[#C9BAFF]">
                {isFa ? 'اولویت اصلی امروز' : "Today's Primary Focus"}
              </span>
            </div>

            {primaryFocusTask && (
              <div className="text-[11px] font-medium text-slate-500 dark:text-[#A6AEC3] flex items-center gap-2">
                <span>{primaryFocusTask.courseName || (isFa ? 'درس عمومی' : 'Course')}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {primaryFocusTask.relativeDue || primaryFocusTask.date}
                  {primaryFocusTask.time ? ` · ${primaryFocusTask.time}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Focus Subject or Clean Empty State */}
          {primaryFocusTask ? (
            <div className="py-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-[#F1F3FA] leading-snug">
                    {primaryFocusTask.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-[#A6AEC3]">
                    <span className={`font-semibold ${getPriorityMeta(primaryFocusTask.priority).text}`}>
                      {getPriorityMeta(primaryFocusTask.priority).label}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {primaryFocusTask.type === 'exam'
                        ? isFa ? 'آزمون پیش‌رو' : 'Upcoming Exam'
                        : primaryFocusTask.type === 'study'
                        ? isFa ? 'برنامه مطالعه' : 'Study Session'
                        : isFa ? 'تکلیف درسی' : 'Assignment'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleTask(primaryFocusTask.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 dark:bg-white/[0.05] dark:hover:bg-emerald-500/15 text-slate-700 hover:text-emerald-700 dark:text-[#E2E8F0] dark:hover:text-emerald-300 border border-slate-200 dark:border-white/[0.08] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isFa ? 'تکمیل شد' : 'Mark Done'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-[#F1F3FA]">
                    {isFa ? 'همه کارهای فوری امروز انجام شده‌اند' : 'No urgent pending tasks right now'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#A6AEC3] mt-0.5">
                    {isFa
                      ? 'می‌توانید یک تکلیف جدید ثبت کنید یا یک جلسه تمرکز پومودورو برای مرور دروس شروع کنید.'
                      : 'Add a new assignment or start an open Pomodoro focus session for review.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenNewTaskModal}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#663AF3] hover:bg-[#572EE0] text-white transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isFa ? 'افزودن تکلیف' : 'Add Task'}</span>
              </button>
            </div>
          )}

          {/* Integrated Compact Pomodoro Focus Bar */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.07] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-slate-900 dark:text-white tracking-tight">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="text-xs text-slate-500 dark:text-[#A6AEC3]">
                  <div className="font-semibold text-slate-700 dark:text-[#E2E8F0]">
                    {isFa ? 'تایمر پومودورو ۲۵ دقیقه‌ای' : '25m Pomodoro Focus'}
                  </div>
                  <div className="text-[11px] tabular-nums">
                    {isFa
                      ? `${sessionsCompleted} جلسه تکمیل‌شده در این نشست`
                      : `${sessionsCompleted} session${sessionsCompleted === 1 ? '' : 's'} completed`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetTimer}
                  className="h-9 px-2.5 rounded-xl text-xs font-medium text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors flex items-center gap-1 cursor-pointer"
                  title={isFa ? 'بازنشانی تایمر' : 'Reset timer'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isFa ? 'ریست' : 'Reset'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTimer}
                  className="h-9 px-4 rounded-xl text-xs font-bold bg-[#663AF3] hover:bg-[#572EE0] text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>{isFa ? 'توقف' : 'Pause'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isFa ? 'شروع تمرکز' : 'Start Focus'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Subtle Linear Timer Progress */}
            <div className="w-full h-1 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#663AF3] dark:bg-[#39A7FF] transition-all duration-300"
                style={{ width: `${timerProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Semester Health Card */}
        <div className="xl:col-span-5">
          {healthData ? (
            <SemesterHealthScoreCard
              healthData={healthData}
              lang={lang}
              onOpenAnalysisModal={() => {
                if (onOpenHealthModal) onOpenHealthModal();
              }}
              onNavigateTab={onNavigateTab}
            />
          ) : (
            <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 flex items-center justify-center min-h-[240px]">
              <span className="text-sm text-slate-500 dark:text-[#A6AEC3]">
                {isFa ? 'داده‌های سلامت در حال پردازش...' : 'Loading health metrics...'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Compact Quick Actions Strip */}
      <section aria-label={isFa ? 'دسترسی سریع' : 'Quick actions'}>
        <div className="flex flex-wrap items-center gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className="h-9 px-3.5 rounded-xl bg-white dark:bg-[#0D1324] hover:bg-slate-50 dark:hover:bg-[#131C35] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18] text-xs font-semibold text-slate-700 dark:text-[#E2E8F0] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${action.accent}`} />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Core Lists (Tasks & Courses) + Calm Study Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Primary Content Column: Tasks + Courses */}
        <div className="lg:col-span-7 space-y-5">
          {/* Tasks & Assignments List */}
          <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs dark:shadow-none">
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
              <div className="flex items-center gap-2 min-w-0">
                <FileCheck className="w-4 h-4 text-[#663AF3] dark:text-[#C9BAFF] shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
                  {isFa ? 'تکالیف و تمرین‌ها' : 'Tasks & Assignments'}
                </h3>
                <span className="text-[11px] text-slate-400 dark:text-[#707B96] tabular-nums shrink-0">
                  ({completedTasksCount}/{tasks.length})
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onOpenNewTaskModal}
                  className="text-xs font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:bg-slate-100 dark:hover:bg-white/[0.06] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'جدید' : 'New'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('tasks')}
                  className="text-xs font-medium text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isFa ? 'مشاهده همه' : 'View all'}
                </button>
              </div>
            </div>

            {prioritizedTasks.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {prioritizedTasks.map((task) => {
                  const pMeta = getPriorityMeta(task.priority || 'medium');
                  return (
                    <div
                      key={task.id}
                      className={`py-3 flex items-center justify-between gap-3 transition-opacity ${
                        task.done ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => onToggleTask(task.id)}
                          aria-label={task.done ? (isFa ? 'علامت به عنوان انجام‌نشده' : 'Mark incomplete') : (isFa ? 'علامت به عنوان انجام‌شده' : 'Mark complete')}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                            task.done
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-300 dark:border-white/[0.22] hover:border-[#663AF3] bg-white dark:bg-transparent'
                          }`}
                        >
                          {task.done && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </button>

                        <div className="min-w-0">
                          <div
                            className={`text-xs sm:text-[13px] font-semibold truncate ${
                              task.done
                                ? 'line-through text-slate-400 dark:text-[#707B96]'
                                : 'text-slate-900 dark:text-[#F1F3FA]'
                            }`}
                          >
                            {task.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-[#707B96] mt-0.5 flex items-center gap-1.5 truncate">
                            <span className="truncate">
                              {task.courseName || (isFa ? 'درس عمومی' : 'General')}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums shrink-0">
                              {task.relativeDue || task.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-semibold">
                        <span className={`w-1.5 h-1.5 rounded-full ${pMeta.dot}`} />
                        <span className={pMeta.text}>{pMeta.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-[#A6AEC3]">
                  {isFa ? 'هنوز تکلیفی ثبت نشده است.' : 'No tasks added yet.'}
                </p>
                <button
                  type="button"
                  onClick={onOpenNewTaskModal}
                  className="text-xs font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:underline cursor-pointer"
                >
                  {isFa ? '+ افزودن اولین تکلیف' : '+ Add your first task'}
                </button>
              </div>
            )}
          </div>

          {/* Enrolled Courses Compact List */}
          <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs dark:shadow-none">
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-[#0284C7] dark:text-[#39A7FF] shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
                  {isFa ? 'دروس انتخابی ترم' : 'Enrolled Courses'}
                </h3>
                <span className="text-[11px] text-slate-400 dark:text-[#707B96] tabular-nums shrink-0">
                  ({courses.length})
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('courses')}
                className="text-xs font-medium text-[#663AF3] dark:text-[#C9BAFF] hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'مدیریت دروس' : 'Manage courses'}
              </button>
            </div>

            {courses.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {courses.slice(0, 5).map((course) => {
                  const nextSlot = course.schedule?.[0];
                  return (
                    <div
                      key={course.id}
                      onClick={() => onNavigateTab('courses')}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-white shrink-0"
                          style={{ backgroundColor: course.color || '#663AF3' }}
                        >
                          {course.code ? course.code.slice(0, 4) : 'CRS'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-[#F1F3FA] truncate">
                            {course.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-[#707B96] mt-0.5 flex items-center gap-1.5 truncate">
                            <span className="truncate">
                              {course.professor || (isFa ? 'استاد مربوطه' : 'Instructor')}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums shrink-0">
                              {course.units || course.credits || 3} {isFa ? 'واحد' : 'u'}
                            </span>
                            {nextSlot && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="tabular-nums shrink-0">
                                  {nextSlot.dayName} {nextSlot.startTime}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Subtle Inline Course Progress */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="hidden sm:block w-16 h-1.5 bg-slate-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${course.progress || 0}%`,
                              backgroundColor: course.color || '#663AF3',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-[#E2E8F0] tabular-nums w-8 text-end">
                          {course.progress || 0}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-[#A6AEC3]">
                  {isFa ? 'هنوز درسی اضافه نشده است.' : 'No courses added yet.'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('courses')}
                    className="text-xs font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:underline cursor-pointer"
                  >
                    {isFa ? '+ افزودن درس' : '+ Add Course'}
                  </button>
                  {onOpenGolestanModal && (
                    <button
                      type="button"
                      onClick={onOpenGolestanModal}
                      className="text-xs font-semibold text-[#0284C7] dark:text-[#39A7FF] hover:underline cursor-pointer"
                    >
                      {isFa ? 'دریافت از گلستان' : 'Import from Portal'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Insights Column: Weekly Study Activity & Streak + Campus Overview */}
        <div className="lg:col-span-5 space-y-5">
          {/* Compact Weekly Study Activity + Inline Streak */}
          <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs dark:shadow-none">
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
              <div className="flex items-center gap-2 min-w-0">
                <BarChart2 className="w-4 h-4 text-[#0284C7] dark:text-[#39A7FF] shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
                  {isFa ? 'فعالیت مطالعه هفته' : 'Weekly Study Activity'}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 shrink-0 tabular-nums">
                <Flame className="w-3.5 h-3.5" />
                <span>
                  {weeklyActivity.streak} {isFa ? 'روز پیاپی' : 'day streak'}
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="flex items-baseline justify-between gap-2 mb-4">
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-[#F1F3FA] tabular-nums">
                    {formatDuration(weeklyActivity.totalMins)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#707B96] mt-0.5">
                    {weeklyActivity.totalMins > 0
                      ? isFa ? 'مجموع زمان ثبت‌شده ۷ روز اخیر' : 'Total logged focus in the last 7 days'
                      : isFa ? 'هنوز جلسه‌ای در این هفته ثبت نشده است' : 'No study sessions logged this week yet'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateTab('timer')}
                  className="text-xs font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>{isFa ? 'آمار کامل' : 'Timer'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>

              {/* Clean Compact 7-Day Bar Chart */}
              <div className="grid grid-cols-7 gap-2 items-end h-20 pt-2">
                {weeklyActivity.buckets.map((bar) => {
                  const pct =
                    bar.mins > 0 ? Math.max(18, Math.round((bar.mins / weeklyActivity.maxMins) * 100)) : 8;
                  return (
                    <div
                      key={bar.key}
                      className="flex flex-col items-center gap-1.5 h-full justify-end"
                      title={`${bar.label}: ${formatDuration(bar.mins)}`}
                    >
                      <div
                        className={`w-full max-w-[26px] rounded-t-md transition-all duration-300 ${
                          bar.mins > 0
                            ? 'bg-[#663AF3] dark:bg-[#39A7FF]'
                            : 'bg-slate-100 dark:bg-white/[0.06]'
                        }`}
                        style={{ height: `${pct}%` }}
                      />
                      <span className="text-[10px] font-medium text-slate-400 dark:text-[#707B96]">
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Compact Syllabus & Campus Overview */}
          <div className="bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs dark:shadow-none space-y-4">
            {/* Compact Term Syllabus Progress */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#663AF3] dark:text-[#C9BAFF]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F3FA]">
                    {isFa ? 'پیشرفت کلی دروس' : 'Term Course Progress'}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-[#F1F3FA] tabular-nums">
                  {averageCourseProgress}%
                </span>
              </div>

              <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#663AF3] dark:bg-[#8E73FF] rounded-full transition-all duration-500"
                  style={{ width: `${averageCourseProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-[#707B96]">
                <span className="tabular-nums">
                  {isFa
                    ? `${courses.length} درس فعال · ${totalUnits} واحد`
                    : `${courses.length} courses · ${totalUnits} units`}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateTab('schedule')}
                  className="font-semibold text-[#663AF3] dark:text-[#C9BAFF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isFa ? 'برنامه هفتگی' : 'Schedule'}</span>
                  <ArrowRight className={`w-3 h-3 ${isFa ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Subtle Campus Exchange Links (Market & Peer Requests) */}
            <div className="pt-3.5 border-t border-slate-100 dark:border-white/[0.07] flex items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => onNavigateTab('marketplace')}
                className="flex items-center gap-2 text-slate-600 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-slate-400 dark:text-[#707B96]" />
                <span className="tabular-nums">
                  {isFa ? `${marketItems.length} آگهی خوابگاه` : `${marketItems.length} Market items`}
                </span>
              </button>

              <span className="text-slate-300 dark:text-white/[0.12]" aria-hidden="true">|</span>

              <button
                type="button"
                onClick={() => onNavigateTab('need_requests')}
                className="flex items-center gap-2 text-slate-600 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-[#707B96]" />
                <span className="tabular-nums">
                  {isFa ? `${needRequests.length} درخواست فعال` : `${needRequests.length} Peer needs`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
