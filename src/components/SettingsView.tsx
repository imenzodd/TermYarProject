import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Timer,
  GraduationCap,
  Bell,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Check,
  Building,
  User,
  Shield,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Sparkles,
  ArrowRight,
  Sliders,
  Database,
} from 'lucide-react';
import { UserProfile } from '../types';
import { BackButton } from './BackButton';

interface SettingsViewProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  lang: 'en' | 'fa';
  setLang: (l: 'en' | 'fa') => void;
  onResetToSampleData: () => void;
  onClearAllData: () => void;
  onOpenGolestanModal?: () => void;
  onBack?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onSaveProfile,
  darkMode,
  toggleDarkMode,
  lang,
  setLang,
  onResetToSampleData,
  onClearAllData,
  onOpenGolestanModal,
  onBack,
}) => {
  const isFa = lang === 'fa';
  const [profileForm, setProfileForm] = useState<UserProfile>(user);
  const [pomodoroLength, setPomodoroLength] = useState<number>(25);
  const [shortBreakLength, setShortBreakLength] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [semesterWeeks, setSemesterWeeks] = useState<number>(15);
  const [currentWeek, setCurrentWeek] = useState<number>(7);
  const [semesterTitle, setSemesterTitle] = useState<string>('نیم‌سال اول ۱۴۰۵-۱۴۰۶');
  const [reminderClasses, setReminderClasses] = useState<boolean>(true);
  const [reminderTasks, setReminderTasks] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  const handleProfileFieldChange = (field: keyof UserProfile, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
    setIsFormDirty(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    setIsFormDirty(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      profile: user,
      timestamp: new Date().toISOString(),
      version: '2.5.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `termyar_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6 pb-24">
      {/* Top Header Bar with Standard Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName={isFa ? 'داشبورد' : 'Dashboard'}
              hasUnsavedChanges={isFormDirty}
              lang={lang}
            />
          )}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] text-white flex items-center justify-center shadow-[0_0_20px_rgba(102,58,243,0.4)] shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F1F3FA] tracking-tight flex items-center gap-2">
              <span>{isFa ? 'تنظیمات و پیکربندی سامانه' : 'Settings & Preferences'}</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#663AF3]/15 text-[#65D5FF] border border-[#663AF3]/30">
                {isFa ? 'کنترل جامع' : 'System Wide'}
              </span>
            </h1>
            <p className="text-xs text-[#A6AEC3] mt-0.5">
              {isFa
                ? 'شخصی‌سازی مشخصات دانشجو، ترم تحصیلی، زمان‌سنج مطالعه و مدیریت داده‌ها'
                : 'Customize profile, semester parameters, study intervals, and data'}
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-500/30 animate-fade-in self-start sm:self-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{isFa ? 'تنظیمات با موفقیت ذخیره شد!' : 'Settings saved!'}</span>
          </div>
        )}
      </div>

      {/* Main Responsive Grid Layout filling entire screen width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Right / Main Column (7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Student Profile Card */}
          <form onSubmit={handleSaveProfile} className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
                <User className="w-4 h-4 text-[#39A7FF]" />
                <span>{isFa ? 'مشخصات دانشجو و دانشگاه' : 'Student & Academic Profile'}</span>
              </h3>
              <span className="text-[11px] text-[#707B96]">{isFa ? 'اطلاعات هویتی' : 'Personal info'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'شماره دانشجویی' : 'Student ID'}
                </label>
                <input
                  type="text"
                  value={profileForm.studentId || ''}
                  onChange={(e) => handleProfileFieldChange('studentId', e.target.value)}
                  placeholder="مثال: ۴۰۲۲۰۵۹۳"
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] placeholder-[#707B96] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'نام دانشگاه' : 'University'}
                </label>
                <input
                  type="text"
                  value={profileForm.university}
                  onChange={(e) => handleProfileFieldChange('university', e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'رشته تحصیلی' : 'Major'}
                </label>
                <input
                  type="text"
                  value={profileForm.major}
                  onChange={(e) => handleProfileFieldChange('major', e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'خوابگاه محل سکونت' : 'Dormitory'}
                </label>
                <input
                  type="text"
                  value={profileForm.dormitory || ''}
                  onChange={(e) => handleProfileFieldChange('dormitory', e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'شماره اتاق خوابگاه' : 'Room Number'}
                </label>
                <input
                  type="text"
                  value={profileForm.roomNumber || ''}
                  onChange={(e) => handleProfileFieldChange('roomNumber', e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2.5 text-xs text-[#F1F3FA] focus:outline-none focus:ring-1 focus:ring-[#663AF3] focus:border-[#663AF3] transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-primary-futuristic text-xs px-5 py-2.5 cursor-pointer font-bold"
              >
                {isFa ? 'ذخیره مشخصات دانشجو' : 'Save Profile Changes'}
              </button>
            </div>
          </form>

          {/* 2. Golestan Schedule Import Shortcut Card */}
          {onOpenGolestanModal && (
            <div className="glass-card p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#663AF3]/20 via-[#11182A] to-[#39A7FF]/15 border border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#663AF3] text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(102,58,243,0.4)]">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-[#F1F3FA]">
                    {isFa ? 'استخراج خودکار برنامه هفتگی از گلستان' : 'Import Schedule from Golestan PDF'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {isFa ? 'هوشمند' : 'Smart OCR'}
                  </span>
                </div>
                <p className="text-xs text-[#A6AEC3] leading-relaxed">
                  {isFa
                    ? 'فایل PDF گزارش ۸۸ سیستم گلستان را وارد کنید تا تمامی دروس و جلسات هفتگی به صورت خودکار تفکیک شوند.'
                    : 'Upload Golestan Report 88 PDF to auto-populate courses and timetable slots.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenGolestanModal}
                className="btn-primary-futuristic w-full sm:w-auto px-4 py-2.5 text-xs font-bold shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#65D5FF]" />
                <span>{isFa ? 'بارگذاری فایل گلستان' : 'Open Golestan Importer'}</span>
              </button>
            </div>
          )}

          {/* 3. Academic Semester Settings Card */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#39A7FF]" />
              <span>{isFa ? 'تنظیمات ترم و تقویم آموزشی' : 'Academic Semester Settings'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'عنوان نیم‌سال' : 'Semester Title'}
                </label>
                <input
                  type="text"
                  value={semesterTitle}
                  onChange={(e) => setSemesterTitle(e.target.value)}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2 text-xs text-[#F1F3FA] focus:outline-none focus:border-[#663AF3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'کل هفته‌های ترم' : 'Total Weeks'}
                </label>
                <input
                  type="number"
                  min={10}
                  max={20}
                  value={semesterWeeks}
                  onChange={(e) => setSemesterWeeks(Number(e.target.value))}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2 text-xs text-[#F1F3FA] focus:outline-none focus:border-[#663AF3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A6AEC3] block mb-1.5">
                  {isFa ? 'هفته جاری آموزشی' : 'Current Week'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={semesterWeeks}
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(Number(e.target.value))}
                  className="w-full bg-[#11182A]/90 border border-white/[0.08] rounded-xl p-2 text-xs text-[#F1F3FA] focus:outline-none focus:border-[#663AF3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left Column (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4. Appearance & Language */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#39A7FF]" />
              <span>{isFa ? 'زبان و تم ظاهری' : 'Language & Theme'}</span>
            </h3>

            <div className="space-y-3 pt-1">
              {/* Language Switch */}
              <div className="p-3.5 bg-[#11182A]/80 rounded-2xl border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F1F3FA]">
                    {isFa ? 'زبان رابط کاربری' : 'Interface Language'}
                  </div>
                  <div className="text-[11px] text-[#707B96] mt-0.5">
                    {isFa ? 'فارسی (راست‌چین) یا انگلیسی' : 'Persian (RTL) or English'}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#0B1020] p-1 rounded-xl border border-white/[0.08]">
                  <button
                    onClick={() => setLang('fa')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      lang === 'fa'
                        ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white shadow-xs'
                        : 'text-[#A6AEC3] hover:text-white'
                    }`}
                  >
                    فا
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      lang === 'en'
                        ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white shadow-xs'
                        : 'text-[#A6AEC3] hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Visual Theme Display */}
              <div className="p-3.5 bg-[#11182A]/80 rounded-2xl border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#663AF3]/20 to-[#39A7FF]/20 border border-white/[0.08] flex items-center justify-center text-[#65D5FF] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F1F3FA]">
                      {isFa ? 'پوسته بصری سامانه' : 'Visual System'}
                    </div>
                    <div className="text-[11px] text-[#A6AEC3] mt-0.5">
                      {isFa ? 'تم اختصاصی شیشه‌ای تیره (Liquid Glass Dark Space)' : 'Futuristic Liquid Glass Dark'}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#663AF3]/20 text-[#65D5FF] border border-[#663AF3]/30 shrink-0">
                  {isFa ? 'فعال • استاندارد' : 'Active • Standard'}
                </span>
              </div>
            </div>
          </div>

          {/* 5. Focus & Pomodoro Settings */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
              <Timer className="w-4 h-4 text-[#39A7FF]" />
              <span>{isFa ? 'تنظیمات جلسات مطالعه (پومودورو)' : 'Study Timer & Focus'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#11182A]/80 rounded-2xl border border-white/[0.06]">
                <label className="text-xs font-bold text-[#A6AEC3] block mb-1">
                  {isFa ? 'تمرکز (دقیقه)' : 'Focus (min)'}
                </label>
                <select
                  value={pomodoroLength}
                  onChange={(e) => setPomodoroLength(Number(e.target.value))}
                  className="w-full bg-[#0B1020] border border-white/[0.08] rounded-xl p-2 text-xs font-semibold text-[#F1F3FA] focus:outline-none cursor-pointer"
                >
                  <option value={20} className="bg-[#0B1020]">۲۰ دقیقه</option>
                  <option value={25} className="bg-[#0B1020]">۲۵ دقیقه (استاندارد)</option>
                  <option value={30} className="bg-[#0B1020]">۳۰ دقیقه</option>
                  <option value={45} className="bg-[#0B1020]">۴۵ دقیقه (عمیق)</option>
                  <option value={50} className="bg-[#0B1020]">۵۰ دقیقه</option>
                </select>
              </div>

              <div className="p-3 bg-[#11182A]/80 rounded-2xl border border-white/[0.06]">
                <label className="text-xs font-bold text-[#A6AEC3] block mb-1">
                  {isFa ? 'استراحت (دقیقه)' : 'Break (min)'}
                </label>
                <select
                  value={shortBreakLength}
                  onChange={(e) => setShortBreakLength(Number(e.target.value))}
                  className="w-full bg-[#0B1020] border border-white/[0.08] rounded-xl p-2 text-xs font-semibold text-[#F1F3FA] focus:outline-none cursor-pointer"
                >
                  <option value={3} className="bg-[#0B1020]">۳ دقیقه</option>
                  <option value={5} className="bg-[#0B1020]">۵ دقیقه (استاندارد)</option>
                  <option value={10} className="bg-[#0B1020]">۱۰ دقیقه</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#11182A]/80 border border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#F1F3FA] cursor-pointer hover:border-white/[0.12] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-[#39A7FF]" />
                <span>{isFa ? 'صدای زنگ پایان تایمر' : 'Timer Sound'}</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${soundEnabled ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-white/[0.04] border-white/[0.08] text-[#707B96]'}`}>
                {soundEnabled ? (isFa ? 'فعال' : 'ON') : (isFa ? 'غیرفعال' : 'OFF')}
              </span>
            </button>
          </div>

          {/* 6. Data Backup & Reset */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#39A7FF]" />
              <span>{isFa ? 'پشتیبان‌گیری و مدیریت داده‌ها' : 'Data & Backup Management'}</span>
            </h3>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleExportData}
                className="w-full p-3.5 bg-[#11182A]/80 hover:bg-[#11182A] rounded-2xl border border-white/[0.08] hover:border-white/[0.2] text-right transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#39A7FF] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#F1F3FA]">
                      {isFa ? 'دانلود فایل پشتیبان (JSON)' : 'Export JSON Backup'}
                    </div>
                    <div className="text-[10px] text-[#707B96]">
                      {isFa ? 'ذخیره کل دروس، تکالیف و تنظیمات' : 'Save all records to file'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#707B96] rtl:rotate-180" />
              </button>

              <button
                onClick={onResetToSampleData}
                className="w-full p-3.5 bg-amber-500/10 hover:bg-amber-500/15 rounded-2xl border border-amber-500/20 text-right transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-300">
                      {isFa ? 'بازنشانی داده‌های نمونه اولیه' : 'Reset to Sample Data'}
                    </div>
                    <div className="text-[10px] text-amber-400/60">
                      {isFa ? 'بارگذاری دروس و اطلاعات پیش‌فرض' : 'Restore initial courses'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400/60 rtl:rotate-180" />
              </button>

              <button
                onClick={onClearAllData}
                className="w-full p-3.5 bg-rose-500/10 hover:bg-rose-500/15 rounded-2xl border border-rose-500/20 text-right transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-rose-300">
                      {isFa ? 'پاک‌سازی تمام داده‌ها' : 'Clear All Data'}
                    </div>
                    <div className="text-[10px] text-rose-400/60">
                      {isFa ? 'خالی کردن تمامی رکوردها' : 'Start with fresh empty canvas'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-rose-400/60 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
