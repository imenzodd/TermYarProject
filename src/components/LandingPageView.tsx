import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  BarChart2,
  FileText,
  Clock,
  Flame,
  Search,
  Eye,
  Scan,
  TrendingUp,
  GraduationCap,
  PartyPopper,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Tv,
  Users,
  Compass,
  MessageSquare,
  Smile,
  Layers
} from 'lucide-react';

import editorialHeroImg from '../assets/images/editorial_hero_students_1794491159239.jpg';
import editorialCircleImg from '../assets/images/editorial_circle_students_1794491183680.jpg';
import studentGraduatingImg from '../assets/images/students_graduating_1794490645224.jpg';

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

  // Active slide in the "How It Works" carousel (0 to 3)
  const [activeSlide, setActiveSlide] = useState(0);

  // Active channel in the Retro TV showcase (1 to 4)
  const [activeChannel, setActiveChannel] = useState(1);

  // Confetti overlay trigger
  const [confettiActive, setConfettiActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Section references for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Confetti Particle System
  const triggerConfetti = () => {
    setConfettiActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#F6D35F', '#5CA8F2', '#82A77B', '#8E82E0', '#FF6B6B', '#20C997', '#FFA07A'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      life: number;
    }> = [];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 400,
        y: canvas.height * 0.4 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.life -= 0.01;

        if (p.life > 0 && p.y < canvas.height + 20) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setConfettiActive(false);
      }
    };

    render();
  };

  // How It Works Slides Data
  const slides = [
    {
      step: '01 - شروع بدون زحمت',
      stepEn: '01 - START EFFORTLESSLY',
      titleFa: 'استخراج برنامه کلاسی از گلستان با یک لمس',
      titleEn: 'Sync Your Schedule from Golestan in Seconds',
      descFa: 'تصویر یا فایل PDF کارنامه و انتخاب واحد خود را آپلود کنید. هوش مصنوعی ترم‌یار تمامی ساعات، تالارها، اساتید و تاریخ امتحانات را فوراً در تقویم شما می‌چیند.',
      descEn: 'Upload your university portal schedule. TermYar OCR instantly extracts class halls, professors, times, and finals countdown.',
      tagFa: 'سیستم هوشمند OCR',
      tagEn: 'Smart OCR Engine',
      badgeColor: 'bg-[#5CA8F2]',
      previewType: 'schedule',
    },
    {
      step: '02 - پایش مداوم معدل',
      stepEn: '02 - GPA WELLNESS',
      titleFa: 'شاخص سلامت ترم: آگاهی قبل از بحران',
      titleEn: 'Semester Health Score: Insight Before Crises',
      descFa: 'فرمول اختصاصی وزن‌دار آموزشی بر پایه وضعیت تمرین‌ها، ساعت مطالعه هفتگی و فرجه‌های امتحانات، عددی از ۰ تا ۱۰۰ محاسبه کرده و از افت تحصیلی پیشگیری می‌کند.',
      descEn: 'A weighted 0-100 diagnostic score synthesizing assignment completion, study logs, and prep readiness to keep your GPA safe.',
      tagFa: 'الگوریتم پایش معدل',
      tagEn: 'Health Score Algorithm',
      badgeColor: 'bg-[#82A77B]',
      previewType: 'health',
    },
    {
      step: '03 - تمرکز و انگیزه روزانه',
      stepEn: '03 - DAILY MOMENTUM',
      titleFa: 'تایمر پومودورو متصل به دروس و زنجیره مطالعه',
      titleEn: 'Pomodoro Focus Cycles & Habit Streaks',
      descFa: 'در محیطی آرامش‌بخش درس بخوانید؛ هر دقیقه مطالعه در درس مربوطه ثبت شده و زنجیره مطالعه متوالی به شما انگیزه استمرار در طول ترم می‌دهد.',
      descEn: 'Distraction-free 25-minute focus cycles tied directly to your courses, tracking unbroken daily streaks with course logs.',
      tagFa: 'عادت‌سازی پایدار',
      tagEn: 'Habit Formation',
      badgeColor: 'bg-[#F6D35F]',
      previewType: 'pomodoro',
    },
    {
      step: '04 - تبادل در خوابگاه',
      stepEn: '04 - CAMPUS COMMERCE',
      titleFa: 'بازارچه درون‌دانشگاهی کتب و جزوات بدون واسطه',
      titleEn: 'Campus Marketplace & Notes Vault',
      descFa: 'خرید و فروش امن کتاب‌های دست‌دوم، جزوات تایپ‌شده و وسایل خوابگاهی با تحویل حضوری در محوطه دانشگاه و صفر درصد کارمزد واسطه‌گری.',
      descEn: 'Zero-commission peer-to-peer textbook and dorm essentials trade with verified in-person campus handoffs.',
      tagFa: 'صرفه‌جویی اقتصادی',
      tagEn: 'Budget Saver',
      badgeColor: 'bg-[#8E82E0]',
      previewType: 'marketplace',
    },
  ];

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FBF9F4] text-[#1A1A1A] selection:bg-[#F6D35F] selection:text-black font-sans antialiased relative overflow-x-hidden"
    >
      {/* Confetti Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[120]"
        style={{ display: confettiActive ? 'block' : 'none' }}
      />

      {/* ========================================================================= */}
      {/* 1. TOP BROWSER WINDOW BAR (Retro Mac Window Frame with Red/Yellow/Green)    */}
      {/* ========================================================================= */}
      <div className="bg-white border-b-2 border-black sticky top-0 z-50 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_2px_0px_rgba(0,0,0,0.06)]">
        {/* Left: Window Traffic Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/40 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-[#666] hidden md:inline-block ms-2">
            app.termyar.ir
          </span>
        </div>

        {/* Center: Brand Typography */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer flex items-center gap-2 font-serif"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-black italic">
            TermYar
          </span>
          <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-[#F6D35F] text-black border border-black/80">
            {isFa ? 'ترم‌یار' : 'Cockpit'}
          </span>
        </div>

        {/* Right: Quick Links, Language & Launch CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-4 text-xs font-bold text-[#333]">
            <button
              onClick={() => scrollToSection(problemRef)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {isFa ? 'مسئله ما' : 'The Problem'}
            </button>
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {isFa ? 'نحوه کارکرد' : 'How It Works'}
            </button>
            <button
              onClick={() => scrollToSection(whyUsRef)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {isFa ? 'چرا ترم‌یار؟' : 'Why Us'}
            </button>
            <button
              onClick={() => scrollToSection(leaderboardRef)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {isFa ? 'دستاوردها' : 'Leaderboard'}
            </button>
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="hover:text-[#5CA8F2] transition-colors cursor-pointer flex items-center gap-1 text-[#4F46E5]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isFa ? 'پرونده تحلیلی' : 'Dossier'}</span>
              </button>
            )}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center bg-[#EFECE6] p-0.5 rounded-full border border-black/30 text-[11px] font-bold">
            <button
              onClick={() => setLang('fa')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                isFa ? 'bg-white text-black shadow-sm' : 'text-[#666] hover:text-black'
              }`}
            >
              فا
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                !isFa ? 'bg-white text-black shadow-sm' : 'text-[#666] hover:text-black'
              }`}
            >
              EN
            </button>
          </div>

          {/* Launch App Main Yellow Pill Button (Homeroom Style) */}
          <button
            onClick={onLaunchApp}
            className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#F6D35F] hover:bg-[#F4C542] text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>{isFa ? 'ورود به سامانه' : 'Launch App'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: SKY BLUE TO GRASS WITH EDITORIAL ILLUSTRATION            */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative bg-[#5CA8F2] pt-12 sm:pt-16 pb-0 overflow-hidden border-b-2 border-black text-center"
      >
        {/* Soft Background Clouds */}
        <div className="absolute top-4 start-10 w-24 h-12 bg-white/40 rounded-full blur-xs pointer-events-none" />
        <div className="absolute top-8 end-20 w-36 h-14 bg-white/40 rounded-full blur-xs pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Pill Tag */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-white text-black text-xs font-mono font-bold tracking-wider uppercase border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.15)] mb-5">
            {isFa ? 'پلتفرم زیست‌بوم دانشجویی • نسخه پاییز ۱۴۰۳' : 'STUDENT ACADEMIC PLATFORM • CURRENTLY IN ACTIVE RELEASE'}
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-black leading-[1.15] mb-5">
            {isFa ? (
              <>
                مدیریت ترم و درس‌ها،
                <br className="hidden sm:inline" />
                حالا با هم و بدون استرس.
              </>
            ) : (
              <>
                Semester Planning,
                <br className="hidden sm:inline" />
                Now Smarter & Multi-Student.
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#1A1A1A] font-medium leading-relaxed mb-8">
            {isFa
              ? 'با ترم‌یار، هر دانشجویی می‌تواند انتخاب واحدش را بدون تداخل از گلستان استخراج کند، با نمره سلامت هوای معدلش را داشته باشد و با پومودورو منظم درس بخواند.'
              : 'With TermYar, any student can organize their university semester, sync Golestan schedules, maintain healthy GPAs, and study together.'}
          </p>

          {/* Action CTAs: Yellow Pill + White Pill + Dossier */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onLaunchApp}
              className="px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-black bg-[#F6D35F] hover:bg-[#f4c63b] text-black border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{isFa ? 'شروع رایگان ترم' : 'Get Started Free'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold bg-white hover:bg-[#F2EFE9] text-black border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              {isFa ? 'نحوه کارکرد سامانه' : 'See how it works'}
            </button>

            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold bg-[#E8E4FA] hover:bg-[#ded9f7] text-[#2D225A] border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#4F46E5]" />
                <span>{isFa ? 'مطالعه پرونده تحلیلی' : 'Academic Dossier'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Illustration with Speech Bubbles (Homeroom Style!) */}
        <div className="relative max-w-5xl mx-auto px-4 pt-2">
          {/* Floating Speech Bubble 1 */}
          <div className="absolute top-10 start-8 sm:start-24 z-20 px-3.5 py-2 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-bold text-black flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            <span>{isFa ? 'تداخل کلاسی گلستان حل شد! 🎉' : 'Schedule conflict solved! 🎉'}</span>
          </div>

          {/* Floating Speech Bubble 2 */}
          <div className="absolute top-16 end-8 sm:end-28 z-20 px-3.5 py-2 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-bold text-black flex items-center gap-2">
            <span>{isFa ? 'نمره سلامت ترمم رسید به ۹۴!' : 'Semester Score: 94%'}</span>
            <span className="text-xs">💪</span>
          </div>

          {/* Main Editorial Hero Illustration */}
          <div className="relative rounded-t-3xl overflow-hidden border-t-2 border-x-2 border-black shadow-[0_-4px_25px_rgba(0,0,0,0.15)] bg-[#82A77B]">
            <img
              src={editorialHeroImg}
              alt="TermYar Students on Campus"
              className="w-full h-auto max-h-[520px] object-cover object-bottom block"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE TICKER / ACTIVITY MARQUEE RIBBON (Homeroom Exact Activity Style)   */}
      {/* ========================================================================= */}
      <div className="bg-[#1A1A1A] text-white py-2.5 border-b-2 border-black overflow-hidden relative z-20">
        <div className="flex items-center gap-4 whitespace-nowrap animate-marquee">
          {[
            { textFa: 'علی از دانشگاه شریف جزوه پایگاه داده را به اشتراک گذاشت', color: 'bg-[#27C93F] text-black' },
            { textFa: 'سارا جلسه ۲۵ دقیقه‌ای پومودورو درس هوش مصنوعی را ثبت کرد', color: 'bg-[#5CA8F2] text-black' },
            { textFa: 'رضا فایل انتخاب واحد گلستان را در ۳ ثانیه پردازش کرد', color: 'bg-[#F6D35F] text-black' },
            { textFa: 'نیما نمره سلامت ترم خود را به ۹۴ ارتقا داد', color: 'bg-[#FF6B6B] text-white' },
            { textFa: 'مریم کتاب مرجع یادگیری ماشین را در خوابگاه مبادله کرد', color: 'bg-[#8E82E0] text-white' },
            { textFa: 'آوا و آرین زنجیره مطالعه ۱۴ روزه را ثبت کردند', color: 'bg-[#F6D35F] text-black' },
            { textFa: 'پویا یادداشت‌های تحلیلی پایان‌ترم را در بانک ذخیره کرد', color: 'bg-[#27C93F] text-black' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-bold font-mono">
              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${item.color}`}>
                +LIVE
              </span>
              <span>{item.textFa}</span>
              <span className="text-[#555] mx-2">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. THE EDITORIAL STATEMENT STRIP (Warm Cream Backdrop)                    */}
      {/* ========================================================================= */}
      <section
        ref={problemRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b-2 border-black text-start"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono font-bold text-[#666] tracking-wider uppercase block mb-2">
              {isFa ? 'مسئله اصلی دانشجو' : 'THE PROBLEM'}
            </span>
            <div className="w-12 h-1 bg-black mb-4" />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-black leading-tight">
              {isFa ? (
                <>
                  ثبت‌نام در دانشگاه آسان است.
                  <br />
                  تنهایی جان سالم به در بردن از فرجه‌ها و تداخل‌ها، نه.
                </>
              ) : (
                <>
                  Enrolling in university is easy.
                  <br />
                  Surviving courses, overlaps, and finals alone isn’t.
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#444] leading-relaxed">
              {isFa
                ? 'همه ما این حس را می‌شناسیم: فرجه‌هایی که ناگهان تمام می‌شوند، تداخل ساعات کلاسی در سامانه گلستان، گروه‌های تلگرامی پر از اسپم و جزوات ناقص شب امتحان. ترم‌یار آمده است تا یک نظم پایدار، شخصی‌سازی‌شده و همراه با هم‌کلاسی‌ها در زیست‌بوم تحصیلی شما بسازد.'
                : 'Scattered Telegram groups, PDF schedules nobody can read, lost assignments, and sudden exam shock. TermYar replaces the chaos with a unified, smart, distraction-free academic cockpit.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS CAROUSEL (Sage Green Backdrop - Homeroom Style!)           */}
      {/* ========================================================================= */}
      <section
        ref={howItWorksRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#82A77B] border-b-2 border-black relative overflow-hidden text-start"
      >
        {/* Decorative Retro Starbursts */}
        <div className="absolute top-8 start-10 text-white/20 text-6xl font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-10 end-12 text-white/20 text-7xl font-serif pointer-events-none">✦</div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header & Carousel Arrow Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-black/70 tracking-wider uppercase block mb-1">
                {isFa ? 'نحوه کارکرد پلتفرم' : 'HOW IT WORKS'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-black">
                {isFa ? 'برنامه‌ای که با گام‌های تو پیش می‌رود' : 'Courses managed with real clarity'}
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center justify-center font-bold cursor-pointer hover:bg-[#F6D35F] transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-[1px] active:shadow-none flex items-center justify-center font-bold cursor-pointer hover:bg-[#F6D35F] transition-colors"
                aria-label="Next Slide"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* The Big Carousel Card (Homeroom Style Inside Card) */}
          <div className="bg-[#EBF3E8] rounded-3xl p-6 sm:p-10 border-2 border-black shadow-[6px_6px_0px_#000] relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative Explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full text-black border border-black ${slides[activeSlide].badgeColor}`}>
                    {isFa ? slides[activeSlide].tagFa : slides[activeSlide].tagEn}
                  </span>
                  <span className="text-xs font-mono text-black/60 font-bold">
                    {isFa ? slides[activeSlide].step : slides[activeSlide].stepEn}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-black leading-snug">
                  {isFa ? slides[activeSlide].titleFa : slides[activeSlide].titleEn}
                </h3>

                <p className="text-sm sm:text-base text-[#333] leading-relaxed">
                  {isFa ? slides[activeSlide].descFa : slides[activeSlide].descEn}
                </p>

                <div className="pt-2">
                  <button
                    onClick={onLaunchApp}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#1A1A1A] hover:bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)] flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                  >
                    <span>{isFa ? 'امتحان در داشبورد' : 'Try in Dashboard'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Mock UI Preview */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-[4px_4px_0px_#000] text-start">
                  {/* Mock Window Header */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 border border-black/20" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-black/60">
                      TermYar • Module {activeSlide + 1}
                    </span>
                  </div>

                  {/* Dynamic Slide Preview Box */}
                  {activeSlide === 0 && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#5CA8F2]/15 border border-[#5CA8F2] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-5 h-5 text-[#5CA8F2]" />
                          <div>
                            <div className="text-xs font-bold text-black">گزارش گلستان ۱۱۰</div>
                            <div className="text-[10px] text-[#666]">تأیید خودکار ۶ درس و تاریخ امتحانات</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-300">
                          استخراج شد ✓
                        </span>
                      </div>
                      <div className="text-xs font-bold text-black">شنبه • ۸:۰۰ تا ۱۰:۰۰ — هوش مصنوعی (تالار ۲)</div>
                      <div className="text-xs font-bold text-black">دوشنبه • ۱۰:۳۰ تا ۱۲:۳۰ — پایگاه داده (سایت ۴)</div>
                    </div>
                  )}

                  {activeSlide === 1 && (
                    <div className="space-y-3 text-center py-2">
                      <div className="inline-block p-4 rounded-full border-4 border-[#82A77B] bg-[#82A77B]/10">
                        <div className="text-3xl font-black text-black">۹۲</div>
                        <div className="text-[10px] font-bold text-[#82A77B]">نمره سلامت ترم</div>
                      </div>
                      <div className="text-xs font-bold text-green-700">وضعیت تحصیلی: بسیار عالی و پایدار</div>
                      <div className="text-[11px] text-[#666]">۹۵٪ تکالیف تحویل داده شده • فرجه آزمون فعال است</div>
                    </div>
                  )}

                  {activeSlide === 2 && (
                    <div className="space-y-3 text-center py-2">
                      <div className="text-4xl font-mono font-black text-black">۲۵:۰۰</div>
                      <div className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>۱۴ روز زنجیره مطالعه پیوسته</span>
                      </div>
                      <div className="text-[11px] text-[#666]">ثبت مستقیم زمان مطالعه در کارنامه درس</div>
                    </div>
                  )}

                  {activeSlide === 3 && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-[#FBF9F4] border border-black/20 flex items-center justify-between text-xs">
                        <span className="font-bold">کتاب یادگیری ماشین (بیشاپ)</span>
                        <span className="font-bold text-green-700">۱۸۰ هزار ت (نو)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FBF9F4] border border-black/20 flex items-center justify-between text-xs">
                        <span className="font-bold">جزوه کامل تایپ‌شده پایگاه داده</span>
                        <span className="font-bold text-[#5CA8F2]">رایگان در بانک</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === i ? 'w-8 bg-black' : 'w-2.5 bg-black/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY TERMYAR? RETRO TV / MONITOR SHOWCASE (Homeroom Retro TV Aesthetic) */}
      {/* ========================================================================= */}
      <section
        ref={whyUsRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#7CB7EC] border-b-2 border-black relative overflow-hidden text-center"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-white text-black text-xs font-mono font-bold tracking-wider uppercase border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.15)] mb-4">
            {isFa ? 'چرا ترم‌یار؟' : 'WHY US?'}
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-black mb-3">
            {isFa ? 'پلتفرمی که هوای معدل و زمانت را دارد' : 'Apps that stay on your side'}
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-black/80 font-medium leading-relaxed mb-10">
            {isFa
              ? 'دیگر نگران فراموش کردن ددلاین‌ها در گروه‌های شلوغ تلگرام نباش. کانال‌های تلویزیون زیر را تغییر بده و کارکرد زنده ترم‌یار را کشف کن:'
              : 'You know the feeling. The exam you forgot, the lost notes, the spreadsheet chaos. Switch through the channels to see how TermYar fixes it:'}
          </p>

          {/* Retro Antenna + Vintage TV Frame (Handcrafted Homeroom Style TV) */}
          <div className="relative max-w-lg mx-auto">
            {/* Top Retro TV V-Antenna */}
            <div className="relative w-32 h-16 mx-auto -mb-2 pointer-events-none">
              <div className="absolute bottom-0 start-1/2 w-1 h-14 bg-gradient-to-t from-gray-700 to-gray-400 -translate-x-1/2 -rotate-25 origin-bottom rounded-full shadow-sm" />
              <div className="absolute bottom-0 start-1/2 w-1 h-14 bg-gradient-to-t from-gray-700 to-gray-400 -translate-x-1/2 rotate-25 origin-bottom rounded-full shadow-sm" />
              <div className="absolute top-0 start-3 w-3 h-3 bg-gray-300 rounded-full border border-black" />
              <div className="absolute top-0 end-3 w-3 h-3 bg-gray-300 rounded-full border border-black" />
            </div>

            {/* Vintage TV Chassis */}
            <div className="bg-[#D6D3CD] rounded-3xl p-5 sm:p-7 border-4 border-black shadow-[8px_8px_0px_#000] relative">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* TV Screen Glass Window (9 Cols) */}
                <div className="col-span-9 bg-[#111] rounded-2xl p-4 sm:p-6 border-4 border-black shadow-inner min-h-[260px] flex flex-col justify-center text-start relative overflow-hidden">
                  {/* Scanline CRT overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)',
                    }}
                  />

                  {/* Channel Content */}
                  <div className="relative z-10 text-white space-y-3">
                    {activeChannel === 1 && (
                      <div>
                        <div className="text-[10px] font-mono text-[#F6D35F] uppercase font-bold">CH 01 • HEALTH SCORE</div>
                        <h4 className="text-lg sm:text-xl font-bold mt-1">شاخص سلامت ترم: ۹۲٪</h4>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                          پیش‌بینی معدل و آمادگی کامل برای آزمون‌ها قبل از رسیدن به شب امتحان.
                        </p>
                        <div className="mt-3 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 text-xs font-bold inline-block">
                          وضعیت: در محدوده امن و معدل الف ✓
                        </div>
                      </div>
                    )}

                    {activeChannel === 2 && (
                      <div>
                        <div className="text-[10px] font-mono text-[#5CA8F2] uppercase font-bold">CH 02 • FOCUS TIMER</div>
                        <h4 className="text-lg sm:text-xl font-bold mt-1">تایمر پومودورو ۲۵:۰۰</h4>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                          مطالعه عمیق بدون حواس‌پرتی نوتیفیکیشن‌ها و ثبت خودکار در کارنامه درس.
                        </p>
                        <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold inline-block">
                          ۱۴ روز زنجیره مطالعه پیاپی 🔥
                        </div>
                      </div>
                    )}

                    {activeChannel === 3 && (
                      <div>
                        <div className="text-[10px] font-mono text-[#82A77B] uppercase font-bold">CH 03 • SCHEDULE & EXAMS</div>
                        <h4 className="text-lg sm:text-xl font-bold mt-1">تقویم و فرجه‌های امتحانات</h4>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                          شمارش معکوس دقیق تا آزمون‌های پایان‌ترم بدون غافلگیری.
                        </p>
                        <div className="mt-3 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold inline-block">
                          آزمون میان‌ترم هوش مصنوعی: ۵ روز مانده
                        </div>
                      </div>
                    )}

                    {activeChannel === 4 && (
                      <div>
                        <div className="text-[10px] font-mono text-[#FF6B6B] uppercase font-bold">CH 04 • CAMPUS TRADE</div>
                        <h4 className="text-lg sm:text-xl font-bold mt-1">بازارچه خوابگاهی و جزوات</h4>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                          تبادل بی‌واسطه کتب دست‌دوم با تحویل حضوری در محوطه دانشگاه.
                        </p>
                        <div className="mt-3 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold inline-block">
                          صفر درصد کارمزد و دسترسی فوری
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Dial Panel (3 Cols) */}
                <div className="col-span-3 flex flex-col items-center justify-around h-full space-y-3">
                  {/* Channel Rotary Knob */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-black font-mono mb-1">TUNER</span>
                    <button
                      onClick={() => setActiveChannel((prev) => (prev % 4) + 1)}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border-2 border-black shadow-[2px_2px_0px_#000] active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                      title="Click to switch channel"
                    >
                      <div
                        className="w-1.5 h-5 bg-white rounded-full transition-transform duration-200"
                        style={{ transform: `rotate(${activeChannel * 90}deg)` }}
                      />
                    </button>
                  </div>

                  {/* Volume Knob */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-black font-mono mb-1">VOL</span>
                    <div className="w-8 h-8 rounded-full bg-gray-600 border border-black shadow-inner flex items-center justify-center">
                      <div className="w-1 h-3 bg-gray-300 rounded-full rotate-45" />
                    </div>
                  </div>

                  {/* Channel Quick Buttons */}
                  <div className="grid grid-cols-2 gap-1 w-full pt-1">
                    {[1, 2, 3, 4].map((ch) => (
                      <button
                        key={ch}
                        onClick={() => setActiveChannel(ch)}
                        className={`text-[10px] font-bold py-1 rounded border border-black cursor-pointer ${
                          activeChannel === ch ? 'bg-[#F6D35F] text-black font-black' : 'bg-white text-black'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TV Bottom Stand Feet */}
              <div className="flex items-center justify-between px-6 -mb-9 mt-4 pointer-events-none">
                <div className="w-6 h-5 bg-gray-800 rounded-b-md border-x-2 border-b-2 border-black" />
                <div className="w-6 h-5 bg-gray-800 rounded-b-md border-x-2 border-b-2 border-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STUDENT CONTRIBUTIONS & LEADERBOARD (Warm Cream Backdrop)              */}
      {/* ========================================================================= */}
      <section
        ref={leaderboardRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b-2 border-black text-start"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-black">
              {isFa ? 'دستاوردها، ثبت و محاسبه می‌شوند' : 'Contributions, Counted'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#444] leading-relaxed">
            {isFa
              ? 'دانشجویانی که برای بهبود وضعیت تحصیلی خود و دیگران وقت می‌گذارند، امتیاز می‌گیرند. جلسات مطالعه ثبت شده، اشتراک جزوات و حل تمرین‌ها محاسبه می‌شوند.'
              : 'The students helping each other study and organize should get credit for it. Propose changes, share notes, complete Pomodoro cycles, and earn verified points.'}
          </p>
        </div>

        {/* Yellow Retro Mac Window Leaderboard (Homeroom Contributions Style!) */}
        <div className="bg-[#F7E594] rounded-2xl border-2 border-black shadow-[5px_5px_0px_#000] overflow-hidden">
          {/* Top Window Strip */}
          <div className="bg-[#F4DA75] px-4 py-2 border-b-2 border-black flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/40" />
            <span className="text-[11px] font-mono font-bold text-black/60 ms-2">
              STUDENT_LEADERBOARD.TAB
            </span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-2.5 border-b border-black/20 text-[11px] font-mono font-bold text-black/60 uppercase">
            <div className="col-span-5">{isFa ? 'دانشجو' : 'CONTRIBUTOR'}</div>
            <div className="col-span-4">{isFa ? 'دستاورد تحصیلی' : 'ACHIEVEMENT'}</div>
            <div className="col-span-3 text-end">{isFa ? 'امتیاز تمرکز' : 'POINTS'}</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-black/15 text-xs font-bold text-black">
            {[
              { name: 'آوا مرادی (کامپیوتر)', badge: 'زنجیره ۱۴ روزه مطالعه', badgeColor: 'bg-[#5CA8F2]/20 text-[#1D4ED8]', pts: '+۳,۲۰۰' },
              { name: 'آرین رضایی (صنایع)', badge: 'اشتراک جزوه رتبه ۱ پایگاه داده', badgeColor: 'bg-green-200 text-green-900', pts: '+۲,۱۰۰' },
              { name: 'سامان کاظمی (مکانیک)', badge: '۱۰۰٪ تکمیل تکالیف ترم', badgeColor: 'bg-purple-200 text-purple-900', pts: '+۵,۸۰۰' },
              { name: 'رویا تهرانی (برق)', badge: 'نمره سلامت ترم ۹۶', badgeColor: 'bg-amber-200 text-amber-900', pts: '+۲,۴۳۰' },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-black/[0.03] transition-colors">
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className="truncate">{row.name}</span>
                </div>
                <div className="col-span-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeColor}`}>
                    {row.badge}
                  </span>
                </div>
                <div className="col-span-3 text-end font-mono font-bold text-black">
                  {row.pts}
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Verification */}
          <div className="px-4 py-2.5 bg-[#F4DA75] border-t-2 border-black text-center text-[11px] font-medium text-black">
            ✓ {isFa ? 'تمامی رکوردها بر پایه جلسات واقعی مطالعه در پومودورو ثبت شده‌اند.' : 'Every record is verified from authentic student study sessions.'}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. OWNERSHIP & CAMPUS COMMUNITY (Sunny Yellow Section - Homeroom Style!)  */}
      {/* ========================================================================= */}
      <section
        ref={communityRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F6D35F] border-b-2 border-black relative overflow-hidden text-start"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-black/70 tracking-wider uppercase block">
              {isFa ? 'زیست‌بوم خودگردان دانشجویی' : 'OWNERSHIP'}
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-black">
              {isFa ? 'ساخته‌شده با انرژی خود دانشجوها' : 'Powered by students'}
            </h2>

            <p className="text-sm sm:text-base text-black/85 font-medium leading-relaxed max-w-lg">
              {isFa
                ? 'ترم‌یار حاصل تجربیات زیسته دانشجویانی است که طعم تلخ فراموشی فرجه‌ها و استرس گلستان را چشیده‌اند. هیچ شرکتی از بیرون دانشگاه دغدغه‌های خوابگاه و شب امتحان را به این دقت درک نمی‌کند.'
                : 'TermYar runs on peer student participation. Your study streaks, shared notes, and peer marketplace activity build a collective knowledge hub for your entire campus.'}
            </p>

            <div className="text-xs font-mono font-bold text-black pt-2">
              {isFa ? 'کاملاً رایگان • بدون وابستگی تجاری • حفظ کامل حریم خصوصی' : '100% Free • No commercial paywalls • Privacy First'}
            </div>
          </div>

          {/* Right: Floating Student Avatars with Points Badges (Homeroom Style!) */}
          <div className="lg:col-span-5 relative min-h-[180px] flex items-center justify-center">
            <div className="relative w-full max-w-xs space-y-3">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] -rotate-2 transform hover:rotate-0 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-[#5CA8F2] text-white flex items-center justify-center font-bold text-sm">
                  👩‍🎓
                </div>
                <div className="text-xs font-bold text-black flex-1">آوا مرادی</div>
                <span className="text-[10px] font-mono font-black bg-[#F6D35F] px-2 py-0.5 rounded border border-black">
                  +320 PTS
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] rotate-2 ms-6 transform hover:rotate-0 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-[#82A77B] text-white flex items-center justify-center font-bold text-sm">
                  👨‍🎓
                </div>
                <div className="text-xs font-bold text-black flex-1">آرین رضایی</div>
                <span className="text-[10px] font-mono font-black bg-[#82A77B] text-white px-2 py-0.5 rounded border border-black">
                  +500 PTS
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1 transform hover:rotate-0 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  🧑‍💻
                </div>
                <div className="text-xs font-bold text-black flex-1">سامان کاظمی</div>
                <span className="text-[10px] font-mono font-black bg-purple-200 px-2 py-0.5 rounded border border-black">
                  +215 PTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PRE-FOOTER & STUDENT CIRCLE FINALE (Homeroom Grand Finale Aesthetic)   */}
      {/* ========================================================================= */}
      <section
        ref={ctaRef}
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center"
      >
        <span className="text-xs font-mono font-bold text-[#666] tracking-wider uppercase block mb-3">
          {isFa ? 'آغاز یک ترم پربار و منظم' : 'JOIN THE CAMPUS COCKPIT'}
        </span>

        <h2 className="text-3xl sm:text-6xl font-serif font-black text-black leading-tight mb-4">
          {isFa ? (
            <>
              بیا این ترم را
              <br />
              متفاوت بسازیم.
            </>
          ) : (
            <>
              Come build the next
              <br />
              semester with us.
            </>
          )}
        </h2>

        <p className="max-w-md mx-auto text-sm sm:text-base text-[#444] font-medium leading-relaxed mb-8">
          {isFa
            ? 'همین امروز به جمع صدها دانشجوی پیشرو بپیوند و استرس انتخاب واحد، فرجه‌های فشرده و مدیریت دروس را به یک تجربه منظم، خودکار و لذت‌بخش تبدیل کن.'
            : 'Organize your semester with intelligent schedule sync, health tracking, and zero distraction.'}
        </p>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={onLaunchApp}
            className="px-8 py-3.5 rounded-full text-base font-black bg-[#F6D35F] hover:bg-[#F4C542] text-black border-2 border-black shadow-[4px_4px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            <span>{isFa ? 'ورود به سامانه ترم‌یار' : 'Launch TermYar App'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>

          <button
            onClick={triggerConfetti}
            className="px-6 py-3.5 rounded-full text-base font-bold bg-white hover:bg-[#F2EFE9] text-black border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
          >
            <PartyPopper className="w-4 h-4 text-amber-500" />
            <span>{isFa ? 'جشن و پرتاب کاغذ رنگی! 🎉' : 'Celebrate Confetti 🎉'}</span>
          </button>
        </div>

        {/* Grand Metallic / Editorial Inflatable Typography (Homeroom Silver Style) */}
        <div className="my-8">
          <div className="text-5xl sm:text-8xl font-serif font-black tracking-tighter text-black/90 uppercase select-none drop-shadow-md">
            TermYar
          </div>
          <div className="text-[11px] font-mono tracking-widest text-[#777] uppercase mt-2">
            {isFa ? 'پلتفرم زیست‌بوم دانشجویی و پایش سلامت تحصیلی' : 'THE STUDENTS USING SOMETHING SHOULD HAVE A ROLE IN SHAPING IT'}
          </div>
        </div>

        {/* Bottom Student Study Circle Illustration (Exact Homeroom Style!) */}
        <div className="max-w-md mx-auto pt-4">
          <img
            src={editorialCircleImg}
            alt="Students Studying in a Circle"
            className="w-full h-auto block drop-shadow-lg"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CLEAN MINIMAL SAGE GREEN FOOTER RIBBON (Homeroom Exact Footer Style)  */}
      {/* ========================================================================= */}
      <footer className="bg-[#82A77B] text-black py-4 px-4 sm:px-8 border-t-2 border-black text-xs font-bold">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Telegram</span>
            <span className="hover:underline cursor-pointer">GitHub</span>
            <span className="hover:underline cursor-pointer">LinkedIn</span>
          </div>

          {/* Copyright */}
          <div className="text-center font-mono text-[11px]">
            © {new Date().getFullYear()} TermYar (ترم‌یار) • ساخته‌شده برای دانشگاه‌های سراسر کشور
          </div>

          {/* Page Links */}
          <div className="flex items-center gap-4">
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="hover:underline cursor-pointer"
              >
                {isFa ? 'پرونده تحلیلی' : 'Dossier'}
              </button>
            )}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:underline cursor-pointer"
            >
              {isFa ? 'بازگشت به بالا' : 'Back to top'}
            </button>
            <button
              onClick={onLaunchApp}
              className="text-black font-black hover:underline cursor-pointer"
            >
              {isFa ? 'داشبورد' : 'Dashboard'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
