import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  Flame,
  GraduationCap,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Quote,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
} from 'motion/react';

import campusHeroImg from '../assets/images/campus_hero_students_1794661571470.jpg';
import libraryGroupImg from '../assets/images/library_group_study_1794661571416.jpg';
import studentFocusImg from '../assets/images/student_campus_focus_1794661571408.jpg';

interface LandingPageViewProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  onLaunchApp: () => void;
  onOpenDossier?: () => void;
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}

const ResilientPhoto: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-full h-full min-h-[240px] bg-gradient-to-br from-slate-100 via-sky-50 to-amber-50 flex flex-col items-center justify-center p-6 text-center text-slate-700 ${className}`}
      >
        <GraduationCap className="w-10 h-10 text-slate-500 mb-3" />
        <span className="text-sm font-bold">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

  // Active FAQ item index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Confetti overlay trigger
  const [confettiActive, setConfettiActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Section references for smooth scrolling & scroll parallax
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const leaderboardRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Scroll-linked subtle parallax on hero visual frame
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, 32]);
  const bubbleOneY = useTransform(heroScrollProgress, [0, 1], [0, -18]);
  const bubbleTwoY = useTransform(heroScrollProgress, [0, 1], [0, -28]);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setConfettiActive(false);
      }
    };

    render();
  };

  // Demo Testimonials for Seamless Marquee (explicitly marked as demo previews)
  const demoTestimonials = isFa
    ? [
        {
          quote: '«برنامه انتخاب واحد رو از فایل گزارش گلستان کشید بیرون و کل هفته بدون تداخل چیده شد.»',
          author: 'کیانوش ر. · مهندسی کامپیوتر',
          tag: 'نمونه آزمایشی',
        },
        {
          quote: '«شاخص سلامت ترم قبل از اینکه فرجه‌ها شلوغ بشن بهم یادآوری کرد کدوم درس عقب افتاده.»',
          author: 'نگین م. · مهندسی صنایع',
          tag: 'نمونه آزمایشی',
        },
        {
          quote: '«تایمر پومودورو که مستقیم به اسم هر درس وصله باعث شد زمان مطالعه واقعی‌م رو ببینم.»',
          author: 'پارسا ح. · مهندسی برق',
          tag: 'نمونه آزمایشی',
        },
        {
          quote: '«پیدا کردن جزوه تایپ‌شده و کتاب ترم پیش از بچه‌های خوابگاه خیلی راحت‌تر از گشتن تو کانال‌هاست.»',
          author: 'زهرا ک. · مهندسی مکانیک',
          tag: 'نمونه آزمایشی',
        },
        {
          quote: '«همه ددلاین تمرین‌ها و تاریخ امتحان‌ها تو یک صفحه منظم جمع شده و استرس شب امتحان کمتر شده.»',
          author: 'امیرحسین ف. · علوم کامپیوتر',
          tag: 'نمونه آزمایشی',
        },
        {
          quote: '«رابط کاربری خلوت و سریعش کمک می‌کنه بین کلاس‌ها سریع برنامه روزانه‌مو چک کنم.»',
          author: 'مهسا ن. · معماری',
          tag: 'نمونه آزمایشی',
        },
      ]
    : [
        {
          quote: '“Imported my portal PDF in seconds and spotted a lab overlap before add/drop ended.”',
          author: 'Kianoush R. · Computer Engineering',
          tag: 'Demo Preview',
        },
        {
          quote: '“The Semester Health Score warned me early which course assignments needed attention.”',
          author: 'Negin M. · Industrial Engineering',
          tag: 'Demo Preview',
        },
        {
          quote: '“Course-linked Pomodoro blocks finally showed me how many focused hours each subject took.”',
          author: 'Parsa H. · Electrical Engineering',
          tag: 'Demo Preview',
        },
        {
          quote: '“Swapping used textbooks with dorm peers beats digging through dozens of chat groups.”',
          author: 'Zahra K. · Mechanical Engineering',
          tag: 'Demo Preview',
        },
        {
          quote: '“Having every deadline and finals countdown in one quiet workspace saves hours every week.”',
          author: 'Amirhossein F. · Computer Science',
          tag: 'Demo Preview',
        },
        {
          quote: '“Clean layout and quick daily overview make checking classes between lectures effortless.”',
          author: 'Mahsa N. · Architecture',
          tag: 'Demo Preview',
        },
      ];

  // How It Works Slides Data
  const slides = [
    {
      stepNumFa: '۰۱',
      stepNumEn: '01',
      step: '۰۱ · شروع بدون زحمت',
      stepEn: '01 · START EFFORTLESSLY',
      titleFa: 'استخراج برنامه کلاسی از گلستان با یک لمس',
      titleEn: 'Sync Your Schedule from Golestan in Seconds',
      descFa:
        'تصویر یا فایل PDF کارنامه و انتخاب واحد خود را آپلود کنید. هوش مصنوعی ترم‌یار تمامی ساعات، تالارها، اساتید و تاریخ امتحانات را فوراً در تقویم شما می‌چیند.',
      descEn:
        'Upload your university portal schedule. TermYar OCR instantly extracts class halls, professors, times, and finals countdown.',
      tagFa: 'سیستم هوشمند OCR',
      tagEn: 'Smart OCR Engine',
      accentBg: 'bg-[#5CA8F2]/15 text-[#0F4C81]',
    },
    {
      stepNumFa: '۰۲',
      stepNumEn: '02',
      step: '۰۲ · پایش مداوم معدل',
      stepEn: '02 · GPA WELLNESS',
      titleFa: 'شاخص سلامت ترم: آگاهی قبل از بحران',
      titleEn: 'Semester Health Score: Insight Before Crises',
      descFa:
        'فرمول اختصاصی وزن‌دار آموزشی بر پایه وضعیت تمرین‌ها، ساعت مطالعه هفتگی و فرجه‌های امتحانات، عددی از ۰ تا ۱۰۰ محاسبه کرده و از افت تحصیلی پیشگیری می‌کند.',
      descEn:
        'A weighted 0-100 diagnostic score synthesizing assignment completion, study logs, and prep readiness to keep your GPA safe.',
      tagFa: 'الگوریتم پایش معدل',
      tagEn: 'Health Score Algorithm',
      accentBg: 'bg-[#82A77B]/20 text-[#264A21]',
    },
    {
      stepNumFa: '۰۳',
      stepNumEn: '03',
      step: '۰۳ · تمرکز و انگیزه روزانه',
      stepEn: '03 · DAILY MOMENTUM',
      titleFa: 'تایمر پومودورو متصل به دروس و زنجیره مطالعه',
      titleEn: 'Pomodoro Focus Cycles & Habit Streaks',
      descFa:
        'در محیطی آرامش‌بخش درس بخوانید؛ هر دقیقه مطالعه در درس مربوطه ثبت شده و زنجیره مطالعه متوالی به شما انگیزه استمرار در طول ترم می‌دهد.',
      descEn:
        'Distraction-free 25-minute focus cycles tied directly to your courses, tracking unbroken daily streaks with course logs.',
      tagFa: 'عادت‌سازی پایدار',
      tagEn: 'Habit Formation',
      accentBg: 'bg-[#F6D35F]/35 text-[#5C4500]',
    },
    {
      stepNumFa: '۰۴',
      stepNumEn: '04',
      step: '۰۴ · تبادل در خوابگاه',
      stepEn: '04 · CAMPUS COMMERCE',
      titleFa: 'بازارچه درون‌دانشگاهی کتب و جزوات بدون واسطه',
      titleEn: 'Campus Marketplace & Notes Vault',
      descFa:
        'خرید و فروش امن کتاب‌های دست‌دوم، جزوات تایپ‌شده و وسایل خوابگاهی با تحویل حضوری در محوطه دانشگاه و صفر درصد کارمزد واسطه‌گری.',
      descEn:
        'Zero-commission peer-to-peer textbook and dorm essentials trade with verified in-person campus handoffs.',
      tagFa: 'صرفه‌جویی اقتصادی',
      tagEn: 'Budget Saver',
      accentBg: 'bg-[#8E82E0]/20 text-[#3B2F8C]',
    },
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={isFa ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#FBF9F4] text-[#18181B] selection:bg-[#F6D35F] selection:text-[#18181B] font-sans antialiased relative overflow-x-hidden"
      >
        {/* Confetti Overlay */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[120]"
          style={{ display: confettiActive ? 'block' : 'none' }}
        />

        {/* ========================================================================= */}
        {/* 1. TOP NAVIGATION BAR (Refined 3-Zone Contract, Single-Line Controls)      */}
        {/* ========================================================================= */}
        <header className="bg-white/95 backdrop-blur-md border-b border-[#18181B]/12 sticky top-0 z-50 px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark + Subtle Window Accent */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90 border border-black/15 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90 border border-black/15 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90 border border-black/15 inline-block" />
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#18181B] rounded-lg px-1"
            >
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#18181B]">
                {isFa ? 'ترم‌یار' : 'TermYar'}
              </span>
              <span className="hidden md:inline text-xs font-mono text-[#64748B]">
                app.termyar.ir
              </span>
            </button>
          </div>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label={isFa ? 'ناوبری اصلی' : 'Primary navigation'}
            className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-[#475569]"
          >
            <button
              type="button"
              onClick={() => scrollToSection(problemRef)}
              className="hover:text-[#18181B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isFa ? 'مسئله ما' : 'The Problem'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(howItWorksRef)}
              className="hover:text-[#18181B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isFa ? 'نحوه کارکرد' : 'How It Works'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(whyUsRef)}
              className="hover:text-[#18181B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isFa ? 'چرا ترم‌یار؟' : 'Why Us'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(leaderboardRef)}
              className="hover:text-[#18181B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isFa ? 'دستاوردها' : 'Achievements'}
            </button>
            {onOpenDossier && (
              <button
                type="button"
                onClick={onOpenDossier}
                className="hover:text-[#4F46E5] text-[#4338CA] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isFa ? 'پرونده تحلیلی' : 'Dossier'}</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Language Toggle + Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label={isFa ? 'تغییر زبان' : 'Language selector'}
              className="flex items-center bg-[#F3F1EB] p-0.5 rounded-lg border border-[#18181B]/12 text-[11px] font-bold"
            >
              <button
                type="button"
                onClick={() => setLang('fa')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isFa ? 'bg-white text-[#18181B] shadow-xs' : 'text-[#64748B] hover:text-[#18181B]'
                }`}
              >
                فا
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  !isFa ? 'bg-white text-[#18181B] shadow-xs' : 'text-[#64748B] hover:text-[#18181B]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={onLaunchApp}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#F6D35F] hover:bg-[#F1C843] text-[#18181B] border border-[#18181B]/75 shadow-[0_2px_0_rgba(24,24,27,0.85)] active:translate-y-[1px] active:shadow-none transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>{isFa ? 'ورود به سامانه' : 'Launch App'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. HERO SECTION (Clean Sky Canvas, No Fall Badge, Authentic Photography)  */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="relative bg-gradient-to-b from-[#66A9EC] via-[#75B3F0] to-[#8BC1F3] pt-10 sm:pt-14 pb-0 overflow-hidden border-b border-[#18181B]/15 text-center"
        >
          {/* Soft ambient atmospheric clouds */}
          <div className="absolute top-6 start-12 w-32 h-14 bg-white/30 rounded-full blur-md pointer-events-none" />
          <div className="absolute top-12 end-16 w-44 h-16 bg-white/25 rounded-full blur-md pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Main Editorial Headline (No Fall Badge above) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="text-[2.1rem] sm:text-5xl lg:text-[3.75rem] font-black tracking-tight text-[#0F172A] leading-[1.22] mb-5 max-w-3xl mx-auto [text-wrap:balance]"
            >
              {isFa ? (
                <>
                  مدیریت ترم و درس‌ها،
                  <br className="hidden sm:inline" /> حالا با هم و بدون استرس.
                </>
              ) : (
                <>
                  Semester Planning,
                  <br className="hidden sm:inline" /> Now Smarter &amp; Multi-Student.
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="max-w-2xl mx-auto text-[15px] sm:text-lg text-[#0F172A]/85 font-medium leading-[1.8] mb-8"
            >
              {isFa
                ? 'با ترم‌یار، هر دانشجویی می‌تواند انتخاب واحدش را بدون تداخل از گلستان استخراج کند، با نمره سلامت هوای معدلش را داشته باشد و با پومودورو منظم درس بخواند.'
                : 'With TermYar, any student can organize their university semester, sync Golestan schedules, maintain healthy GPAs, and study together.'}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT_EXPO }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
            >
              <button
                type="button"
                onClick={onLaunchApp}
                className="px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-extrabold bg-[#F6D35F] hover:bg-[#F1C843] text-[#18181B] border border-[#18181B]/80 shadow-[0_6px_18px_-4px_rgba(24,24,27,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>{isFa ? 'شروع رایگان ترم' : 'Get Started Free'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection(howItWorksRef)}
                className="px-5 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-bold bg-white/95 hover:bg-white text-[#18181B] border border-[#18181B]/20 shadow-sm hover:-translate-y-0.5 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                {isFa ? 'نحوه کارکرد سامانه' : 'See how it works'}
              </button>

              {onOpenDossier && (
                <button
                  type="button"
                  onClick={onOpenDossier}
                  className="px-5 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-bold bg-[#EEF2FF]/95 hover:bg-white text-[#312E81] border border-[#312E81]/20 shadow-sm hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <FileText className="w-4 h-4 text-[#4338CA]" />
                  <span>{isFa ? 'مطالعه پرونده تحلیلی' : 'Academic Dossier'}</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Authentic University Campus Photography Frame with Scroll Parallax & Refined Notifications */}
          <div className="relative max-w-5xl mx-auto px-4 pt-2">
            {/* Floating Notification 1 — Updated Copy */}
            <motion.div
              style={{ y: bubbleOneY }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT_EXPO }}
              className="hidden sm:flex absolute top-8 start-10 md:start-16 z-20 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#18181B]/15 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.22)] text-xs font-bold text-[#0F172A] items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isFa ? 'با ترمیار به همه کارهام رسیدم' : 'I stayed on top of everything with TermYar'}</span>
            </motion.div>

            {/* Floating Notification 2 */}
            <motion.div
              style={{ y: bubbleTwoY }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="hidden sm:flex absolute top-14 end-10 md:end-16 z-20 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#18181B]/15 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.22)] text-xs font-bold text-[#0F172A] items-center gap-2"
            >
              <Activity className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>{isFa ? 'نمره سلامت ترمم رسید به ۹۴!' : 'Semester Score: 94%'}</span>
            </motion.div>

            {/* Main Authentic Campus Photo */}
            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
              className="relative rounded-t-2xl sm:rounded-t-3xl overflow-hidden border-t border-x border-[#18181B]/20 shadow-[0_-10px_40px_-10px_rgba(15,23,42,0.25)] bg-[#263529]"
            >
              <div className="relative aspect-[16/9] sm:aspect-[16/8.6] max-h-[520px] w-full overflow-hidden">
                <ResilientPhoto
                  src={campusHeroImg}
                  alt={
                    isFa
                      ? 'دانشجویان در محوطه دانشگاه در حال مرور برنامه کلاسی و یادداشت‌ها با لپ‌تاپ'
                      : 'University students reviewing schedules and notes together on campus'
                  }
                  fallbackTitle={isFa ? 'زیست‌بوم دانشجویی ترم‌یار' : 'TermYar Campus Life'}
                  className="w-full h-full object-cover object-center block"
                />
                {/* Measured subtle edge scrim for text/card legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

                {/* Mobile-only clean stacked notifications inside bottom scrim */}
                <div className="sm:hidden absolute inset-x-3 bottom-3 z-20 flex flex-col gap-2 items-start">
                  <div className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 shadow-md text-[11px] font-bold text-[#0F172A] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isFa ? 'با ترمیار به همه کارهام رسیدم' : 'I stayed on top of everything with TermYar'}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 shadow-md text-[11px] font-bold text-[#0F172A] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
                    <span>{isFa ? 'نمره سلامت ترمم رسید به ۹۴!' : 'Semester Score: 94%'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CONTINUOUS TESTIMONIALS MARQUEE (Replaces Black Ticker Completely)     */}
        {/* ========================================================================= */}
        <section
          aria-label={isFa ? 'بازخوردهای نمونه دانشجویان' : 'Demo student testimonials'}
          className="bg-white border-b border-[#18181B]/12 py-6 sm:py-7 overflow-hidden relative z-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
            <div className="flex items-center gap-2 font-semibold text-[#334155]">
              <Quote className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>
                {isFa
                  ? 'تجربه‌های نمونه از کار با ترم‌یار'
                  : 'Sample Student Experiences with TermYar'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#64748B]">
              {isFa
                ? 'نمونه بازخورد آزمایشی · برای پیش‌نمایش تا زمان ثبت نظرات واقعی'
                : 'Demo feedback · Sample preview pending verified student reviews'}
            </span>
          </div>

          {/* Seamless infinite horizontal marquee (LTR flex track prevents RTL jump bugs) */}
          <div dir="ltr" className="ty-marquee-wrapper relative overflow-hidden">
            {/* Soft horizontal edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="ty-marquee-track flex items-stretch gap-4 sm:gap-5 px-2">
              {[...demoTestimonials, ...demoTestimonials].map((item, idx) => (
                <article
                  key={idx}
                  dir={isFa ? 'rtl' : 'ltr'}
                  className="w-[290px] sm:w-[350px] shrink-0 rounded-2xl bg-[#FAF8F3] hover:bg-[#F5F1E6] border border-[#18181B]/10 hover:border-[#18181B]/25 p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-3"
                >
                  <p className="text-xs sm:text-[13px] font-medium text-[#1E293B] leading-relaxed">
                    {item.quote}
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#18181B]/8 text-[11px] text-[#64748B]">
                    <span className="font-bold text-[#334155] truncate">{item.author}</span>
                    <span className="shrink-0 font-medium text-[#64748B]">
                      · {item.tag}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE EDITORIAL STATEMENT & AUTHENTIC CAMPUS FOCUS PHOTO                 */}
        {/* ========================================================================= */}
        <section
          ref={problemRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#18181B]/10 text-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3 text-xs font-bold text-[#64748B] tracking-wide">
                <span className="w-8 h-px bg-[#18181B]/40 inline-block" />
                <span>{isFa ? 'مسئله اصلی دانشجو' : 'THE PROBLEM'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0F172A] leading-[1.3] [text-wrap:balance]">
                {isFa ? (
                  <>
                    ثبت‌نام در دانشگاه آسان است.
                    <br className="hidden sm:inline" /> تنهایی جان سالم به در بردن از فرجه‌ها و تداخل‌ها، نه.
                  </>
                ) : (
                  <>
                    Enrolling in university is easy.
                    <br className="hidden sm:inline" /> Surviving courses, overlaps, and finals alone isn’t.
                  </>
                )}
              </h2>

              <p className="text-[15px] sm:text-base text-[#475569] leading-[1.85] max-w-2xl">
                {isFa
                  ? 'همه ما این حس را می‌شناسیم: فرجه‌هایی که ناگهان تمام می‌شوند، تداخل ساعات کلاسی در سامانه گلستان، گروه‌های تلگرامی پر از اسپم و جزوات ناقص شب امتحان. ترم‌یار آمده است تا یک نظم پایدار، شخصی‌سازی‌شده و همراه با هم‌کلاسی‌ها در زیست‌بوم تحصیلی شما بسازد.'
                  : 'Scattered Telegram groups, PDF schedules nobody can read, lost assignments, and sudden exam shock. TermYar replaces the chaos with a unified, smart, distraction-free academic cockpit.'}
              </p>
            </div>

            <div className="lg:col-span-5">
              <figure className="rounded-2xl overflow-hidden border border-[#18181B]/12 bg-white shadow-[0_16px_38px_-14px_rgba(15,23,42,0.16)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientPhoto
                    src={studentFocusImg}
                    alt={
                      isFa
                        ? 'دو دانشجو در حال مطالعه و تنظیم برنامه هفتگی دروس در کتابخانه دانشگاه'
                        : 'Two university students reviewing weekly planner and study notes in library'
                    }
                    fallbackTitle={isFa ? 'مطالعه متمرکز دانشگاهی' : 'Focused Academic Study'}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs font-medium text-[#64748B] bg-white border-t border-[#18181B]/8">
                  {isFa
                    ? 'برنامه‌ریزی دروس و ثبت ساعات مطالعه در فضای آرام دانشجویی'
                    : 'Organizing semester timetables and focus blocks in a quiet study hall'}
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PLATFORM WORKFLOW CAROUSEL (Nav Buttons Moved INSIDE Upper Card Area)  */}
        {/* ========================================================================= */}
        <section
          ref={howItWorksRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#84A97D] border-b border-[#18181B]/15 relative overflow-hidden text-start"
        >
          {/* Subtle ambient glow */}
          <div className="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="max-w-5xl mx-auto relative z-10"
          >
            {/* Section Title (Navigation buttons intentionally moved inside the main slider card below) */}
            <div className="mb-8">
              <span className="text-xs font-bold text-[#102A12]/75 tracking-wide block mb-2">
                {isFa ? 'نحوه کارکرد پلتفرم' : 'HOW IT WORKS'}
              </span>
              <h2 className="text-3xl sm:text-[2.75rem] font-black text-[#0F172A] leading-tight [text-wrap:balance]">
                {isFa ? 'برنامه‌ای که با گام‌های تو پیش می‌رود' : 'Courses managed with real clarity'}
              </h2>
            </div>

            {/* Main Workflow Slider Card */}
            <div className="bg-[#F3F8F1] rounded-3xl p-5 sm:p-9 border border-[#18181B]/20 shadow-[0_22px_50px_-14px_rgba(15,23,42,0.2)] relative">
              {/* UPPER CARD CONTROLS: Step Indicator + Previous/Next Buttons right inside the upper area */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#18181B]/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-[#18181B] tabular-nums">
                    {isFa
                      ? `گام ${slides[activeSlide].stepNumFa} از ۰۴`
                      : `Step ${slides[activeSlide].stepNumEn} / 04`}
                  </span>
                  <span className="text-[#18181B]/25" aria-hidden="true">·</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${slides[activeSlide].accentBg}`}>
                    {isFa ? slides[activeSlide].tagFa : slides[activeSlide].tagEn}
                  </span>
                </div>

                {/* Prev / Next Navigation Buttons Positioned Inside Upper Card */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-[#F6D35F] text-[#18181B] border border-[#18181B]/25 shadow-xs active:scale-95 flex items-center justify-center cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#18181B]"
                    aria-label={isFa ? 'مرحله قبلی' : 'Previous step'}
                    title={isFa ? 'قبلی' : 'Previous'}
                  >
                    {isFa ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-[#F6D35F] text-[#18181B] border border-[#18181B]/25 shadow-xs active:scale-95 flex items-center justify-center cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#18181B]"
                    aria-label={isFa ? 'مرحله بعدی' : 'Next step'}
                    title={isFa ? 'بعدی' : 'Next'}
                  >
                    {isFa ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Animated Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Narrative Explanation */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="text-xs font-bold text-[#475569]">
                      {isFa ? slides[activeSlide].step : slides[activeSlide].stepEn}
                    </div>

                    <h3 className="text-xl sm:text-3xl font-black text-[#0F172A] leading-snug [text-wrap:balance]">
                      {isFa ? slides[activeSlide].titleFa : slides[activeSlide].titleEn}
                    </h3>

                    <p className="text-sm sm:text-[15px] text-[#334155] leading-[1.8]">
                      {isFa ? slides[activeSlide].descFa : slides[activeSlide].descEn}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onLaunchApp}
                        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#18181B] hover:bg-black text-white shadow-sm flex items-center gap-2 cursor-pointer transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                      >
                        <span>{isFa ? 'امتحان در داشبورد' : 'Try in Dashboard'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Interactive Product Preview Window */}
                  <div className="lg:col-span-6">
                    <div className="bg-white rounded-2xl p-5 border border-[#18181B]/15 shadow-[0_10px_28px_-8px_rgba(15,23,42,0.12)] text-start min-h-[210px] flex flex-col justify-between">
                      {/* Mock Window Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#18181B]/10 mb-4">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-[#64748B] tabular-nums">
                          TermYar · Module {activeSlide + 1}
                        </span>
                      </div>

                      {activeSlide === 0 && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-[#5CA8F2]/12 border border-[#5CA8F2]/40 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <FileSpreadsheet className="w-5 h-5 text-[#2563EB] shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-[#0F172A]">
                                  {isFa ? 'گزارش گلستان ۱۱۰' : 'Portal Schedule 110'}
                                </div>
                                <div className="text-[11px] text-[#475569]">
                                  {isFa ? 'تأیید خودکار ۶ درس و تاریخ امتحانات' : 'Auto-parsed 6 courses & finals'}
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                              {isFa ? 'استخراج شد ✓' : 'Parsed ✓'}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[#1E293B] flex items-center justify-between px-1">
                            <span>{isFa ? 'شنبه · ۸:۰۰ تا ۱۰:۰۰' : 'Sat · 08:00–10:00'}</span>
                            <span className="text-[#475569]">{isFa ? 'هوش مصنوعی (تالار ۲)' : 'AI Systems (Hall 2)'}</span>
                          </div>
                          <div className="text-xs font-semibold text-[#1E293B] flex items-center justify-between px-1">
                            <span>{isFa ? 'دوشنبه · ۱۰:۳۰ تا ۱۲:۳۰' : 'Mon · 10:30–12:30'}</span>
                            <span className="text-[#475569]">{isFa ? 'پایگاه داده (سایت ۴)' : 'Databases (Lab 4)'}</span>
                          </div>
                        </div>
                      )}

                      {activeSlide === 1 && (
                        <div className="space-y-3 text-center py-2">
                          <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-[#82A77B] bg-[#82A77B]/10">
                            <div className="text-3xl font-black text-[#0F172A] tabular-nums">
                              {isFa ? '۹۲' : '92'}
                            </div>
                            <div className="text-[10px] font-bold text-[#2F5E27]">
                              {isFa ? 'نمره سلامت' : 'Health Score'}
                            </div>
                          </div>
                          <div className="text-xs font-bold text-emerald-700">
                            {isFa ? 'وضعیت تحصیلی: پایدار و آماده آزمون' : 'Status: Stable & Exam-Ready'}
                          </div>
                          <div className="text-[11px] text-[#475569]">
                            {isFa
                              ? 'تکالیف به‌موقع تحویل داده شده · فرجه آزمون فعال است'
                              : 'Assignments on track · Finals prep window active'}
                          </div>
                        </div>
                      )}

                      {activeSlide === 2 && (
                        <div className="space-y-3 text-center py-2">
                          <div className="text-4xl font-mono font-black text-[#0F172A] tabular-nums">
                            {isFa ? '۲۵:۰۰' : '25:00'}
                          </div>
                          <div className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1.5">
                            <Flame className="w-4 h-4 text-amber-500" />
                            <span>{isFa ? '۱۴ روز زنجیره مطالعه پیوسته' : '14-Day Focus Streak'}</span>
                          </div>
                          <div className="text-[11px] text-[#475569]">
                            {isFa
                              ? 'ثبت مستقیم زمان مطالعه در کارنامه هر درس'
                              : 'Study sessions logged directly to each course'}
                          </div>
                        </div>
                      )}

                      {activeSlide === 3 && (
                        <div className="space-y-2.5">
                          <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#18181B]/10 flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                              <BookOpen className="w-4 h-4 text-[#475569] shrink-0" />
                              <span>{isFa ? 'کتاب یادگیری ماشین (بیشاپ)' : 'Pattern Recognition (Bishop)'}</span>
                            </div>
                            <span className="font-bold text-emerald-700 shrink-0 tabular-nums">
                              {isFa ? '۱۸۰ هزار ت' : 'Available'}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#18181B]/10 flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                              <ShoppingBag className="w-4 h-4 text-[#2563EB] shrink-0" />
                              <span>{isFa ? 'جزوه کامل تایپ‌شده پایگاه داده' : 'Typed Database Lecture Notes'}</span>
                            </div>
                            <span className="font-bold text-[#2563EB] shrink-0">
                              {isFa ? 'رایگان در بانک' : 'Free in Vault'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-7">
                {slides.map((slide, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      activeSlide === i ? 'w-8 bg-[#18181B]' : 'w-2 bg-[#18181B]/25 hover:bg-[#18181B]/45'
                    }`}
                    aria-label={isFa ? `رفتن به ${slide.step}` : `Go to ${slide.stepEn}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. WHY TERMYAR? INTERACTIVE RETRO MONITOR SHOWCASE                        */}
        {/* ========================================================================= */}
        <section
          ref={whyUsRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#7CB7EC] border-b border-[#18181B]/15 relative overflow-hidden text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <span className="text-xs font-bold text-[#0F172A]/75 tracking-wide block mb-2">
              {isFa ? 'چرا ترم‌یار؟' : 'WHY TERMYAR'}
            </span>

            <h2 className="text-3xl sm:text-[2.75rem] font-black text-[#0F172A] mb-3 [text-wrap:balance]">
              {isFa ? 'پلتفرمی که هوای معدل و زمانت را دارد' : 'Tools built to stay on your side'}
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#0F172A]/80 font-medium leading-[1.8] mb-10">
              {isFa
                ? 'دیگر نگران فراموش کردن ددلاین‌ها در گروه‌های شلوغ تلگرام نباش. کانال‌های زیر را تغییر بده و کارکرد بخش‌های ترم‌یار را ببین:'
                : 'No more missed deadlines buried in messy chats. Switch channels below to preview each core module:'}
            </p>

            {/* Retro Monitor / TV Showcase */}
            <div className="relative max-w-lg mx-auto">
              {/* V-Antenna */}
              <div className="relative w-32 h-14 mx-auto -mb-2 pointer-events-none" aria-hidden="true">
                <div className="absolute bottom-0 start-1/2 w-1 h-12 bg-gradient-to-t from-slate-700 to-slate-400 -translate-x-1/2 -rotate-25 origin-bottom rounded-full" />
                <div className="absolute bottom-0 start-1/2 w-1 h-12 bg-gradient-to-t from-slate-700 to-slate-400 -translate-x-1/2 rotate-25 origin-bottom rounded-full" />
                <div className="absolute top-0 start-3.5 w-2.5 h-2.5 bg-slate-200 rounded-full border border-[#18181B]" />
                <div className="absolute top-0 end-3.5 w-2.5 h-2.5 bg-slate-200 rounded-full border border-[#18181B]" />
              </div>

              {/* Monitor Chassis */}
              <div className="bg-[#DFDCD5] rounded-3xl p-5 sm:p-6 border-2 border-[#18181B]/85 shadow-[0_22px_50px_-14px_rgba(15,23,42,0.35)] relative">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Screen Window (9 Cols) */}
                  <div className="col-span-9 bg-[#12141A] rounded-2xl p-4 sm:p-6 border-2 border-[#18181B] shadow-inner min-h-[250px] flex flex-col justify-center text-start relative overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)',
                      }}
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChannel}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 text-white space-y-2.5"
                      >
                        {activeChannel === 1 && (
                          <div>
                            <div className="text-[11px] font-mono text-[#F6D35F] font-bold">
                              CH 01 · HEALTH SCORE
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mt-1">
                              {isFa ? 'شاخص سلامت ترم: ۹۲٪' : 'Semester Health: 92%'}
                            </h3>
                            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                              {isFa
                                ? 'پیش‌بینی معدل و آمادگی کامل برای آزمون‌ها قبل از رسیدن به شب امتحان.'
                                : 'Track readiness and spot slipping subjects weeks before finals.'}
                            </p>
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold inline-block">
                              {isFa ? 'وضعیت: محدوده امن ✓' : 'Status: Healthy Range ✓'}
                            </div>
                          </div>
                        )}

                        {activeChannel === 2 && (
                          <div>
                            <div className="text-[11px] font-mono text-[#60A5FA] font-bold">
                              CH 02 · FOCUS TIMER
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mt-1 tabular-nums">
                              {isFa ? 'تایمر پومودورو ۲۵:۰۰' : 'Pomodoro Timer 25:00'}
                            </h3>
                            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                              {isFa
                                ? 'مطالعه عمیق بدون حواس‌پرتی و ثبت خودکار زمان مطالعه در کارنامه درس.'
                                : 'Distraction-free study blocks synced automatically with your course metrics.'}
                            </p>
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold inline-block">
                              {isFa ? '۱۴ روز زنجیره مطالعه پیاپی' : '14-Day Continuous Study Streak'}
                            </div>
                          </div>
                        )}

                        {activeChannel === 3 && (
                          <div>
                            <div className="text-[11px] font-mono text-[#86EFAC] font-bold">
                              CH 03 · SCHEDULE &amp; EXAMS
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mt-1">
                              {isFa ? 'تقویم و فرجه‌های امتحانات' : 'Exams & Prep Countdown'}
                            </h3>
                            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                              {isFa
                                ? 'شمارش معکوس دقیق تا آزمون‌های پایان‌ترم بدون غافلگیری و تداخل.'
                                : 'Clear countdowns to midterms and finals without scheduling clashes.'}
                            </p>
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold inline-block tabular-nums">
                              {isFa ? 'آزمون میان‌ترم هوش مصنوعی: ۵ روز مانده' : 'AI Midterm: 5 days left'}
                            </div>
                          </div>
                        )}

                        {activeChannel === 4 && (
                          <div>
                            <div className="text-[11px] font-mono text-[#FCA5A5] font-bold">
                              CH 04 · CAMPUS TRADE
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mt-1">
                              {isFa ? 'بازارچه خوابگاهی و جزوات' : 'Campus Marketplace & Notes'}
                            </h3>
                            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                              {isFa
                                ? 'تبادل بی‌واسطه کتب دست‌دوم و جزوات با تحویل حضوری در محوطه دانشگاه.'
                                : 'Direct textbook and study-material exchange with campus handoff.'}
                            </p>
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold inline-block">
                              {isFa ? 'صفر درصد کارمزد واسطه‌گری' : 'Zero Middleman Commission'}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Dial Controls (3 Cols) */}
                  <div className="col-span-3 flex flex-col items-center justify-around h-full space-y-3">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-[#18181B] font-mono mb-1">TUNER</span>
                      <button
                        type="button"
                        onClick={() => setActiveChannel((prev) => (prev % 4) + 1)}
                        className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 border-2 border-[#18181B] shadow-sm active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                        aria-label={isFa ? 'تغییر کانال' : 'Switch channel'}
                        title={isFa ? 'تغییر کانال' : 'Switch channel'}
                      >
                        <div
                          className="w-1.5 h-5 bg-white rounded-full transition-transform duration-200"
                          style={{ transform: `rotate(${activeChannel * 90}deg)` }}
                        />
                      </button>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-[#18181B] font-mono mb-1">VOL</span>
                      <div className="w-8 h-8 rounded-full bg-slate-600 border border-[#18181B] shadow-inner flex items-center justify-center">
                        <div className="w-1 h-3 bg-slate-300 rounded-full rotate-45" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 w-full pt-1">
                      {[1, 2, 3, 4].map((ch) => (
                        <button
                          type="button"
                          key={ch}
                          onClick={() => setActiveChannel(ch)}
                          className={`text-[11px] font-bold py-1 rounded-md border border-[#18181B]/75 cursor-pointer transition-colors tabular-nums ${
                            activeChannel === ch
                              ? 'bg-[#F6D35F] text-[#18181B] font-black'
                              : 'bg-white hover:bg-slate-100 text-[#18181B]'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stand Feet */}
                <div className="flex items-center justify-between px-6 -mb-8 mt-4 pointer-events-none" aria-hidden="true">
                  <div className="w-6 h-4 bg-slate-800 rounded-b-md border-x border-b border-[#18181B]" />
                  <div className="w-6 h-4 bg-slate-800 rounded-b-md border-x border-b border-[#18181B]" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 7. STUDENT CONTRIBUTIONS & SAMPLE LEADERBOARD PREVIEW                     */}
        {/* ========================================================================= */}
        <section
          ref={leaderboardRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#18181B]/10 text-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-bold text-[#64748B] block mb-2">
                  {isFa ? 'پیش‌نمایش نمونه سیستم امتیازدهی' : 'SAMPLE ACHIEVEMENTS PREVIEW'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] [text-wrap:balance]">
                  {isFa ? 'دستاوردها، ثبت و محاسبه می‌شوند' : 'Contributions, Counted'}
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-[#475569] leading-[1.8]">
                {isFa
                  ? 'دانشجویانی که برای بهبود وضعیت تحصیلی خود و دیگران وقت می‌گذارند، امتیاز می‌گیرند. جلسات مطالعه ثبت‌شده، اشتراک جزوات و حل تمرین‌ها محاسبه می‌شوند.'
                  : 'Students helping each other study and organize earn verified progress points from Pomodoro logs, shared notes, and completed coursework.'}
              </p>
            </div>

            <div className="bg-[#FAF0C2] rounded-2xl border border-[#18181B]/25 shadow-[0_14px_34px_-12px_rgba(15,23,42,0.14)] overflow-hidden">
              <div className="bg-[#F4E39A] px-4 py-2.5 border-b border-[#18181B]/15 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/85" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/85" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/85" />
                  <span className="text-[11px] font-mono font-bold text-[#18181B]/70 ms-2">
                    STUDENT_LEADERBOARD_DEMO.TAB
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#5C4500]">
                  {isFa ? 'داده نمونه' : 'Sample Data'}
                </span>
              </div>

              <div className="grid grid-cols-12 px-4 py-2.5 border-b border-[#18181B]/12 text-[11px] font-bold text-[#5C4500]">
                <div className="col-span-5">{isFa ? 'دانشجو (نمونه)' : 'STUDENT (DEMO)'}</div>
                <div className="col-span-4">{isFa ? 'دستاورد تحصیلی' : 'ACHIEVEMENT'}</div>
                <div className="col-span-3 text-end">{isFa ? 'امتیاز تمرکز' : 'POINTS'}</div>
              </div>

              <div className="divide-y divide-[#18181B]/10 text-xs font-bold text-[#18181B]">
                {[
                  {
                    name: isFa ? 'آوا مرادی · کامپیوتر' : 'Ava M. · CS',
                    achievement: isFa ? 'زنجیره ۱۴ روزه مطالعه' : '14-day study streak',
                    tone: 'text-[#1D4ED8]',
                    pts: isFa ? '+۳,۲۰۰' : '+3,200',
                  },
                  {
                    name: isFa ? 'آرین رضایی · صنایع' : 'Arian R. · Industrial',
                    achievement: isFa ? 'اشتراک جزوه تایپ‌شده پایگاه داده' : 'Shared typed DB notes',
                    tone: 'text-emerald-800',
                    pts: isFa ? '+۲,۱۰۰' : '+2,100',
                  },
                  {
                    name: isFa ? 'سامان کاظمی · مکانیک' : 'Saman K. · Mechanical',
                    achievement: isFa ? 'تکمیل منظم تمرین‌های ترم' : 'Weekly assignments complete',
                    tone: 'text-indigo-800',
                    pts: isFa ? '+۵,۸۰۰' : '+5,800',
                  },
                  {
                    name: isFa ? 'رویا تهرانی · برق' : 'Roya T. · Electrical',
                    achievement: isFa ? 'نمره سلامت ترم ۹۶' : 'Semester score 96',
                    tone: 'text-amber-900',
                    pts: isFa ? '+۲,۴۳۰' : '+2,430',
                  },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 px-4 py-3.5 items-center hover:bg-black/[0.03] transition-colors gap-2"
                  >
                    <div className="col-span-5 flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-[#18181B] text-white text-[10px] flex items-center justify-center font-bold shrink-0 tabular-nums">
                        {idx + 1}
                      </span>
                      <span className="truncate">{row.name}</span>
                    </div>
                    <div className={`col-span-4 text-[11px] sm:text-xs font-semibold ${row.tone} truncate`}>
                      {row.achievement}
                    </div>
                    <div className="col-span-3 text-end font-mono font-bold text-[#18181B] tabular-nums">
                      {row.pts}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5 bg-[#F4E39A] border-t border-[#18181B]/15 text-center text-[11px] font-medium text-[#3F3100]">
                {isFa
                  ? '✓ پیش‌نمایش ساختار محاسبه امتیاز بر اساس جلسات ثبت‌شده مطالعه در تایمر پومودورو'
                  : '✓ Preview of how focus points are calculated from Pomodoro study sessions'}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 8. OWNERSHIP & CAMPUS COMMUNITY (Refined Sunlit Gold Backdrop)            */}
        {/* ========================================================================= */}
        <section
          ref={communityRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F6D666] border-b border-[#18181B]/15 relative overflow-hidden text-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#423200] tracking-wide block">
                {isFa ? 'زیست‌بوم خودگردان دانشجویی' : 'STUDENT-BUILT ECOSYSTEM'}
              </span>

              <h2 className="text-3xl sm:text-[2.65rem] font-black text-[#0F172A] leading-tight [text-wrap:balance]">
                {isFa ? 'ساخته‌شده با انرژی خود دانشجوها' : 'Powered by students'}
              </h2>

              <p className="text-[15px] sm:text-base text-[#1E293B] font-medium leading-[1.85] max-w-lg">
                {isFa
                  ? 'ترم‌یار حاصل تجربیات زیسته دانشجویانی است که طعم تلخ فراموشی فرجه‌ها و استرس گلستان را چشیده‌اند. هیچ شرکتی از بیرون دانشگاه دغدغه‌های خوابگاه و شب امتحان را به این دقت درک نمی‌کند.'
                  : 'TermYar is shaped around real student workflows — replacing scattered portal PDFs, forgotten deadlines, and exam panic with calm daily clarity.'}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-[#332700] pt-2">
                <span>{isFa ? 'کاملاً رایگان' : '100% Free'}</span>
                <span aria-hidden="true">·</span>
                <span>{isFa ? 'بدون وابستگی تجاری' : 'Zero paywalls'}</span>
                <span aria-hidden="true">·</span>
                <span>{isFa ? 'حفظ کامل حریم خصوصی' : 'Privacy First'}</span>
              </div>
            </div>

            {/* Right: Clean Student Focus Milestones (No cartoon emojis) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-sm space-y-3">
                {[
                  {
                    initials: isFa ? 'آ.م' : 'AM',
                    name: isFa ? 'آوا مرادی · پروفایل نمونه' : 'Ava M. · Sample Profile',
                    metric: isFa ? '۳۲۰+ امتیاز تمرکز' : '+320 PTS',
                    bg: 'bg-[#5CA8F2] text-white',
                  },
                  {
                    initials: isFa ? 'آ.ر' : 'AR',
                    name: isFa ? 'آرین رضایی · پروفایل نمونه' : 'Arian R. · Sample Profile',
                    metric: isFa ? '۵۰۰+ امتیاز تمرکز' : '+500 PTS',
                    bg: 'bg-[#82A77B] text-white',
                    offset: 'sm:ms-5',
                  },
                  {
                    initials: isFa ? 'س.ک' : 'SK',
                    name: isFa ? 'سامان کاظمی · پروفایل نمونه' : 'Saman K. · Sample Profile',
                    metric: isFa ? '۲۱۵+ امتیاز تمرکز' : '+215 PTS',
                    bg: 'bg-[#4F46E5] text-white',
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#18181B]/20 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.16)] transition-transform duration-200 hover:-translate-y-0.5 ${
                      card.offset ?? ''
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center font-black text-xs shrink-0`}
                    >
                      {card.initials}
                    </div>
                    <div className="text-xs font-bold text-[#0F172A] flex-1 truncate">{card.name}</div>
                    <span className="text-[11px] font-mono font-bold text-[#334155] tabular-nums shrink-0">
                      {card.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 8.5 TRUST & TRANSPARENCY FAQ SECTION                                      */}
        {/* ========================================================================= */}
        <section
          ref={faqRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] border-b border-[#18181B]/10 text-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2F5E27] bg-[#84A97D]/20 border border-[#84A97D]/40 px-3 py-1 rounded-full mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{isFa ? 'شفافیت و اعتماد دانشجویی' : 'TRUST & TRANSPARENCY'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] leading-tight [text-wrap:balance]">
                {isFa ? 'سوالات متداول پیش از شروع' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-sm sm:text-base text-[#475569] mt-2.5 max-w-xl mx-auto leading-relaxed">
                {isFa
                  ? 'پاسخ شفاف و کوتاه به مهم‌ترین دغدغه‌های دانشجویان درباره امنیت، حریم خصوصی و نحوه کار ترم‌یار.'
                  : 'Clear answers to common student questions about Golestan privacy, data storage, and pricing.'}
              </p>
            </div>

            <div className="space-y-3">
              {(isFa
                ? [
                    {
                      q: 'آیا رمز عبور یا حساب سامانه گلستان من ذخیره می‌شود؟',
                      a: 'خیر، به هیچ عنوان. ترم‌یار اصلاً نام کاربری و رمز گلستان شما را درخواست نمی‌کند. شما تنها فایل PDF گزارش ۸۸ یا تصویر برنامه هفتگی را انتخاب می‌کنید و پردازش آن به‌صورت کاملاً محلی در مرورگر خودتان انجام می‌شود.',
                    },
                    {
                      q: 'اطلاعات درسی، تکالیف و جزوه‌های من کجا نگهداری می‌شوند؟',
                      a: 'تمام داده‌های تحصیلی شما (برنامه کلاسی، تکالیف، تاریخ امتحانات، لاگ‌های مطالعه و فایل‌های PDF بانک جزوات) به‌صورت مستقیم در حافظه مرورگر دستگاه خودتان (Local Storage و IndexedDB) ذخیره می‌شوند و به هیچ سرور ثالثی ارسال نمی‌گردند.',
                    },
                    {
                      q: 'آیا استفاده از ترم‌یار رایگان است؟',
                      a: 'بله. تمام امکانات اصلی ترم‌یار شامل استخراج هوشمند برنامه گلستان، برنامه هفتگی، تایمر پومودورو، محاسبه‌گر نمره سلامت ترم، خروجی تصویر برنامه و تقویم امتحانات (.ics) برای دانشجویان کاملاً رایگان است.',
                    },
                    {
                      q: 'اگر فایل PDF یا اسکرین‌شات برنامه گلستان بدخط یا به‌هم‌ریخته باشد چه می‌شود؟',
                      a: 'موتور پردازش ترم‌یار حروف یونیکد قدیمی خروجی‌های گلستان را به‌صورت خودکار استانداردسازی می‌کند، کلاس‌های هر روز را از صبح به عصر مرتب می‌چیند و پیش از ثبت نهایی یک جدول قابل ویرایش در اختیارتان می‌گذارد.',
                    },
                    {
                      q: 'آیا می‌توانم برنامه هفتگی و امتحانات را روی گوشی و گوگل کلندر هم داشته باشم؟',
                      a: 'بله. در بخش برنامه هفتگی می‌توانید با یک کلیک «خروجی عکس تمیز» بگیرید و در گالری گوشی ذخیره کنید، و در بخش امتحانات با «خروجی تقویم (.ics)» کل امتحانات ترم را همراه با یادآور به Google Calendar اضافه کنید.',
                    },
                  ]
                : [
                    {
                      q: 'Does TermYar store my university portal password?',
                      a: 'Never. TermYar never asks for your portal login credentials. You only upload your exported Report 88 PDF or schedule screenshot, and all extraction runs locally inside your browser.',
                    },
                    {
                      q: 'Where are my courses, tasks, and PDF notes stored?',
                      a: 'All of your academic data — timetables, deadlines, study logs, and uploaded PDFs — stay locally on your own device via browser LocalStorage and IndexedDB, with zero third-party tracking.',
                    },
                    {
                      q: 'Is TermYar free for students?',
                      a: 'Yes. All core features including Golestan PDF extraction, weekly timetable sorting, PNG image export, .ics exam calendar export, Pomodoro focus timer, and Semester Health diagnostics are 100% free.',
                    },
                    {
                      q: 'Can I save my weekly schedule to my phone or Google Calendar?',
                      a: 'Yes! Export a crisp, gallery-ready PNG poster from the Weekly Schedule tab, or export your exam dates as a standard .ics calendar file with automatic reminders for Google Calendar.',
                    },
                  ]
              ).map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#18181B]/30 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.12)]'
                        : 'bg-white/75 hover:bg-white border-[#18181B]/12'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-start cursor-pointer"
                    >
                      <span className="font-extrabold text-sm sm:text-base text-[#0F172A] leading-snug">
                        {item.q}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-xl border border-[#18181B]/15 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'bg-[#F6D35F] text-[#18181B] rotate-180' : 'bg-[#FAF8F3] text-[#475569]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-[#475569] leading-[1.9] border-t border-[#18181B]/8 mt-0.5 pt-3.5">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 9. PRE-FOOTER & AUTHENTIC STUDY GROUP FINALE                              */}
        {/* ========================================================================= */}
        <section
          ref={ctaRef}
          className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <span className="text-xs font-bold text-[#64748B] tracking-wide block mb-3">
              {isFa ? 'آغاز یک ترم پربار و منظم' : 'START YOUR ORGANIZED SEMESTER'}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] leading-tight mb-4 [text-wrap:balance]">
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

            <p className="max-w-lg mx-auto text-[15px] sm:text-base text-[#475569] font-medium leading-[1.85] mb-8">
              {isFa
                ? 'همین امروز ترم جدیدت را با استخراج هوشمند برنامه، پایش وضعیت دروس و تایمر تمرکز شروع کن و استرس شب امتحان را به تجربه‌ای منظم تبدیل کن.'
                : 'Organize your semester with intelligent schedule sync, health tracking, and zero distraction.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button
                type="button"
                onClick={onLaunchApp}
                className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-extrabold bg-[#F6D35F] hover:bg-[#F1C843] text-[#18181B] border border-[#18181B]/80 shadow-[0_8px_22px_-6px_rgba(24,24,27,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{isFa ? 'ورود به سامانه ترم‌یار' : 'Launch TermYar App'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={triggerConfetti}
                className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold bg-white hover:bg-[#F4F1EA] text-[#18181B] border border-[#18181B]/20 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <PartyPopper className="w-4 h-4 text-amber-500" />
                <span>{isFa ? 'جشن و پرتاب کاغذ رنگی!' : 'Celebrate Confetti'}</span>
              </button>
            </div>

            {/* Editorial Brand Signature */}
            <div className="my-8">
              <div className="text-4xl sm:text-7xl font-black tracking-tight text-[#0F172A] select-none">
                {isFa ? 'TERMYAR · ترم‌یار' : 'TERMYAR'}
              </div>
              <div className="text-xs font-medium text-[#64748B] mt-2">
                {isFa
                  ? 'پلتفرم زیست‌بوم دانشجویی و پایش سلامت تحصیلی'
                  : 'Student Academic Ecosystem & Semester Health Platform'}
              </div>
            </div>

            {/* Authentic Library Study Group Photography */}
            <figure className="max-w-2xl mx-auto pt-4">
              <div className="rounded-2xl overflow-hidden border border-[#18181B]/12 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.2)] bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientPhoto
                    src={libraryGroupImg}
                    alt={
                      isFa
                        ? 'گروهی از دانشجویان در حال مطالعه مشترک و گفتگو دور میز کتابخانه دانشگاه'
                        : 'Group of university students collaborating around a library study table'
                    }
                    fallbackTitle={isFa ? 'همراهی در مسیر تحصیل' : 'Collaborative Campus Study'}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </figure>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 10. QUIET SAGE FOOTER RIBBON                                              */}
        {/* ========================================================================= */}
        <footer className="bg-[#84A97D] text-[#0F172A] py-4 px-4 sm:px-8 border-t border-[#18181B]/15 text-xs font-bold">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection(howItWorksRef)}
                className="hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'نحوه کارکرد' : 'Workflow'}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(whyUsRef)}
                className="hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'امکانات' : 'Features'}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(leaderboardRef)}
                className="hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'دستاوردها' : 'Achievements'}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(faqRef)}
                className="hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'سوالات متداول' : 'FAQ'}
              </button>
            </div>

            <div className="text-center text-[11px] font-medium">
              © {new Date().getFullYear()} TermYar (ترم‌یار) ·{' '}
              {isFa ? 'ساخته‌شده برای دانشجویان دانشگاه‌ها' : 'Built for University Students'}
            </div>

            <div className="flex items-center gap-4">
              {onOpenDossier && (
                <button
                  type="button"
                  onClick={onOpenDossier}
                  className="hover:underline cursor-pointer whitespace-nowrap"
                >
                  {isFa ? 'پرونده تحلیلی' : 'Dossier'}
                </button>
              )}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'بازگشت به بالا' : 'Back to top'}
              </button>
              <button
                type="button"
                onClick={onLaunchApp}
                className="font-black hover:underline cursor-pointer whitespace-nowrap"
              >
                {isFa ? 'داشبورد' : 'Dashboard'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
};
