import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Brain,
  Clock,
  BookOpen
} from 'lucide-react';

export const InteractiveSemesterHealthSimulator: React.FC = () => {
  // 3 Interactive Sliders
  const [taskRate, setTaskRate] = useState<number>(85); // 0 to 100%
  const [studyHours, setStudyHours] = useState<number>(18); // 0 to 35 hours
  const [daysToExam, setDaysToExam] = useState<number>(14); // 1 to 30 days

  // Calculate dynamic health score
  // Formula weights:
  // Task completion: 45%
  // Study hours (capped at 25h/week for 100%): 35%
  // Exam preparedness buffer (days to exam / 14): 20%
  const taskComponent = (taskRate / 100) * 45;
  const studyComponent = (Math.min(studyHours, 25) / 25) * 35;
  const examComponent = daysToExam >= 14 ? 20 : (daysToExam / 14) * 20;
  
  const rawScore = Math.round(taskComponent + studyComponent + examComponent);
  const healthScore = Math.min(100, Math.max(10, rawScore));

  // Determine state & color
  let statusText = 'وضعیت ایده‌آل و تعادل تحصیلی بالا';
  let statusColor = 'text-emerald-400';
  let strokeColor = '#10B981';
  let badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  let diagnosis = 'روند تحصیلی شما بسیار مستحکم است. هماهنگی بالای تحویل تکالیف با ساعات مطالعه پیوسته، ریسک غافلگیری شب امتحان را به صفر رسانده است.';
  let recommendation = 'همین ریتم را حفظ کنید. توصیه ترمیار: ۳۰ دقیقه زمان استراحت روزانه را به مرور یادداشت‌های خلاصه هفته قبل اختصاص دهید.';

  if (healthScore < 50) {
    statusText = 'بحران انباشتگی و ریسک مشروطی / افت معدل';
    statusColor = 'text-rose-400';
    strokeColor = '#F43F5E';
    badgeBg = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    diagnosis = 'هشدار جدی: عدم تحویل تکالیف به‌همراه ساعات مطالعه ناچیز، شما را در معرض افت شدید نمره میان‌ترم قرار داده است.';
    recommendation = 'اقدام فوری: با فعال‌سازی جلسات ۲۵ دقیقه‌ای پومودورو ترمیار، عقب‌افتادگی ۲ تکلیف اصلی را تا ۴۸ ساعت آینده جبران کنید.';
  } else if (healthScore < 75) {
    statusText = 'نیازمند مراقبت و افزایش نظم مطالعاتی';
    statusColor = 'text-amber-400';
    strokeColor = '#F59E0B';
    badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    diagnosis = 'وضعیت متزلزل است؛ تکالیف تا حدی پیگیری شده‌اند اما کمبود ساعات تمرکز هفتگی ممکن است در ایام فرجه امتحانات به شما فشار مضاعف وارد کند.';
    recommendation = 'برنامه پیشنهادی: ساعات مطالعه هفتگی را از طریق تایمر ترمیار به حداقل ۱۵ ساعت برسانید و تکالیف باقیمانده را اولویت‌بندی کنید.';
  }

  // Presets
  const applyPreset = (preset: 'top' | 'cram' | 'danger' | 'start') => {
    if (preset === 'top') {
      setTaskRate(95);
      setStudyHours(26);
      setDaysToExam(22);
    } else if (preset === 'cram') {
      setTaskRate(50);
      setStudyHours(6);
      setDaysToExam(3);
    } else if (preset === 'danger') {
      setTaskRate(20);
      setStudyHours(2);
      setDaysToExam(5);
    } else if (preset === 'start') {
      setTaskRate(80);
      setStudyHours(15);
      setDaysToExam(28);
    }
  };

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B101E] via-[#0E162B] to-[#0A0E1A] border border-indigo-500/30 shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              شبیه‌ساز تعاملی شاخص سلامت ترم (Semester Health Simulator)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            با جابجایی اسلایدرها، شبیه‌سازی هوشمند الگوریتم ترمیار در سنجش وضعیت تحصیلی دانشجو را تجربه کنید.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400">سناریوهای آماده:</span>
          <button
            type="button"
            onClick={() => applyPreset('top')}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
          >
            دانشجوی الف
          </button>
          <button
            type="button"
            onClick={() => applyPreset('cram')}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
          >
            شب امتحانی
          </button>
          <button
            type="button"
            onClick={() => applyPreset('danger')}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all"
          >
            خطر مشروطی
          </button>
          <button
            type="button"
            onClick={() => applyPreset('start')}
            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25 transition-all"
          >
            شروع ترم
          </button>
        </div>
      </div>

      {/* Main Grid: Sliders Left + Gauge Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 3 Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Assignment Completion */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                درصد انجام و تحویل به‌موقع تکالیف و پروژه‌ها:
              </span>
              <span className="font-mono font-bold text-indigo-300 text-sm">
                {taskRate}٪
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={taskRate}
              onChange={(e) => setTaskRate(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۰٪ (عقب‌افتادگی کامل)</span>
              <span>۵۰٪ (متوسط)</span>
              <span>۱۰۰٪ (همه تکالیف تحویل شده)</span>
            </div>
          </div>

          {/* Slider 2: Weekly Pomodoro Study Hours */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                ساعات مطالعه عمیق پومودورو در هفته:
              </span>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {studyHours} ساعت / هفته
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={35}
              step={1}
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۰ ساعت (انفعال)</span>
              <span>۱۵ ساعت (حالت نرمال)</span>
              <span>۳۵ ساعت (ایام امتحانات سنگین)</span>
            </div>
          </div>

          {/* Slider 3: Days to Next Exam */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                فاصله زمانی تا اولین امتحان سنگین:
              </span>
              <span className="font-mono font-bold text-purple-300 text-sm">
                {daysToExam} روز دیگر
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={daysToExam}
              onChange={(e) => setDaysToExam(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۱ روز (فردا امتحان است!)</span>
              <span>۱۴ روز (فرجه مناسب)</span>
              <span>۳۰ روز (اوایل ترم)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Radial Gauge & Calculated Score (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden">
          {/* Subtle Glow matching score color */}
          <div
            className="absolute inset-0 opacity-15 blur-2xl pointer-events-none transition-all duration-700"
            style={{ backgroundColor: strokeColor }}
          />

          {/* SVG Radial Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1E293B"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {healthScore}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                از ۱۰۰ امتیاز
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-3">
            <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${badgeBg}`}>
              {statusText}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed px-2">
            {diagnosis}
          </p>
        </div>
      </div>

      {/* AI Academic Advisor Box */}
      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
          <Brain className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>توصیه موتور تحلیل هوشمند ترم‌یار:</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-normal">
              تحلیل زنده شاخص
            </span>
          </div>
          <p className="text-xs text-indigo-200/90 leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};
