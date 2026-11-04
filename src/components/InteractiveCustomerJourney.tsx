import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Clock,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface JourneyStage {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  campusStep: string;
  appStep: string;
  frictionPoint: string;
  solution: string;
  conversionKPI: string;
  quote: string;
}

export const InteractiveCustomerJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const stages: JourneyStage[] = [
    {
      id: 1,
      title: '۱. آگاهی و ورود به دانشگاه',
      subtitle: 'ورود به ترم جدید و انتخاب واحد',
      icon: Compass,
      color: 'indigo',
      campusStep: 'دانشجو در راهروهای دانشکده سردرگم میان برگه‌های پرینت‌شده انتخاب واحد و تغییرات اتاق کلاس‌ها است.',
      appStep: 'مشاهده پوستر یا پیام در گروه تلگرامی ورودی؛ اسکن QR کد و ورود مستقیم به وب‌اپلیکیشن ترمیار بدون نیاز به نصب.',
      frictionPoint: 'بی‌اعتمادی به ابزارهای جدید یا ترس از ثبت اطلاعات هویتی و شماره دانشجویی.',
      solution: 'ثبت‌نام بدون رمز با کد تایید یا حالت مهمان با داده‌های نمونه؛ مشاهده آنی امکانات در کمتر از ۳۰ ثانیه.',
      conversionKPI: 'نرخ تکمیل ثبت‌نام اولیه (Signup Completion): بالای ۷۲٪.',
      quote: '«توی شلوغی انتخاب واحد، پوستر ترمیار رو روی در انجمن دیدم و ۳ دقیقه‌ای برنامه کلاسی رو وارد کردم.»'
    },
    {
      id: 2,
      title: '۲. چینش برنامه و ثبت دروس',
      subtitle: 'پایه‌ریزی کابین خلبانی ترم',
      icon: Calendar,
      color: 'blue',
      campusStep: 'چسباندن کاغذ برنامه هفتگی روی دیوار اتاق خوابگاه یا ذخیره اسکرین‌شات بی‌کیفیت در گالری گوشی.',
      appStep: 'ورود نام درس، استاد، روز و ساعت در تقویم تعاملی ترمیار؛ نمایش زمان‌بندی هفتگی با تم رنگی و تفکیک آزمایشگاه.',
      frictionPoint: 'سختی تایپ نام دروس و اساتید در ابتدای ترم روی کیبورد گوشی.',
      solution: 'پیش‌بینی و قالب‌های آماده دروس عمومی و اختصاصی هر رشته با امکان درون‌ریزی سریع در یک لمس.',
      conversionKPI: 'ثبت حداقل ۴ درس در ۴۸ ساعت اول: بالای ۶۵٪.',
      quote: '«اولین باری بود که تقویم شنبه تا چهارشنبه رو درست و حسابی بدون قاطی شدن کلاس‌ها دیدم.»'
    },
    {
      id: 3,
      title: '۳. جریان کاری روزانه و تمرکز',
      subtitle: 'مدیریت تکالیف و ساعات پومودورو',
      icon: Clock,
      color: 'cyan',
      campusStep: 'نشستن در سالن مطالعه با حواس‌پرتی و اتلاف وقت مداوم در شبکه‌های اجتماعی.',
      appStep: 'روشن کردن تایمر ۲۵ دقیقه‌ای پومودورو ترمیار؛ پخش نوای تمرکز و ثبت استریک مطالعه؛ علامت‌زدن تکالیف تحویل‌شده.',
      frictionPoint: 'خروج از برنامه هنگام قفل شدن گوشی و فراموشی ثبت دقایق مطالعه.',
      solution: 'پشتیبانی از نوتیفیکیشن مرورگر، صدای پایان زنگ و ذخیره‌سازی آفلاین حتی در بی‌اینترنتی سالن مطالعه.',
      conversionKPI: 'میانگین ۱۲ جلسه پومودورو تکمیل‌شده در هفته به ازای هر کاربر فعال.',
      quote: '«تایمر ترمیار باعث شد توی کتابخونه گوشی رو کنار بذارم و برای اولین بار تکالیف رو زودتر از ددلاین بفرستم.»'
    },
    {
      id: 4,
      title: '۴. معامله در بازارچه خوابگاهی',
      subtitle: 'خرید، فروش و امانت جزوه و کتاب',
      icon: ShoppingBag,
      color: 'emerald',
      campusStep: 'پیام دادن در صدها گروه شلوغ تلگرامی و خطر کلاهبرداری یا عدم تحویل کتاب در زمان مقرر.',
      appStep: 'جستجوی کتاب مدنظر در بازارچه محلی دانشگاه خود؛ گفتگو یا توافق سریع؛ تحویل حضوری در لابی خوابگاه یا دانشکده.',
      frictionPoint: 'ترس از بدقولی خریدار یا کیفیت نامناسب برگه‌های جزوه.',
      solution: 'پیش‌نمایش عکس‌های واقعی جزوه، نشان تایید هویت خوابگاهی و شماره اتاق برای تحویل بی‌واسطه.',
      conversionKPI: 'نرخ موفقیت معامله (Transaction Success): بالای ۸۸٪.',
      quote: '«کتاب ریاضی استوارت سال بالایی رو به نصف قیمت میدون انقلاب توی لابی خوابگاه تحویل گرفتم.»'
    },
    {
      id: 5,
      title: '۵. شب امتحان و ماندگاری پایدار',
      subtitle: 'محاسبه نمرات و معرفی به دوستان',
      icon: Heart,
      color: 'rose',
      campusStep: 'اضطراب شدید شب امتحان، محاسبه دستی معدل با ماشین‌حساب و جستجوی نمونه سوال در ساعات پایانی شب.',
      appStep: 'بررسی شاخص سلامت ترم، گزارش تحلیلی ساعات مطالعه و شبیه‌ساز معدل؛ اشتراک کارت موفقیت در استوری و معرفی ترمیار.',
      frictionPoint: 'احساس پایان کار با اتمام ترم و عدم بازگشت تا ترم بعد.',
      solution: 'پیش‌بینی برنامه ترم آینده، آرشیو فایل‌ها و ارائه اعتبار درون‌برنامه‌ای برای خرید منابع ترم بعد.',
      conversionKPI: 'نرخ بازگشت به ترم بعد (Term-over-Term Retention): بالای ۷۵٪.',
      quote: '«وقتی معدلم ۱۸.۶ شد و نمودار سلامت ترمم سبز موند، لینک ترمیار رو برای کل بچه‌های گروهمون فرستادم.»'
    }
  ];

  const current = stages.find((s) => s.id === activeStep) || stages[0];
  const StepIcon = current.icon;

  return (
    <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0A0F1D] via-[#0E1529] to-[#0A0E1A] border border-slate-700/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              مسیر تعاملی چرخه حیات دانشجو (Student Customer Journey Map)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            از نخستین مواجهه در راهروهای پردیس تا تبدیل شدن به کاربر وفادار و مروج، گام‌های ۵گانه را لمس کنید.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activeStep === 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-700 transition-colors"
            title="گام قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-300 px-2">
            {activeStep} از ۵
          </span>
          <button
            type="button"
            disabled={activeStep === 5}
            onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-700 transition-colors"
            title="گام بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-Step Visual Stepper Bar */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isSelected = stage.id === activeStep;
          const isCompleted = stage.id < activeStep;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStep(stage.id)}
              className={`p-2 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 sm:gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-500/30 shadow-md'
                  : isCompleted
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-500 hover:text-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-indigo-500 text-white'
                    : isCompleted
                    ? 'bg-slate-700 text-indigo-300'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold truncate max-w-full">
                {stage.title.split('.')[1] || stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        {/* Title and Quote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                {current.title}
              </h4>
              <p className="text-xs text-indigo-300 mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>
          <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
            {current.conversionKPI}
          </div>
        </div>

        {/* Real Student Quote */}
        <div className="p-3 rounded-xl bg-white/[0.02] border-r-2 border-indigo-500 text-xs italic text-slate-300">
          {current.quote}
        </div>

        {/* Comparison Grid: Offline Campus vs Online App */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Offline Physical Campus Action */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>محیط فیزیکی دانشگاه و خوابگاه (آفلاین):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.campusStep}
            </p>
          </div>

          {/* Online Digital App Action */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>پلتفرم نرم‌افزاری ترم‌یار (آنلاین):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.appStep}
            </p>
          </div>
        </div>

        {/* Friction Point and Friction Killer Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
            <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>نقطه اصطکاک و دغدغه ذهنی دانشجو:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.frictionPoint}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>راهکار ترمیار برای حذف اصطکاک (Friction Killer):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.solution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
