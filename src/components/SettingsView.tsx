import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Moon,
  Sun,
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
  darkMode: boolean;
  toggleDarkMode: () => void;
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
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-24">
      {/* Top Header Bar with Standard Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName={isFa ? 'داشبورد' : 'Dashboard'}
              hasUnsavedChanges={isFormDirty}
              lang={lang}
            />
          )}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{isFa ? 'تنظیمات و پیکربندی سامانه' : 'Settings & Preferences'}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {isFa ? 'کنترل جامع' : 'System Wide'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isFa
                ? 'شخصی‌سازی مشخصات دانشجو، ترم تحصیلی، زمان‌سنج مطالعه و مدیریت داده‌ها'
                : 'Customize profile, semester parameters, study intervals, and data'}
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800 animate-fade-in self-start sm:self-auto">
            <Check className="w-4 h-4" />
            <span>{isFa ? 'تنظیمات با موفقیت ذخیره شد!' : 'Settings saved!'}</span>
          </div>
        )}
      </div>

      {/* Main Responsive Grid Layout filling entire screen width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Right / Main Column (7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Student Profile Card */}
          <form onSubmit={handleSaveProfile} className="dash-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>{isFa ? 'مشخصات دانشجو و دانشگاه' : 'Student & Academic Profile'}</span>
              </h3>
              <span className="text-[11px] text-slate-400">{isFa ? 'اطلاعات هویتی' : 'Personal info'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'شماره دانشجویی' : 'Student ID'}
                </label>
                <input
                  type="text"
                  value={profileForm.studentId || ''}
                  onChange={(e) => handleProfileFieldChange('studentId', e.target.value)}
                  placeholder="مثال: ۴۰۲۲۰۵۹۳"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'نام دانشگاه' : 'University'}
                </label>
                <input
                  type="text"
                  value={profileForm.university}
                  onChange={(e) => handleProfileFieldChange('university', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'رشته تحصیلی' : 'Major'}
                </label>
                <input
                  type="text"
                  value={profileForm.major}
                  onChange={(e) => handleProfileFieldChange('major', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'خوابگاه محل سکونت' : 'Dormitory'}
                </label>
                <input
                  type="text"
                  value={profileForm.dormitory || ''}
                  onChange={(e) => handleProfileFieldChange('dormitory', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'شماره اتاق خوابگاه' : 'Room Number'}
                </label>
                <input
                  type="text"
                  value={profileForm.roomNumber || ''}
                  onChange={(e) => handleProfileFieldChange('roomNumber', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                {isFa ? 'ذخیره مشخصات دانشجو' : 'Save Profile Changes'}
              </button>
            </div>
          </form>

          {/* 2. Golestan Schedule Import Shortcut Card */}
          {onOpenGolestanModal && (
            <div className="dash-card p-5 sm:p-6 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {isFa ? 'استخراج خودکار برنامه هفتگی از گلستان' : 'Import Schedule from Golestan PDF'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    {isFa ? 'هوشمند' : 'Smart OCR'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isFa
                    ? 'فایل PDF گزارش ۸۸ سیستم گلستان را وارد کنید تا تمامی ۸ درس و جلسات هفتگی به صورت خودکار تفکیک شوند.'
                    : 'Upload Golestan Report 88 PDF to auto-populate courses and timetable slots.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenGolestanModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{isFa ? 'بارگذاری فایل گلستان' : 'Open Golestan Importer'}</span>
              </button>
            </div>
          )}

          {/* 3. Academic Semester Settings Card */}
          <div className="dash-card p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>{isFa ? 'تنظیمات ترم و تقویم آموزشی' : 'Academic Semester Settings'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'عنوان نیم‌سال' : 'Semester Title'}
                </label>
                <input
                  type="text"
                  value={semesterTitle}
                  onChange={(e) => setSemesterTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'کل هفته‌های ترم' : 'Total Weeks'}
                </label>
                <input
                  type="number"
                  min={10}
                  max={20}
                  value={semesterWeeks}
                  onChange={(e) => setSemesterWeeks(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {isFa ? 'هفته جاری آموزشی' : 'Current Week'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={semesterWeeks}
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left Column (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4. Appearance & Language */}
          <div className="dash-card p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>{isFa ? 'زبان و تم ظاهری' : 'Language & Theme'}</span>
            </h3>

            <div className="space-y-3 pt-1">
              {/* Language Switch */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isFa ? 'زبان رابط کاربری' : 'Interface Language'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isFa ? 'فارسی (راست‌چین) یا انگلیسی' : 'Persian (RTL) or English'}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white dark:bg-slate-700 p-1 rounded-lg border border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => setLang('fa')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      lang === 'fa'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    فا
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      lang === 'en'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isFa ? 'حالت تیره و روشن' : 'Color Theme'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {darkMode ? (isFa ? 'تم تیره (Dark) فعال است' : 'Dark mode active') : (isFa ? 'تم روشن (Light) فعال است' : 'Light mode active')}
                  </div>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:scale-105 transition-all shadow-2xs"
                  title="تغییر تم"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                </button>
              </div>
            </div>
          </div>

          {/* 5. Focus & Pomodoro Settings */}
          <div className="dash-card p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Timer className="w-4 h-4 text-indigo-600" />
              <span>{isFa ? 'تنظیمات جلسات مطالعه (پومودورو)' : 'Study Timer & Focus'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {isFa ? 'تمرکز (دقیقه)' : 'Focus (min)'}
                </label>
                <select
                  value={pomodoroLength}
                  onChange={(e) => setPomodoroLength(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value={20}>۲۰ دقیقه</option>
                  <option value={25}>۲۵ دقیقه (استاندارد)</option>
                  <option value={30}>۳۰ دقیقه</option>
                  <option value={45}>۴۵ دقیقه (عمیق)</option>
                  <option value={50}>۵۰ دقیقه</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {isFa ? 'استراحت (دقیقه)' : 'Break (min)'}
                </label>
                <select
                  value={shortBreakLength}
                  onChange={(e) => setShortBreakLength(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value={3}>۳ دقیقه</option>
                  <option value={5}>۵ دقیقه (استاندارد)</option>
                  <option value={10}>۱۰ دقیقه</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isFa ? 'صدای زنگ پایان تایمر' : 'Timer Sound'}</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${soundEnabled ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                {soundEnabled ? (isFa ? 'فعال' : 'ON') : (isFa ? 'غیرفعال' : 'OFF')}
              </span>
            </button>
          </div>

          {/* 6. Data Backup & Reset */}
          <div className="dash-card p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>{isFa ? 'پشتیبان‌گیری و مدیریت داده‌ها' : 'Data & Backup Management'}</span>
            </h3>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleExportData}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-right transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isFa ? 'دانلود فایل پشتیبان (JSON)' : 'Export JSON Backup'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {isFa ? 'ذخیره کل دروس، تکالیف و تنظیمات' : 'Save all records to file'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
              </button>

              <button
                onClick={onResetToSampleData}
                className="w-full p-3 bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-100/50 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-right transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                      {isFa ? 'بازنشانی داده‌های نمونه اولیه' : 'Reset to Sample Data'}
                    </div>
                    <div className="text-[10px] text-amber-600/70 dark:text-amber-400/60">
                      {isFa ? 'بارگذاری دروس و اطلاعات پیش‌فرض' : 'Restore initial courses'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
              </button>

              <button
                onClick={onClearAllData}
                className="w-full p-3 bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-100/50 rounded-xl border border-rose-200/60 dark:border-rose-900/40 text-right transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-rose-800 dark:text-rose-300">
                      {isFa ? 'پاک‌سازی تمام داده‌ها' : 'Clear All Data'}
                    </div>
                    <div className="text-[10px] text-rose-500/80">
                      {isFa ? 'خالی کردن تمامی رکوردها' : 'Start with fresh empty canvas'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
