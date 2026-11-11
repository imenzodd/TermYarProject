import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  FileSpreadsheet,
  Activity,
  Timer,
  ShoppingBag,
  BookOpen,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  LogIn,
  Layers,
  ChevronDown,
  Compass,
  Star,
  Check,
  Award,
  BarChart2,
  FileText
} from 'lucide-react';

interface LandingPageViewProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  onLaunchApp: () => void;
  onOpenDossier?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  lang,
  setLang,
  onLaunchApp,
  onOpenDossier,
}) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#080B16] text-[#F1F3FA] selection:bg-[#663AF3] selection:text-white font-sans antialiased relative overflow-x-hidden"
    >
      {/* Ambient Atmospheric Lighting Layers (Linear / Raycast aesthetic) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Violet Orb */}
        <div className="absolute -top-40 start-1/2 -translate-x-1/2 w-[720px] sm:w-[980px] h-[480px] sm:h-[600px] bg-gradient-to-b from-[#663AF3]/20 via-[#4F46E5]/10 to-transparent rounded-full blur-[140px]" />
        {/* Cyan Accent Flare */}
        <div className="absolute top-[35%] end-[-10%] w-[500px] h-[500px] bg-[#39A7FF]/10 rounded-full blur-[160px]" />
        {/* Bottom Ambient Glow */}
        <div className="absolute bottom-[-10%] start-[10%] w-[600px] h-[600px] bg-[#663AF3]/12 rounded-full blur-[180px]" />
        {/* Subtle Architectural Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* A. NAVIGATION BAR                                                        */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080B16]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-3'
            : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] flex items-center justify-center text-white shadow-lg shadow-[#663AF3]/40 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>TermYar</span>
                  <span className="text-[#65D5FF] text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#663AF3]/20 border border-[#663AF3]/30">
                    {isFa ? 'ترمیار' : 'Academic'}
                  </span>
                </span>
                <span className="text-[10px] text-[#A6AEC3] font-medium -mt-0.5 hidden sm:block">
                  {isFa ? 'دستیار هوشمند زیست‌بوم دانشجویی' : 'Intelligent Student Cockpit'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#A6AEC3] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              {isFa ? 'خانه' : 'Home'}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#A6AEC3] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              {isFa ? 'امکانات' : 'Features'}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#A6AEC3] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              {isFa ? 'نحوه کارکرد' : 'How It Works'}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#A6AEC3] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              {isFa ? 'درباره ترمیار' : 'About'}
            </button>
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="px-3 py-1 text-xs font-semibold text-[#C9BAFF] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-[#663AF3]/20 flex items-center gap-1.5"
                title={isFa ? 'مشاهده پرونده تحلیلی کسب‌وکار دانشگاهی' : 'Business Dossier'}
              >
                <FileText className="w-3.5 h-3.5 text-[#39A7FF]" />
                <span>{isFa ? 'پرونده تحلیلی' : 'Dossier'}</span>
              </button>
            )}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#11182A]/90 p-1 rounded-xl border border-white/[0.08] shadow-inner">
              <button
                onClick={() => setLang('fa')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isFa
                    ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white shadow-xs'
                    : 'text-[#A6AEC3] hover:text-white'
                }`}
                title="تغییر به زبان فارسی"
              >
                فارسی
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isFa
                    ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white shadow-xs'
                    : 'text-[#A6AEC3] hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Login / Launch App */}
            <button
              onClick={onLaunchApp}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#A6AEC3] hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#39A7FF]" />
              <span>{isFa ? 'ورود به سامانه' : 'Sign In'}</span>
            </button>

            {/* Primary Get Started Button */}
            <button
              onClick={onLaunchApp}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold btn-primary-futuristic shadow-lg shadow-[#663AF3]/35 flex items-center gap-2 cursor-pointer group"
            >
              <span>{isFa ? 'شروع کنید' : 'Get Started'}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 pt-28 sm:pt-36 space-y-24 sm:space-y-36 pb-24">
        {/* ========================================================================= */}
        {/* B. HERO SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-[#C9BAFF] backdrop-blur-xl shadow-inner animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-[#65D5FF] shadow-[0_0_8px_#65D5FF] animate-pulse" />
            <span>{isFa ? 'نسخه نوین پلتفرم ترم‌یار برای دانشجویان دانشگاه' : 'Next-Generation Academic Platform for Students'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#663AF3]/30 text-white font-black">
              {isFa ? '۱۴۰۴' : '2025'}
            </span>
          </div>

          {/* Core Headlines (Exact prompt requirement) */}
          <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] sm:leading-[1.18] text-white">
              {isFa ? (
                <>
                  <span>ترم جدید، با </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#65D5FF] via-[#39A7FF] to-[#C9BAFF]">
                    برنامه‌ای بهتر
                  </span>
                  <span> شروع می‌شود.</span>
                </>
              ) : (
                <>
                  <span>Make Every </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#65D5FF] via-[#39A7FF] to-[#C9BAFF]">
                    Semester Count.
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-lg text-[#A6AEC3] leading-relaxed max-w-2xl mx-auto font-normal">
              {isFa
                ? 'ترمیار، همراه هوشمند تو برای مدیریت بهتر امور دانشگاهی و تجربه‌ای منظم‌تر از زندگی دانشجویی.'
                : 'TermYar helps you organize your university life, stay on top of your academic journey, and make every semester more productive.'}
            </p>
          </div>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-black btn-primary-futuristic shadow-xl shadow-[#663AF3]/40 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
            >
              <span>{isFa ? 'شروع کنید' : 'Get Started'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-bold bg-[#11182A]/80 hover:bg-white/[0.08] text-[#F1F3FA] border border-white/[0.1] backdrop-blur-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#39A7FF]" />
              <span>{isFa ? 'آشنایی با امکانات' : 'Explore Features'}</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL CENTERPIECE PREVIEW (Actual TermYar Dashboard Mockup)              */}
          {/* ========================================================================= */}
          <div className="pt-8 sm:pt-12 relative max-w-5xl mx-auto">
            {/* Surrounding Ambient Neon Rim Light */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#663AF3]/20 via-[#39A7FF]/10 to-transparent rounded-3xl blur-2xl -z-10" />

            {/* Floating Top Pill Badges */}
            <div className="hidden lg:flex items-center justify-between absolute -top-4 inset-x-8 z-20 pointer-events-none">
              <div className="px-3 py-1.5 rounded-xl bg-[#0B1020]/90 backdrop-blur-xl border border-white/[0.12] shadow-xl flex items-center gap-2 text-xs font-bold text-[#F1F3FA] animate-bounce [animation-duration:4s]">
                <span className="text-base">🍅</span>
                <span>{isFa ? 'جلسه تمرکز فعال: ۲۵:۰۰' : 'Focus session: 25:00'}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#0B1020]/90 backdrop-blur-xl border border-white/[0.12] shadow-xl flex items-center gap-2 text-xs font-bold text-emerald-300 animate-bounce [animation-duration:5s]">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isFa ? 'شاخص سلامت ترم: ۱۰۰٪ الف' : 'Semester Health: 100%'}</span>
              </div>
            </div>

            {/* Dashboard Container Preview */}
            <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-[#0B1020]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(102,58,243,0.15)] relative overflow-hidden group">
              {/* Window Control Header Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-[#A6AEC3] font-mono">
                  termyar.app/cockpit
                </div>
                <div className="text-[10px] text-[#707B96] font-semibold">
                  Spring 2025
                </div>
              </div>

              {/* Mock Dashboard Grid Display */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 text-start">
                {/* 1. Pomodoro Focus Tile */}
                <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#120F2E] via-[#0E152F] to-[#080B16] border border-[#663AF3]/40 space-y-3 relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#C9BAFF] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39A7FF] animate-pulse" />
                      <span>{isFa ? 'تمرکز فعال امروز' : "Today's Focus"}</span>
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.08] text-[#F1F3FA]">
                      🍅 Pomodoro
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#F1F3FA] truncate">
                    {isFa ? 'حل سری تمرین ۵ - ساختمان داده' : 'Problem Set 5 - Data Structures'}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                      24:18
                    </div>
                    <span className="text-[10px] text-[#A6AEC3]">
                      {isFa ? 'جلسه ۱ از ۴' : 'Session 1 of 4'}
                    </span>
                  </div>
                  <div className="w-full bg-[#11182A] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#663AF3] to-[#39A7FF] h-full w-[70%] rounded-full" />
                  </div>
                </div>

                {/* 2. Semester Health Score Tile */}
                <div className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#11182A]/80 border border-white/[0.08] flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
                        100
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F1F3FA]">
                          {isFa ? 'شاخص جامع سلامت تحصیلی' : 'Academic Health Index'}
                        </div>
                        <div className="text-[10px] text-[#A6AEC3]">
                          {isFa ? 'پایش لحظه‌ای تعادل تکالیف و امتحانات' : 'Realtime coursework & exam balance'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {isFa ? 'وضعیت عالی' : 'Optimal'}
                    </span>
                  </div>

                  {/* 3 Metric Mini Progress Bars */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#A6AEC3] mb-1 font-medium">
                        <span>{isFa ? 'تکمیل تکالیف و پروژه‌ها' : 'Task Completion'}</span>
                        <span className="text-white font-mono">92%</span>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#663AF3] to-[#39A7FF] w-[92%] rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#A6AEC3] mb-1 font-medium">
                        <span>{isFa ? 'آمادگی امتحانات میان‌ترم' : 'Exam Readiness'}</span>
                        <span className="text-white font-mono">85%</span>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#39A7FF] to-emerald-400 w-[85%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Schedule Quick View Strip */}
                <div className="md:col-span-12 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#39A7FF]" />
                    <span className="text-xs font-bold text-[#F1F3FA]">
                      {isFa ? 'کلاس بعدی: فردا ۱۰:۳۰ — طراحی الگوریتم (کلاس ۱۰۲)' : 'Next class: Tomorrow 10:30 — Algorithms (Hall 102)'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#65D5FF] font-medium cursor-pointer hover:underline" onClick={onLaunchApp}>
                    {isFa ? 'مشاهده تقویم هفتگی ←' : 'View Full Schedule →'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* C. FEATURES SECTION                                                      */}
        {/* ========================================================================= */}
        <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#65D5FF] uppercase tracking-wider px-3 py-1 rounded-full bg-[#663AF3]/15 border border-[#663AF3]/30">
              {isFa ? 'امکانات کاربردی' : 'Core Capabilities'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isFa ? 'هر آنچه یک دانشجو برای درخشش نیاز دارد' : 'Everything an Academic Achiever Needs'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A6AEC3] leading-relaxed">
              {isFa
                ? 'دیگر نیازی به استفاده از چندین اپلیکیشن پراکنده نیست؛ ترم‌یار کل امور تحصیلی، تکالیف و تعاملات دانشجویی را یکپارچه می‌کند.'
                : 'No more juggling five disconnected apps. TermYar unites your schedule, deadlines, resources, and focus into one cohesive system.'}
            </p>
          </div>

          {/* 6 Real TermYar Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1: Golestan Schedule Extraction */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#663AF3]/30 to-[#39A7FF]/30 border border-[#663AF3]/40 text-[#65D5FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'استخراج هوشمند برنامه هفتگی' : 'Smart Schedule Extraction'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'آپلود مستقیم PDF انتخاب واحد سامانه گلستان یا عکس گزارش ۸۸ و تبدیل خودکار به تقویم هفتگی تعاملی، ساعات کلاس و نام اساتید.'
                  : 'Directly import course registration PDFs or university portal reports into an organized interactive weekly timetable.'}
              </p>
            </div>

            {/* Feature 2: Semester Health Score */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-[#39A7FF]/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'شاخص و پایش سلامت ترم' : 'Semester Health Score'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'الگوریتم وزنی اختصاصی که با ترکیب تحویل به موقع تمرین‌ها، ساعت مطالعه و آمادگی امتحانات، وضعیت پایداری ترم شما را می‌سنجد.'
                  : 'An intelligent weighted algorithm tracking assignments, exams, and daily focus to prevent end-of-semester burnout.'}
              </p>
            </div>

            {/* Feature 3: Tasks & Exam Calendar */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500/20 to-[#663AF3]/20 border border-rose-500/30 text-rose-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'مدیریت تکالیف و تقویم امتحانات' : 'Tasks & Exam Countdown'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'اولویت‌بندی تکالیف (فوری، متوسط، عادی)، شمارش معکوس ددلاین‌ها و تقویم امتحانات میان‌ترم و پایان‌ترم با سیستم یادآور.'
                  : 'Priority-based assignment matrix, upcoming deadline countdowns, and a clean chronological exam schedule.'}
              </p>
            </div>

            {/* Feature 4: Focus Pomodoro Timer */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-[#663AF3]/20 border border-amber-500/30 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Timer className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'تایمر تمرکز پومودورو' : 'Integrated Study Pomodoro'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'جلسات مطالعه عمیق ۲۵ دقیقه‌ای متصل به دروس دانشگاهی، ثبت زنجیره روزهای متوالی و آمار تفکیکی زمان مطالعه هر درس.'
                  : 'Course-linked study sessions, custom intervals, break alerts, and study streak analytics to boost daily productivity.'}
              </p>
            </div>

            {/* Feature 5: Campus Marketplace */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-[#39A7FF]/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'بازارچه خرید و فروش خوابگاه' : 'Campus & Dorm Marketplace'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'مبادله کتب درسی دست‌دوم، جزوات خلاصه، ماشین‌حساب مهندسی و لوازم خوابگاهی میان دانشجویان همان دانشگاه با تحویل حضوری.'
                  : 'Hyperlocal student marketplace for trading used textbooks, lecture notes, lab gear, and dorm appliances.'}
              </p>
            </div>

            {/* Feature 6: Digital Academic Vault */}
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-[#663AF3]/50 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/20 to-[#663AF3]/20 border border-purple-500/30 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? 'مخزن منابع درسی و جزوات' : 'Course Resource Library'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'آرشیو منسجم نمونه‌سوالات امتحانی، اسلایدهای اساتید و کتاب‌های الکترونیکی با دسته‌بندی بر اساس رشته و درس.'
                  : 'Centralized repository of professor slides, past exam papers, question banks, and academic PDFs accessible anytime.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* D. HOW IT WORKS SECTION                                                  */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#39A7FF] uppercase tracking-wider px-3 py-1 rounded-full bg-[#39A7FF]/15 border border-[#39A7FF]/30">
              {isFa ? 'ساده و سریع' : '3 Simple Steps'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isFa ? 'چگونه در ۳ گام ترم خود را متحول کنید؟' : 'How It Works'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A6AEC3]">
              {isFa
                ? 'از ثبت دروس تا رسیدن به رتبه ممتاز، تمام مسیر با سهولت طراحی شده است.'
                : 'Get started in under two minutes with zero technical hassle.'}
            </p>
          </div>

          {/* 3 Step Visual Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#0B1020]/80 border border-white/[0.08] relative space-y-4 hover:border-[#663AF3]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#663AF3]/20 border border-[#663AF3]/40 text-[#65D5FF] flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? '۱. ایجاد حساب و اتصال ترم' : '1. Create Your Account'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'اطلاعات رشته، دانشگاه و ترم تحصیلی خود را مشخص کنید تا محیط کاربری متناسب با نیازهای شما آماده شود.'
                  : 'Set up your profile, major, university, and current semester preferences in seconds.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#0B1020]/80 border border-white/[0.08] relative space-y-4 hover:border-[#39A7FF]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#39A7FF]/20 border border-[#39A7FF]/40 text-[#39A7FF] flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? '۲. استخراج برنامه و چینش دروس' : '2. Auto-Import Schedule'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'فایل انتخاب واحد گلستان را آپلود کنید تا تمام ساعات کلاس، تکالیف و فرجه‌های امتحانی هوشمندانه تنظیم شوند.'
                  : 'Upload your course PDF or portal screenshot to automatically generate your weekly classes and deadlines.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#0B1020]/80 border border-white/[0.08] relative space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">
                {isFa ? '۳. تجربه ترمی منظم و باکیفیت' : '3. Enjoy an Organized Term'}
              </h3>
              <p className="text-xs text-[#A6AEC3] leading-relaxed">
                {isFa
                  ? 'با زمان‌بندی دقیق پومودورو، پیشگیری از انباشت تکالیف و پایش نمره سلامت، با آرامش به بهترین معدل برسید.'
                  : 'Stay ahead of assignments, focus with the study timer, and achieve your academic goals stress-free.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATS & ACADEMIC VALUE SECTION                                           */}
        {/* ========================================================================= */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F162B] via-[#0B1020] to-[#080B16] border border-white/[0.1] relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x lg:rtl:divide-x-reverse divide-white/[0.06]">
              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-2xl sm:text-4xl font-black text-[#65D5FF] tracking-tight font-mono">
                  +۵۰۰
                </div>
                <div className="text-xs text-[#A6AEC3] font-medium">
                  {isFa ? 'دانشجوی فعال در فاز آزمایشی' : 'Active Pilot Students'}
                </div>
              </div>

              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-2xl sm:text-4xl font-black text-[#39A7FF] tracking-tight font-mono">
                  ۹۸٪
                </div>
                <div className="text-xs text-[#A6AEC3] font-medium">
                  {isFa ? 'صرفه‌جویی در برنامه‌ریزی هفتگی' : 'Time Saved on Scheduling'}
                </div>
              </div>

              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-2xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono">
                  ۱۰۰٪
                </div>
                <div className="text-xs text-[#A6AEC3] font-medium">
                  {isFa ? 'ذخیره‌سازی امن و محلی در مرورگر' : 'Offline-First Local Storage'}
                </div>
              </div>

              <div className="space-y-1 pt-4 lg:pt-0">
                <div className="text-2xl sm:text-4xl font-black text-[#C9BAFF] tracking-tight font-mono">
                  ۰
                </div>
                <div className="text-xs text-[#A6AEC3] font-medium">
                  {isFa ? 'تبلیغات مزاحم و اتلاف وقت' : 'Distractions or Clutter'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* E. FINAL CTA SECTION                                                     */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#11182A] via-[#0B1020] to-[#080B16] border border-[#663AF3]/35 shadow-[0_16px_50px_-10px_rgba(102,58,243,0.3)] space-y-6 relative overflow-hidden group">
            {/* Top illuminated glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#663AF3] to-transparent" />

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isFa ? 'آماده‌ای ترمت رو متفاوت شروع کنی؟' : 'Ready to Make Your Next Semester Better?'}
              </h2>
              <p className="text-xs sm:text-base text-[#A6AEC3] max-w-xl mx-auto leading-relaxed">
                {isFa
                  ? 'همین حالا وارد سامانه ترم‌یار شو و بدون نیاز به نصب هیچ ابزار اضافی، کنترل کامل دوران دانشجویی خودت رو به دست بگیر.'
                  : 'Launch TermYar right in your browser now. No downloads, zero friction, instant productivity.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-black btn-primary-futuristic shadow-xl shadow-[#663AF3]/40 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span>{isFa ? 'ورود مستقیم به سامانه ترم‌یار' : 'Launch TermYar Cockpit'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              {onOpenDossier && (
                <button
                  onClick={onOpenDossier}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-bold bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 border border-white/[0.08] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#39A7FF]" />
                  <span>{isFa ? 'مطالعه پرونده تحلیلی کسب‌وکار' : 'Read Business Dossier'}</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* F. FOOTER                                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] bg-[#070A14] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Logo & Description */}
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] flex items-center justify-center text-white font-black text-sm">
                  T
                </div>
                <span className="text-base font-black text-white">TermYar • ترم‌یار</span>
              </div>
              <p className="text-xs text-[#707B96] leading-relaxed">
                {isFa
                  ? 'سامانه یکپارچه مدیریت زیست‌بوم تحصیلی، برنامه‌ریزی هوشمند هفتگی و اقتصاد خرد دانشجویی دانشگاه.'
                  : 'The intelligent operating system for higher education students. Plan, focus, trade, and excel.'}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#A6AEC3]">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">
                {isFa ? 'صفحه اصلی' : 'Home'}
              </button>
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">
                {isFa ? 'امکانات' : 'Features'}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                {isFa ? 'نحوه کارکرد' : 'How It Works'}
              </button>
              <button onClick={onLaunchApp} className="hover:text-[#65D5FF] font-bold transition-colors cursor-pointer">
                {isFa ? 'ورود به سامانه' : 'Launch App'}
              </button>
              {onOpenDossier && (
                <button onClick={onOpenDossier} className="hover:text-[#C9BAFF] transition-colors cursor-pointer">
                  {isFa ? 'پرونده تحلیلی' : 'Academic Dossier'}
                </button>
              )}
            </div>
          </div>

          {/* Bottom Bar: Copyright & Tag */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start text-[11px] text-[#707B96]">
            <div>
              {isFa
                ? '© ۱۴۰۴ ترم‌یار. تمامی حقوق محفوظ است • طراحی شده با معماری مدرن وب'
                : '© 2025 TermYar. All rights reserved • Designed for academic excellence'}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{isFa ? 'سیستم فعال و آنلاین' : 'Systems Operational'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
