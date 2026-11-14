import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle, Flame, Coffee, Sparkles } from 'lucide-react';
import { Course, StudyLog } from '../types';
import { toPersianDigits, getTodayJalaliString } from '../utils/persian';
import { BackButton } from './BackButton';

interface FocusTimerViewProps {
  courses: Course[];
  studyLogs: StudyLog[];
  onAddStudyLog: (log: StudyLog) => void;
  lang?: 'en' | 'fa';
  onBack?: () => void;
}

export const FocusTimerView: React.FC<FocusTimerViewProps> = ({
  courses,
  studyLogs,
  onAddStudyLog,
  lang = 'fa',
  onBack,
}) => {
  const isFa = lang === 'fa';
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.name || (isFa ? 'مطالعه آزاد' : 'Free Study'));
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState(false);

  const totalStudyMinutes = studyLogs.reduce((acc, log) => acc + log.durationMinutes, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Completed timer!
      setIsRunning(false);
      if (mode === 'focus') {
        const newLog: StudyLog = {
          id: `log_${Date.now()}`,
          durationMinutes: 25,
          courseName: selectedCourse,
          timestamp: Date.now(),
          date: getTodayJalaliString(),
        };
        onAddStudyLog(newLog);
        setSessionCompletedNotice(true);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, selectedCourse, onAddStudyLog]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (newMode: 'focus' | 'break' = mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Back Navigation Bar */}
      {onBack && (
        <div className="flex items-center justify-start pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <BackButton
            onBack={onBack}
            previousPageName={isFa ? 'داشبورد' : 'Dashboard'}
            lang={lang}
          />
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#663AF3]/20 border border-[#663AF3]/40 text-[#C9BAFF] glow-purple-sm">
          <Flame className="w-4 h-4 text-[#39A7FF]" />
          <span>تکنیک پومودورو (مطالعه عمیق تحصیلی)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F1F3FA]">
          اتاق تمرکز و مطالعه دانشجویی
        </h1>
        <p className="text-xs text-[#A6AEC3] font-medium max-w-md mx-auto">
          ۲۵ دقیقه تمرکز کامل روی تمرینات، سپس ۵ دقیقه استراحت کوتاه.
        </p>
      </div>

      {sessionCompletedNotice && (
        <div className="p-4 rounded-2xl glass-card bg-[#663AF3]/15 border border-[#663AF3]/40 text-[#F1F3FA] flex items-center justify-between glow-purple-sm">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle className="w-5 h-5 text-[#39A7FF]" />
            <span>آفرین! ۲۵ دقیقه مطالعه با موفقیت ثبت شد. وقت ۵ دقیقه استراحت است.</span>
          </div>
          <button
            onClick={() => setSessionCompletedNotice(false)}
            className="text-xs text-[#C9BAFF] hover:text-white font-bold"
          >
            بستن
          </button>
        </div>
      )}

      {/* Timer Circular Card */}
      <div className="p-6 sm:p-12 rounded-3xl glass-panel bg-[#0B1020]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl text-center space-y-6 sm:space-y-8 relative overflow-hidden glow-purple-sm">
        {/* Ambient background orbs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#663AF3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#39A7FF]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Mode Selector */}
        <div className="inline-flex flex-wrap justify-center items-center gap-1.5 p-1 bg-[#11182A]/90 border border-white/[0.08] rounded-2xl max-w-full relative z-10">
          <button
            onClick={() => resetTimer('focus')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'focus'
                ? 'nav-pill-active text-white'
                : 'text-[#A6AEC3] hover:text-[#F1F3FA]'
            }`}
          >
            جلسه مطالعه (۲۵ دقیقه)
          </button>
          <button
            onClick={() => resetTimer('break')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'break'
                ? 'nav-pill-active text-white'
                : 'text-[#A6AEC3] hover:text-[#F1F3FA]'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>استراحت کوتاه (۵ دقیقه)</span>
          </button>
        </div>

        {/* Big Display Clock */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center relative z-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="110"
              className="text-slate-200 dark:text-[#11182A]"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r="110"
              className={mode === 'focus' ? 'text-[#663AF3]' : 'text-[#39A7FF]'}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 0.5s ease',
                filter: mode === 'focus' ? 'drop-shadow(0 0 10px #663AF3)' : 'drop-shadow(0 0 10px #39A7FF)',
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black text-[#F1F3FA] tracking-wider tabular-nums font-mono drop-shadow-[0_0_15px_rgba(102,58,243,0.5)]">
              {toPersianDigits(timeFormatted)}
            </span>
            <span className="text-xs text-[#A6AEC3] font-semibold mt-2 px-2 text-center line-clamp-1">
              {mode === 'focus' ? `درس: ${selectedCourse}` : 'زمان استراحت ذهن ☕'}
            </span>
          </div>
        </div>

        {/* Course Select Dropdown */}
        {mode === 'focus' && (
          <div className="max-w-xs mx-auto relative z-10">
            <label className="block text-xs font-bold text-[#A6AEC3] mb-1 text-center">
              انتخاب درس جهت ثبت در گزارش:
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-xs font-semibold text-[#F1F3FA] outline-none cursor-pointer focus:border-[#663AF3]"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.name} className="bg-white dark:bg-[#0B1020] text-slate-900 dark:text-white">
                  {c.name}
                </option>
              ))}
              <option value="مطالعه آزاد" className="bg-white dark:bg-[#0B1020] text-slate-900 dark:text-white">مطالعه آزاد / زبان خارجه</option>
            </select>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 relative z-10">
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? 'bg-slate-100 dark:bg-[#11182A] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#151D33] border border-slate-300 dark:border-white/[0.1]'
                : 'btn-primary-futuristic text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>توقف موقت</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current rtl:-scale-x-100" />
                <span>شروع مطالعه</span>
              </>
            )}
          </button>

          <button
            onClick={() => resetTimer()}
            className="p-3 rounded-xl bg-[#11182A] text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.08] transition-colors cursor-pointer border border-white/[0.08]"
            title="ریست تایمر"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Study Session History */}
      <div className="glass-card rounded-3xl border border-white/[0.08] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h2 className="font-bold text-sm text-[#F1F3FA] flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#39A7FF]" />
            <span>گزارش جلسات مطالعه اخیر</span>
          </h2>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            مجموعاً: {toPersianDigits(totalStudyMinutes)} دقیقه
          </span>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {studyLogs.length === 0 ? (
            <p className="text-xs text-[#707B96] py-4 text-center">
              هنوز جلسه‌ای به پایان نرسیده است. با تکمیل اولین تایمر، زمان مطالعه شما اینجا ثبت می‌شود.
            </p>
          ) : (
            studyLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#F1F3FA] block">
                    {log.courseName}
                  </span>
                  <span className="text-[11px] text-[#707B96] tabular-nums">
                    تاریخ: {toPersianDigits(log.date)}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold tabular-nums">
                  +{toPersianDigits(log.durationMinutes)} دقیقه تمرکز
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
