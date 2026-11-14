import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Users,
  Target,
  Layers,
  Sparkles,
  Calculator,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const InteractiveMarketEconomics: React.FC = () => {
  // Sliders for dynamic financial modeling
  const [activeUsers, setActiveUsers] = useState<number>(25000); // 5,000 to 100,000
  const [proConversionRate, setProConversionRate] = useState<number>(4.5); // 1% to 10%
  const [proPriceToman, setProPriceToman] = useState<number>(29000); // 15,000 to 50,000 Tomans
  const [marketplaceTransactionsPerUser, setMarketplaceTransactions] = useState<number>(0.2); // avg items per semester

  // Computations
  const proSubscribers = Math.round(activeUsers * (proConversionRate / 100));
  const monthlySubscriptionRevenue = proSubscribers * proPriceToman;
  const annualSubscriptionRevenue = monthlySubscriptionRevenue * 9; // 9 academic active months

  // Marketplace fee: assume average item value = 120,000 Tomans, fee = 4% = 4,800 Tomans
  const totalMarketplaceItemsMonthly = Math.round(activeUsers * (marketplaceTransactionsPerUser / 3));
  const monthlyMarketplaceFeeRevenue = totalMarketplaceItemsMonthly * 4800;
  const annualMarketplaceRevenue = monthlyMarketplaceFeeRevenue * 9;

  const totalMonthlyGross = monthlySubscriptionRevenue + monthlyMarketplaceFeeRevenue;
  const totalAnnualGross = annualSubscriptionRevenue + annualMarketplaceRevenue;

  // Infrastructure cost estimation: Serverless hosting (~1,500 Toman/user/year) + SMS verification
  const annualInfrastructureCost = Math.round(activeUsers * 2200);
  const netAnnualMargin = totalAnnualGross - annualInfrastructureCost;
  const marginPercentage = totalAnnualGross > 0 ? Math.round((netAnnualMargin / totalAnnualGross) * 100) : 0;

  return (
    <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#090D1A] dark:via-[#0E1528] dark:to-[#0A0E1A] border border-emerald-200 dark:border-emerald-500/30 shadow-lg dark:shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              اندازه بازار (TAM/SAM/SOM) و مدل‌ساز درآمدهای پایدار (Unit Economics)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            ارزیابی تحلیلی پتانسیل تجاری در آموزش عالی ایران و شبیه‌سازی درآمدهای ناخالص اشتراک و کارمزد.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 self-start sm:self-auto">
          ارقام بر حسب تومان در سال تحصیلی
        </div>
      </div>

      {/* TAM / SAM / SOM Concentric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* TAM */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-transparent">
              کل بازار در دسترس (TAM)
            </span>
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ۳,۲۰۰,۰۰۰
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            کل جمعیت دانشجویان دانشگاه‌های دولتی، آزاد، پیام‌نور و غیرانتفاعی سراسر کشور.
          </p>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>سقف نهایی مقیاس‌پذیری</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">۱۰۰٪ بازار</span>
          </div>
        </div>

        {/* SAM */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-500/30 relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-transparent">
              بازار قابل دسترس مستقیم (SAM)
            </span>
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-900 dark:text-indigo-200 font-mono">
            ۱,۱۰۰,۰۰۰
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            دانشجویان دوره‌های کارشناسی و ارشد دانشگاه‌های دولتی و واحدهای جامع با نرخ اقامت خوابگاهی بالا.
          </p>
          <div className="pt-2 border-t border-indigo-200/70 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>بخش پربازده و متمرکز</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">۳۴.۳٪ از کل TAM</span>
          </div>
        </div>

        {/* SOM */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900/90 border border-emerald-300 dark:border-emerald-500/40 relative overflow-hidden space-y-2 ring-1 ring-emerald-500/15 dark:ring-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
              هدف فاز اول پرتاب (SOM)
            </span>
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
            ۱۱۰,۰۰۰
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
            دانشجویان دانشگاه‌های تهران، صنعتی شریف، امیرکبیر، علم‌وصنعت و شهید بهشتی در پایلوت نخست.
          </p>
          <div className="pt-2 border-t border-emerald-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            <span>سهم هدف سال اول</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">۱۰٪ از بازار SAM</span>
          </div>
        </div>
      </div>

      {/* Interactive Revenue & Unit Economics Simulator */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            شبیه‌ساز تعاملی جریان‌های درآمدی و حاشیه سود ناخالص:
          </h4>
        </div>

        {/* 3 Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Slider 1: Active Users */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">تعداد کاربران فعال سال اول:</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {activeUsers.toLocaleString('fa-IR')} کاربر
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={activeUsers}
              onChange={(e) => setActiveUsers(Number(e.target.value))}
              className="w-full accent-emerald-600 dark:accent-emerald-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۵,۰۰۰</span>
              <span>۵۰,۰۰۰</span>
              <span>۱۰۰,۰۰۰</span>
            </div>
          </div>

          {/* Slider 2: PRO Conversion */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">نرخ تبدیل به اشتراک PRO:</span>
              <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400">
                {proConversionRate}٪
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={proConversionRate}
              onChange={(e) => setProConversionRate(Number(e.target.value))}
              className="w-full accent-indigo-600 dark:accent-indigo-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۱٪ (بدبینانه)</span>
              <span>۴.۵٪ (مبنا)</span>
              <span>۱۰٪ (خوش‌بینانه)</span>
            </div>
          </div>

          {/* Slider 3: Monthly PRO Price */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">قیمت اشتراک ماهیانه PRO:</span>
              <span className="font-mono font-bold text-cyan-700 dark:text-cyan-400">
                {proPriceToman.toLocaleString('fa-IR')} تومان
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={50000}
              step={2000}
              value={proPriceToman}
              onChange={(e) => setProPriceToman(Number(e.target.value))}
              className="w-full accent-cyan-600 dark:accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>۱۵,۰۰۰ ت</span>
              <span>۲۹,۰۰۰ ت</span>
              <span>۵۰,۰۰۰ ت</span>
            </div>
          </div>
        </div>

        {/* Calculated Financial Dashboard Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Monthly MRR */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">درآمد ماهانه پایدار (MRR):</span>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono mt-1">
              {Math.round(totalMonthlyGross / 1000000).toLocaleString('fa-IR')} میلیون ت
            </div>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 block">
              {proSubscribers.toLocaleString('fa-IR')} کاربر پولی فعال
            </span>
          </div>

          {/* Annual ARR */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">درآمد ناخالص سال تحصیلی (ARR):</span>
            <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono mt-1">
              {Math.round(totalAnnualGross / 1000000).toLocaleString('fa-IR')} میلیون ت
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-semibold mt-0.5 block">
              ۹ ماه فعالیت تحصیلی
            </span>
          </div>

          {/* Infrastructure Cost */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">هزینه زیرساخت و پیامک:</span>
            <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 font-mono mt-1">
              {Math.round(annualInfrastructureCost / 1000000).toLocaleString('fa-IR')} میلیون ت
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              میانگین ۲,۲۰۰ ت به ازای هر کاربر
            </span>
          </div>

          {/* Net Margin */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-950 border border-emerald-300 dark:border-emerald-500/30">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">سود ناخالص عملیاتی سالانه:</span>
            <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono mt-1">
              {Math.round(netAnnualMargin / 1000000).toLocaleString('fa-IR')} میلیون ت
            </div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 block">
              حاشیه سود: {marginPercentage}٪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
