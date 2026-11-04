import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Compass,
  HeartHandshake,
  DollarSign,
  Cpu,
  CheckCircle,
  Network,
  CreditCard,
  ChevronLeft,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CanvasBlock {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
  bulletPoints: string[];
  offlineReality: string;
  onlineRole: string;
  kpi: string;
  riskPoint: string;
}

export const InteractiveBusinessModelCanvas: React.FC = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('vp');

  const canvasBlocks: CanvasBlock[] = [
    {
      id: 'kp',
      title: 'شرکای کلیدی (Key Partners)',
      subtitle: 'نهادها و بازیگران تسهیل‌کننده رشد',
      icon: Network,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      badge: 'پایدارسازی اکوسیستم',
      bulletPoints: [
        'انجمن‌های علمی دانشجویی دانشکده‌ها (برای معرفی و تولید محتوا)',
        'شوراهای صنفی و سرپرستی خوابگاه‌ها (برای تسهیل نقاط تحویل کالا)',
        'انتشارات و زیراکس‌های مجاور دانشگاه (برای تبدیل فایل به جزوه چاپی)',
        'نمایندگان کلاسی (نماینده ورودی برای هماهنگی برنامه‌های کلاسی)'
      ],
      offlineReality: 'جلسات حضوری با دبیران انجمن‌ها و نصب پوسترهای QR در بردهای خوابگاه و دانشکده.',
      onlineRole: 'پنل مدیریت اختصاصی برای اعتبارسنجی ارائه‌دهندگان جزوه و تخفیف‌های گروهی.',
      kpi: 'جذب دست‌کم ۳ انجمن علمی فعال در هر دانشکده هدف در ماه اول لانچ.',
      riskPoint: 'تغییر سالانه اعضای تشکل‌ها و لزوم بازآفرینی روابط در شروع هر سال تحصیلی.'
    },
    {
      id: 'ka',
      title: 'فعالیت‌های کلیدی (Key Activities)',
      subtitle: 'عملیات روزمره حفظ و ارتقای محصول',
      icon: CheckCircle,
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
      badge: 'عملیات جاری',
      bulletPoints: [
        'توسعه مداوم قابلیت‌های وب‌اپلیکیشن و همگام‌سازی آفلاین',
        'مدیریت و نظارت بر امنیت معاملات بازارچه و بررسی شکایات',
        'به‌روزرسانی تقویم‌های آموزشی دانشگاه‌های سراسری و آزاد',
        'تولید محتوای آموزشی و ویدیوهای راهنمای استفاده سریع'
      ],
      offlineReality: 'پاسخگویی به موارد ابهام در تحویل کالا در محیط پردیس دانشگاه.',
      onlineRole: 'سیستم ثبت خودکار لاگ‌های مطالعه، مدیریت صف تراکنش‌ها و بک‌آپ ابری.',
      kpi: 'نرخ در دسترس بودن سامانه (Uptime) بالاتر از ۹۹.۸٪ به‌ویژه در ایام امتحانات.',
      riskPoint: 'بار ترافیکی سنگین همزمان در بازه انتخاب واحد و هفته‌های پایان‌ترم.'
    },
    {
      id: 'kr',
      title: 'منابع کلیدی (Key Resources)',
      subtitle: 'دارایی‌های اساسی برای اجرای مدل',
      icon: Cpu,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
      badge: 'زیرساخت و دارایی',
      bulletPoints: [
        'پایگاه داده ساخت‌یافته سرفصل‌های دانشگاهی و دروس عمومی و تخصصی',
        'هسته نرم‌افزاری وب‌اپلیکیشن PWA با معماری آفلاین و واکنش‌گرا',
        'برند ترمیار و اعتماد متقابل در جمع‌های دانشجویی',
        'تیم فنی و توسعه محصول با درک عمیق از زیست دانشجویی'
      ],
      offlineReality: 'سفیران برند مستقر در خوابگاه‌ها و پردیس‌های هدف.',
      onlineRole: 'سرویس‌دهنده‌های Vercel Edge، سیستم کش محلی IndexedDB و CDN فونت فارسی.',
      kpi: 'پوشش ۱۰۰ درصدی سرفصل‌های دروس پایه و عمومی در فاز نخست پایلوت.',
      riskPoint: 'وابستگی به سرورهای خارجی در شرایط اختلال اینترنت و اهمیت قابلیت آفلاین.'
    },
    {
      id: 'vp',
      title: 'ارزش پیشنهادی (Value Propositions)',
      subtitle: 'هسته حل مسئله و تمایز رقابتی',
      icon: Sparkles,
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/30',
      badge: 'قلب کسب‌وکار',
      bulletPoints: [
        'کابین خلبانی یکپارچه: خداحافظی با سردرگمی میان تقویم گوشی، دفترچه، پیام‌رسان‌ها و اکسل',
        'شاخص هوشمند سلامت ترم: تحلیل بصری و اخطار زودهنگام خطر مشروطی یا انباشت تکالیف',
        'بازارچه بدون کمیسیون واسطه‌گری: خرید و فروش امن جزوه و کتاب در ۵ دقیقه‌ای خوابگاه',
        'دسترسی آفلاین دائمی: مشاهده برنامه کلاسی و تکالیف حتی بدون اینترنت در کلاس درس'
      ],
      offlineReality: 'آرامش روانی دانشجو در راهروهای دانشکده و حذف سردرگمی در زمان‌بندی تحویل پروژه‌ها.',
      onlineRole: 'تجربه کاربری نرم و سریع، تایمر اختصاصی پومودورو با موسیقی‌های لوفای و تم شب.',
      kpi: 'نرخ بازگشت روزانه (DAU/MAU) بالاتر از ۳۵٪ و رضایت دانشجویی بالاتر از ۴.۶ از ۵.',
      riskPoint: 'ساده‌انگاری ارزش و تلقی محصول صرفاً به‌عنوان یک «تودولیست» معمولی توسط کاربر.'
    },
    {
      id: 'cr',
      title: 'ارتباط با مشتری (Customer Relationships)',
      subtitle: 'سبک تعامل و ایجاد وفاداری پایدار',
      icon: HeartHandshake,
      color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
      badge: 'وفادارسازی',
      bulletPoints: [
        'جامعه‌محور و سلف‌سرویس بدون تشریفات اداری و پیچیدگی',
        'گیمیفیکیشن و ثبت پیوستگی مطالعه (Study Streak) و پاداش استمرار',
        'پشتیبانی تلگرامی سریع با لحن همدلانه و دانشجویی',
        'نشان‌های اعتباری در بازارچه (تأیید خوابگاه، امتیاز خریداران)'
      ],
      offlineReality: 'گفتگوهای ارگانیک دانشجویان در بوفه و اتاق‌های خوابگاه درباره رکورد پومودورو.',
      onlineRole: 'سیستم امتیازدهی شفاف، اعلان‌های نرم‌افزاری و پیشنهادهای شخصی‌سازی‌شده.',
      kpi: 'نرخ ریزش ترمیک (Semester Churn) کمتر از ۱۵٪ در پایان ترم پاییز.',
      riskPoint: 'افت استفاده دانشجویان در ایام تعطیلات تابستان و بین‌دوترم.'
    },
    {
      id: 'ch',
      title: 'کانال‌ها (Channels)',
      subtitle: 'راه‌های دسترسی و رساندن ارزش',
      icon: Compass,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      badge: 'نقاط تماس',
      bulletPoints: [
        'وب‌اپلیکیشن مستقل (PWA) قابل نصب روی اندروید و آیفون بدون اپ‌استور',
        'کانال‌ها و سوپرگروه‌های تلگرامی دانشکده‌ها و ورودی‌ها',
        'کدهای QR چسبانده‌شده در لابی خوابگاه‌ها، سالن مطالعه و بوفه',
        'بازاریابی دهان‌به‌دهان (Viral Referral) از طریق اشتراک جزوات'
      ],
      offlineReality: 'بروشورهای مینیمال روی میز سلف‌سرویس و بنرهای کوچک در بورد دانشکده.',
      onlineRole: 'لینک کوتاه اشتراک برنامه ترمی و کارت‌های بصری گزارش تحصیلی قابل استوری.',
      kpi: 'هزینه جذب هر کاربر فعال (CAC) زیر ۱۰ هزار تومان با تکیه بر رشد ارگانیک.',
      riskPoint: 'مسدود شدن احتمالی دامنه‌ها یا محدودیت‌های پیام‌رسان‌های واسط.'
    },
    {
      id: 'cs',
      title: 'بخش‌های مشتریان (Customer Segments)',
      subtitle: 'گروه‌های هدف با نیازهای تفکیک‌شده',
      icon: Users,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      badge: 'مخاطبان هدف',
      bulletPoints: [
        'دانشجویان خوابگاهی: نیاز شدید به اقلام دست‌دوم ارزان و زمان‌سنجی فشرده',
        'دانشجویان نوورود (ترم ۱ و ۲): ناآشنا با ساختار دانشگاه و نیازمند راهنمای برنامه',
        'دانشجویان سال آخر و ارشد: متقاضیان فروش منابع انباشته و نیازمند تمرکز پایان‌نامه',
        'دانشجویان شاغل/پاره‌وقت: دارای کمبود وقت و نیازمند هماهنگی دقیق ضرب‌الاجل‌ها'
      ],
      offlineReality: 'دانشجوی مضطرب در سالن مطالعه با انبوهی از جزوات نامرتب و تلفن همراه.',
      onlineRole: 'داشبورد متناسب‌سازی‌شده بر اساس سال ورود، دانشکده و خوابگاه اقامتی.',
      kpi: 'دستیابی به نسبت ۶۰٪ دانشجوی خوابگاهی و ۴۰٪ غیرخوابگاهی در فاز نخست.',
      riskPoint: 'تفاوت شدید فرهنگ تحصیلی میان رشته‌های فنی، پزشکی و علوم انسانی.'
    },
    {
      id: 'cst',
      title: 'ساختار هزینه‌ها (Cost Structure)',
      subtitle: 'هزینه‌های ثابت و متغیر راهبری سیستم',
      icon: CreditCard,
      color: 'from-slate-500/20 to-zinc-500/10 border-slate-500/30 text-slate-300',
      badge: 'مصارف مالی',
      bulletPoints: [
        'هزینه زیرساخت ابری سرور، دیتابیس و پشتیبان‌گیری دوره‌ای',
        'هزینه پیامک احراز هویت دانشجویی (SMS Gateway)',
        'پاداش و تخفیف‌های ویژه برای سفیران دانشجویی در خوابگاه‌ها',
        'هزینه‌های متفرقه چاپ برچسب‌ها و تبلیغات محیطی دانشکده‌ای'
      ],
      offlineReality: 'تسویه حساب نقدی یا پاداش هدیه با سفیران خوابگاهی.',
      onlineRole: 'مدیریت بهینه سرورهای بدون سرور (Serverless) برای حداقل‌سازی مصرف منابع.',
      kpi: 'نگه‌داشتن هزینه ابری هر کاربر زیر ۲,۵۰۰ تومان در سال.',
      riskPoint: 'افزایش ناگهانی تعرفه‌های پیامک احراز هویت و ارائه‌دهندگان سرور.'
    },
    {
      id: 'rs',
      title: 'جریان‌های درآمدی (Revenue Streams)',
      subtitle: 'مدل‌های کسب درآمد مستقیم و مکمل',
      icon: DollarSign,
      color: 'from-emerald-600/20 to-green-600/10 border-emerald-500/40 text-emerald-300 ring-1 ring-emerald-500/20',
      badge: 'پایداری مالی',
      bulletPoints: [
        'اشتراک نسخه پیشرفته (TermYar PRO): فضای ابری بیشتر، تحلیل‌های آماری پیشرفته',
        'کارمزد امن معاملات P2P بازارچه (۴ تا ۵ درصد از فروشنده اقلام پرارزش)',
        'تبلیغات هم‌راستا: معرفی دوره‌های مهارت‌آموزی، کتاب‌های ناشران مرجع و آزمون‌ها',
        'همکاری فروش (Affiliate): پورسانت ارجاع به پلتفرم‌های پرینت و ارسال بسته'
      ],
      offlineReality: 'تخفیف‌های توافقی با کتابفروشی‌های محلی میدان انقلاب و اطراف پردیس.',
      onlineRole: 'درگاه پرداخت شاپرکی و شارژ کیف پول درون‌برنامه‌ای.',
      kpi: 'تحقق درآمد میانگین به ازای هر کاربر (ARPU) معادل ۳۵,۰۰۰ تومان در هر ترم تحصیلی.',
      riskPoint: 'حساسیت دانشجویان به پرداخت هزینه مستقیم و ضرورت حفظ پلن رایگان قدرتمند.'
    }
  ];

  const activeBlock = canvasBlocks.find((b) => b.id === selectedBlockId) || canvasBlocks[3];
  const IconComponent = activeBlock.icon;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              بوم تعاملی مدل کسب‌وکار استروالدر (Business Model Canvas)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            برای بررسی عمیق هر یک از ۹ مؤلفه حیاتی مدل کسب‌وکار ترم‌یار، روی کارت مربوطه کلیک کنید.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">بلوک فعال:</span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {activeBlock.title.split(' ')[0]} {activeBlock.title.split(' ')[1]}
          </span>
        </div>
      </div>

      {/* 9-Block Osterwalder Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {/* Row 1 & 2 Combined */}
        {/* Key Partners (col-span-2) */}
        <button
          type="button"
          onClick={() => setSelectedBlockId('kp')}
          className={`col-span-1 md:col-span-2 lg:col-span-2 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
            selectedBlockId === 'kp'
              ? 'bg-slate-800/90 border-blue-400 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                شرکای کلیدی
              </span>
              <Network className="w-4 h-4 text-blue-400" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1.5">Key Partners</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
              انجمن‌های علمی، شوراهای صنفی خوابگاه‌ها، انتشارات دانشگاه و نمایندگان کلاسی.
            </p>
          </div>
          <div className="mt-3 text-[10px] text-blue-400 flex items-center gap-1 font-semibold">
            <span>بررسی جزئیات</span>
            <ChevronLeft className="w-3 h-3" />
          </div>
        </button>

        {/* Column 2: Key Activities & Key Resources (col-span-2) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-3">
          {/* Key Activities */}
          <button
            type="button"
            onClick={() => setSelectedBlockId('ka')}
            className={`flex-1 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
              selectedBlockId === 'ka'
                ? 'bg-slate-800/90 border-indigo-400 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  فعالیت‌های کلیدی
                </span>
                <CheckCircle className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Key Activities</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                توسعه PWA، نظارت بر بازارچه و به‌روزرسانی تقویم‌ها.
              </p>
            </div>
            <div className="mt-2 text-[10px] text-indigo-400 flex items-center gap-1 font-semibold">
              <span>مشاهده</span>
              <ChevronLeft className="w-3 h-3" />
            </div>
          </button>

          {/* Key Resources */}
          <button
            type="button"
            onClick={() => setSelectedBlockId('kr')}
            className={`flex-1 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
              selectedBlockId === 'kr'
                ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  منابع کلیدی
                </span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Key Resources</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                پایگاه دروس، موتور تقویم، معماری محلی IndexedDB و شبکه سفیران.
              </p>
            </div>
            <div className="mt-2 text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
              <span>مشاهده</span>
              <ChevronLeft className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Value Propositions (Centerpiece - col-span-2) */}
        <button
          type="button"
          onClick={() => setSelectedBlockId('vp')}
          className={`col-span-1 md:col-span-5 lg:col-span-2 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between relative overflow-hidden ${
            selectedBlockId === 'vp'
              ? 'bg-gradient-to-b from-amber-950/60 via-slate-900/90 to-slate-900 border-amber-400 ring-2 ring-amber-500/40 shadow-xl shadow-amber-500/10'
              : 'bg-gradient-to-b from-amber-950/20 to-slate-900/60 border-amber-500/30 hover:border-amber-500/60'
          }`}
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/15 rounded-full blur-xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ارزش پیشنهادی
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <h4 className="text-xs font-black text-amber-200 mb-1.5">Value Propositions</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-4">
              کابین خلبانی همه‌کاره، شاخص سلامت ترم، مبادله بدون کمیسیون جزوه و کارکرد ۱۰۰٪ آفلاین.
            </p>
          </div>
          <div className="mt-3 text-[10px] text-amber-300 flex items-center gap-1 font-bold">
            <span>هسته تمایز رقابتی</span>
            <ChevronLeft className="w-3 h-3" />
          </div>
        </button>

        {/* Column 4: Customer Relationships & Channels (col-span-2) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-3">
          {/* Customer Relationships */}
          <button
            type="button"
            onClick={() => setSelectedBlockId('cr')}
            className={`flex-1 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
              selectedBlockId === 'cr'
                ? 'bg-slate-800/90 border-rose-400 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  ارتباط با مشتری
                </span>
                <HeartHandshake className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Customer Relations</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                سلف‌سرویس خودکار، گیمیفیکیشن استریک و نشان‌های اعتباری خوابگاه.
              </p>
            </div>
            <div className="mt-2 text-[10px] text-rose-400 flex items-center gap-1 font-semibold">
              <span>مشاهده</span>
              <ChevronLeft className="w-3 h-3" />
            </div>
          </button>

          {/* Channels */}
          <button
            type="button"
            onClick={() => setSelectedBlockId('ch')}
            className={`flex-1 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
              selectedBlockId === 'ch'
                ? 'bg-slate-800/90 border-purple-400 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  کانال‌های توزیع
                </span>
                <Compass className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Channels</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                وب‌اپلیکیشن PWA، تلگرام دانشگاهی، کدهای QR خوابگاهی و معرفی دهان‌به‌دهان.
              </p>
            </div>
            <div className="mt-2 text-[10px] text-purple-400 flex items-center gap-1 font-semibold">
              <span>مشاهده</span>
              <ChevronLeft className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Customer Segments (col-span-2) */}
        <button
          type="button"
          onClick={() => setSelectedBlockId('cs')}
          className={`col-span-1 md:col-span-2 lg:col-span-2 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
            selectedBlockId === 'cs'
              ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                بخش‌های مشتریان
              </span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1.5">Customer Segments</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
              دانشجویان خوابگاهی، ترم‌اولی‌های سردرگم، سال‌آخری‌های فروشنده جزوه و شاغلان کم‌زمان.
            </p>
          </div>
          <div className="mt-3 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <span>بررسی جزئیات</span>
            <ChevronLeft className="w-3 h-3" />
          </div>
        </button>

        {/* Bottom Row: Cost Structure & Revenue Streams (5 cols each) */}
        {/* Cost Structure */}
        <button
          type="button"
          onClick={() => setSelectedBlockId('cst')}
          className={`col-span-1 md:col-span-5 lg:col-span-5 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
            selectedBlockId === 'cst'
              ? 'bg-slate-800/90 border-slate-400 ring-2 ring-slate-500/40 shadow-lg shadow-slate-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                ساختار هزینه‌ها
              </span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Cost Structure</h4>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              میزبانی سرورلس، پیامک احراز هویت دانشجویی، استیپند سفیران خوابگاهی و پشتیبانی.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-slate-300 flex items-center gap-1 font-semibold">
            <span>مشاهده ساختار مالی و مصرف بودجه</span>
            <ChevronLeft className="w-3 h-3" />
          </div>
        </button>

        {/* Revenue Streams */}
        <button
          type="button"
          onClick={() => setSelectedBlockId('rs')}
          className={`col-span-1 md:col-span-5 lg:col-span-5 p-4 rounded-2xl border text-right transition-all flex flex-col justify-between ${
            selectedBlockId === 'rs'
              ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                جریان‌های درآمدی
              </span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Revenue Streams</h4>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              اشتراک TermYar PRO، کارمزد ۴٪ بازارچه امن، محتوای آموزشی مشارکتی و افیلیت پرینت.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <span>مشاهده مدل‌های درآمدی و پایداری مالی</span>
            <ChevronLeft className="w-3 h-3" />
          </div>
        </button>
      </div>

      {/* Selected Block Deep-Dive Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-[#0D1426] to-slate-900 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeBlock.color} flex items-center justify-center shrink-0`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                {activeBlock.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeBlock.subtitle}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 self-start sm:self-auto">
            {activeBlock.badge}
          </span>
        </div>

        {/* 4 Detailed Pillars for the Selected Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Key Bullet Points */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
              مؤلفه‌های عملیاتی در اکوسیستم آموزش عالی:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeBlock.bulletPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Offline Reality vs Online Platform Layer */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
            <div>
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <span>🏫</span> واقعیت فیزیکی پردیس و خوابگاه (آفلاین):
              </span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {activeBlock.offlineReality}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                <span>💻</span> نقش فناوری و پلتفرم دیجیتال (آنلاین):
              </span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {activeBlock.onlineRole}
              </p>
            </div>
          </div>

          {/* Performance KPI */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-300">شاخص کلیدی عملکرد (Target KPI):</span>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeBlock.kpi}
              </p>
            </div>
          </div>

          {/* Risk Mitigation */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-rose-300">نقطه ریسک و راهکار کنترل بحران:</span>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeBlock.riskPoint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
