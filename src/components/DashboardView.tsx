import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Plus,
  Flame,
  Award,
  BarChart2,
  ShoppingBag,
  Timer,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Scan,
  Activity,
  Layers,
  Check,
  TrendingUp,
  MapPin,
  FileCheck,
  FileText,
  AlertCircle,
  ExternalLink,
  Code2,
  Calculator,
  Atom,
  Feather,
  LineChart
} from 'lucide-react';
import { Course, MarketItem, NeedRequest, SemesterHealthScoreData, Task, UserProfile } from '../types';
import { SemesterHealthScoreCard } from './SemesterHealthScoreCard';

interface DashboardViewProps {
  user: UserProfile;
  tasks: Task[];
  courses: Course[];
  marketItems: MarketItem[];
  needRequests: NeedRequest[];
  lang?: 'en' | 'fa';
  healthData?: SemesterHealthScoreData;
  onOpenHealthModal?: () => void;
  onToggleTask: (taskId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenNewTaskModal: () => void;
  onOpenNewMarketModal: () => void;
  onOpenProfileModal: () => void;
  onOpenGolestanModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  tasks,
  courses,
  marketItems,
  needRequests,
  lang = 'en',
  healthData,
  onOpenHealthModal,
  onToggleTask,
  onNavigateTab,
  onOpenNewTaskModal,
  onOpenNewMarketModal,
  onOpenProfileModal,
  onOpenGolestanModal,
}) => {
  const isFa = lang === 'fa';
  const displayName = user.name ? user.name.split(' ')[0] : 'Alex';

  // Interactive Pomodoro Timer state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setSessionsCompleted((prev) => (prev < 4 ? prev + 1 : 1));
      setTimerSeconds(25 * 60);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
            {isFa ? 'فوری' : 'High'}
          </span>
        );
      case 'medium':
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            {isFa ? 'متوسط' : 'Medium'}
          </span>
        );
      case 'low':
      default:
        return (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
            {isFa ? 'عادی' : 'Normal'}
          </span>
        );
    }
  };

  // Streak heatmap dots (5 rows of 7 days)
  const streakDays = [
    true, true, true, true, false, false, true,
    true, true, true, true, true, true, true,
    true, true, true, true, true, true, true,
    true, true, true, true, true, false, false,
    true, true, true, false, false, false, false,
  ];

  return (
    <div className="space-y-6 pb-12 text-[#F1F3FA]">
      {/* 1. Header Greeting & Semester Stats Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F1F3FA] tracking-tight flex items-center gap-2">
            <span className="truncate">{isFa ? `صبح بخیر، ${displayName}` : `Good morning, ${displayName}`}</span>
            <span className="text-xl sm:text-2xl shrink-0">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A6AEC3] mt-0.5">
            {isFa ? 'داشبورد هوشمند تحصیلی شما در یک نگاه' : 'Your futuristic semester cockpit at a glance'}
          </p>
        </div>

        {/* Top Stat Pills Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full lg:w-auto">
          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 glass-card rounded-xl text-xs font-semibold text-[#F1F3FA]">
            <Calendar className="w-3.5 h-3.5 text-[#39A7FF] shrink-0" />
            <span className="truncate">{isFa ? 'هفته ۷ از ۱۵' : 'Week 7 of 15'}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 glass-card rounded-xl text-xs font-semibold text-[#F1F3FA]">
            <FileCheck className="w-3.5 h-3.5 text-[#C9BAFF] shrink-0" />
            <span className="truncate">{isFa ? '۳ تحویل امروز' : '3 due today'}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 glass-card rounded-xl text-xs font-semibold text-[#F1F3FA]">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{isFa ? '۲ امتحان نزدیک' : '2 exams soon'}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 glass-card rounded-xl text-xs font-semibold text-[#F1F3FA]">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{isFa ? 'معدل ۱۸.۶۰' : 'GPA 3.72'}</span>
          </div>
        </div>
      </div>

      {/* 2. Row 1: The Three Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5">
        {/* Card 1: Today's Focus (Pomodoro Hero — Light/Dark Adaptive) */}
        <div className="md:col-span-1 xl:col-span-5 bg-gradient-to-br from-white via-[#F6F5FF] to-[#EFF6FF] dark:from-[#120F2E] dark:via-[#0E152F] dark:to-[#080B16] text-slate-900 dark:text-white rounded-2xl p-6 shadow-md dark:shadow-2xl border border-indigo-200 dark:border-[#663AF3]/35 flex flex-col justify-between relative overflow-hidden glow-purple-sm">
          {/* Subtle decorative glows */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#663AF3]/10 dark:bg-[#663AF3]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#39A7FF]/10 dark:bg-[#39A7FF]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-[#C9BAFF]">
              <span className="w-2 h-2 rounded-full bg-[#39A7FF] shadow-[0_0_8px_#39A7FF] animate-pulse" />
              <span>{isFa ? 'تمرکز فعال امروز' : "Today's focus"}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-white/[0.08] backdrop-blur-md rounded-full text-[11px] font-semibold text-slate-800 dark:text-[#F1F3FA] border border-indigo-200 dark:border-white/[0.1]">
              <span>🍅</span>
              <span>Pomodoro</span>
            </div>
          </div>

          {/* Focus Subject */}
          <div className="mb-4 relative z-10">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F3FA] tracking-tight">
              {isFa ? 'حل سری تمرین ۵ - ساختمان داده' : 'Finish problem set 5 - CS201'}
            </h3>
          </div>

          {/* Big Digital Timer Display */}
          <div className="flex items-center justify-between my-2 relative z-10">
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums font-mono text-indigo-950 dark:text-white dark:drop-shadow-[0_0_20px_rgba(102,58,243,0.4)]">
                {formatTimer(timerSeconds)}
              </div>
              <div className="text-xs text-slate-500 dark:text-[#A6AEC3] mt-1 font-medium">
                {isFa ? 'جلسه تمرکز فعال' : 'Focus session'}
              </div>
            </div>

            {/* Circular Glowing Play/Pause Button */}
            <button
              onClick={toggleTimer}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] text-white flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(102,58,243,0.35)] dark:shadow-[0_0_20px_rgba(102,58,243,0.5)] hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              aria-label={timerRunning ? 'Pause timer' : 'Start timer'}
            >
              {timerRunning ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ms-0.5" />
              )}
            </button>
          </div>

          {/* Footer of Card 1: Session dots + Reset Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-[#A6AEC3] font-medium">
                {isFa ? `جلسه ${sessionsCompleted} از ۴` : `Session ${sessionsCompleted} of 4`}
              </span>
              <div className="flex gap-1.5 ms-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i <= sessionsCompleted
                        ? 'bg-[#39A7FF] shadow-[0_0_6px_#39A7FF]'
                        : 'bg-slate-200 dark:bg-white/[0.15]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={resetTimer}
              className="text-xs text-slate-500 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFa ? 'ریست' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Academic Health & Semester Progress */}
        <div className="md:col-span-1 xl:col-span-7">
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
            <div className="glass-card p-6 flex items-center justify-center min-h-[260px]">
              <span className="text-sm text-[#A6AEC3]">{isFa ? 'داده‌های سلامت در حال پردازش...' : 'Loading health metrics...'}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Row 2: The 4 Grid Cards as shown in the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5">
        {/* Card 1: Quick Actions (عملیات سریع) */}
        <div className="xl:col-span-3 glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">⚡</span>
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'عملیات سریع' : 'Quick Actions'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigateTab('courses')}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 text-[#39A7FF] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'افزودن درس' : 'Add Course'}
              </span>
            </button>

            <button
              onClick={onOpenNewTaskModal}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <FileCheck className="w-4 h-4 text-[#C9BAFF] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'افزودن تکلیف' : 'Add Task'}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('exams')}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'افزودن امتحان' : 'Add Exam'}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('timer')}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <Timer className="w-4 h-4 text-[#20C997] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'شروع تایمر' : 'Start Timer'}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('resources')}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <Layers className="w-4 h-4 text-[#65D5FF] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'منابع و جزوات' : 'Vault'}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('marketplace')}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#663AF3]/40 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#F1F3FA]">
                {isFa ? 'بازارچه خوابگاه' : 'Marketplace'}
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Semester Progress (پیشرفت ترم) */}
        <div className="xl:col-span-3 glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#C9BAFF]" />
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'پیشرفت ترم' : 'Term Progress'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('schedule')}
              className="text-[#707B96] hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {/* Circular progress ring */}
          <div className="flex flex-col items-center justify-center my-3">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-white/[0.08]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[#663AF3] transition-all duration-1000"
                  style={{ filter: 'drop-shadow(0 0 8px #663AF3)' }}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - 0.47)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">47%</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs">
            <div className="font-bold text-[#F1F3FA]">
              {isFa ? '۷ هفته باقیمانده' : '7 Weeks Remaining'}
            </div>
            <div className="text-[11px] text-[#707B96] mt-0.5">
              {isFa ? 'از مجموع ۱۵ هفته آموزشی' : 'out of 15 academic weeks'}
            </div>
          </div>
        </div>

        {/* Card 3: Study Streak (زنجیره مطالعه) */}
        <div className="xl:col-span-3 glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 dark:text-amber-400">⏱</span>
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'زنجیره مطالعه' : 'Study Streak'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('timer')}
              className="text-[#707B96] hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="text-center my-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isFa ? '۱۴ روز' : '14 Days'}
            </div>
            <div className="text-[11px] text-[#A6AEC3] mt-0.5">
              {isFa ? 'زنجیره روزهای متوالی مطالعه' : 'Continuous days of focused study'}
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="my-2">
            <div className="grid grid-cols-7 gap-1.5 justify-center">
              {streakDays.map((active, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm transition-all ${
                    active
                      ? 'bg-[#39A7FF] shadow-[0_0_6px_rgba(57,167,255,0.6)]'
                      : 'bg-slate-200 dark:bg-white/[0.06]'
                  }`}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-[#707B96] mt-2 px-1">
              <span>Sun</span>
              <span>Fri</span>
              <span>Wed</span>
              <span>Mon</span>
            </div>
          </div>
        </div>

        {/* Card 4: Weekly Study Activity (فعالیت مطالعه هفتگی) */}
        <div className="xl:col-span-3 glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#0284C7] dark:text-[#39A7FF]" />
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'فعالیت مطالعه هفتگی' : 'Weekly Activity'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#707B96] mb-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#663AF3]" />
              {isFa ? 'زمان مطالعه' : 'Study'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/[0.2]" />
              {isFa ? 'باقیمانده' : 'Remaining'}
            </span>
          </div>

          <div className="text-center my-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              14h 20m
            </div>
            <div className="text-[11px] text-[#A6AEC3] mt-0.5">
              {isFa ? 'مجموع زمان مطالعه این هفته' : 'Total study time this week'}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="pt-2">
            <div className="grid grid-cols-7 gap-1.5 items-end h-16">
              {[
                { label: 'Sun', h: 70 },
                { label: 'Sat', h: 90 },
                { label: 'Fri', h: 40 },
                { label: 'Thu', h: 55 },
                { label: 'Wed', h: 80 },
                { label: 'Tue', h: 60 },
                { label: 'Mon', h: 95 },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-[#663AF3] to-[#39A7FF] shadow-[0_0_8px_rgba(102,58,243,0.4)]"
                    style={{ height: `${bar.h}%` }}
                  />
                  <span className="text-[9px] text-[#707B96]">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Row 3: Enrolled Courses & Tasks & Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Enrolled Courses */}
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#39A7FF]" />
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'دروس انتخابی ترم' : 'Enrolled Courses'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs font-semibold text-[#65D5FF] hover:underline cursor-pointer"
            >
              {isFa ? 'مشاهده همه دروس' : 'View all'}
            </button>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-md"
                    style={{ backgroundColor: course.color || '#663AF3' }}
                  >
                    {course.code ? course.code.slice(0, 3) : 'CRS'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-[#F1F3FA] truncate">
                      {course.name}
                    </div>
                    <div className="text-[11px] text-[#A6AEC3] mt-0.5 flex items-center gap-2 truncate">
                      <span>{course.professor || (isFa ? 'استاد مربوطه' : 'Instructor')}</span>
                      <span>•</span>
                      <span>{course.units || 3} {isFa ? 'واحد' : 'Units'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#65D5FF]">
                    {course.schedule?.[0]?.startTime || '۱۰:۰۰'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks & Assignments */}
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#C9BAFF]" />
              <h3 className="text-sm font-bold text-[#F1F3FA]">
                {isFa ? 'تکالیف و تمرین‌های جاری' : 'Tasks & Homework'}
              </h3>
            </div>
            <button
              onClick={onOpenNewTaskModal}
              className="text-xs font-bold text-[#65D5FF] hover:bg-white/[0.06] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isFa ? 'افزودن تکلیف' : 'Add Task'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                      task.done
                        ? 'bg-[#20C997] border-[#20C997] text-white'
                        : 'border-white/[0.2] bg-white/[0.04] hover:border-[#663AF3]'
                    }`}
                  >
                    {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <div className="min-w-0">
                    <div className={`text-xs sm:text-sm font-bold truncate ${task.done ? 'line-through text-[#707B96]' : 'text-[#F1F3FA]'}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-[#A6AEC3] mt-0.5 flex items-center gap-2 truncate">
                      <span>{task.courseName || (isFa ? 'درس عمومی' : 'Course')}</span>
                      <span>•</span>
                      <span>{task.relativeDue || task.date || (isFa ? 'فردا' : 'Tomorrow')}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {getPriorityBadge(task.priority || 'medium')}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] mt-4 flex items-center justify-between text-xs">
            <span className="text-[#A6AEC3]">
              {isFa ? `${tasks.filter((t) => t.done).length} از ${tasks.length} تکمیل شده` : `${tasks.filter((t) => t.done).length} of ${tasks.length} completed`}
            </span>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-[#65D5FF] font-bold hover:underline cursor-pointer"
            >
              {isFa ? 'مشاهده همه تکالیف' : 'View all tasks'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
