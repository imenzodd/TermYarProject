import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  FileCheck,
  ClipboardList,
  Calendar,
  Timer,
  BarChart2,
  FileText,
  ShoppingBag,
  User,
  Heart,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  BookOpen,
  Activity,
  X,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openNeedsCount?: number;
  marketItemsCount?: number;
  pendingTasksCount?: number;
  user: UserProfile;
  lang?: 'en' | 'fa';
  onOpenProfileModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  lang = 'en',
  onOpenProfileModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isFa = lang === 'fa';

  // Dynamic screen width check to ensure desktop sidebar is 100% NOT mounted into DOM on mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });

  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('ty_sidebar_collapsed') === 'true';
  });

  const toggleDesktopCollapse = () => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('ty_sidebar_collapsed', String(next));
      return next;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onCloseMobile) {
          onCloseMobile();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileOpen, onCloseMobile]);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderNavContent = (isMobile: boolean = false) => {
    if (!isMobile && isDesktopCollapsed) {
      return (
        <div className="flex flex-col justify-between h-full py-4 items-center">
          {/* Top: Logo icon & Expand button */}
          <div className="flex flex-col items-center gap-3 w-full px-2">
            <button
              onClick={() => handleSelectTab('dashboard')}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 hover:scale-105 transition-transform shrink-0"
              title="TermYar"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleDesktopCollapse}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
              title={isFa ? 'باز کردن منو' : 'Expand sidebar'}
            >
              <ChevronsLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div className="w-8 h-px bg-slate-200 dark:bg-slate-800 my-1" />

            {/* Quick collapsed icons */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              {[
                { tab: 'dossier', icon: FileText, label: isFa ? 'پرونده تحلیلی کسب‌وکار' : 'Dossier' },
                { tab: 'dashboard', icon: LayoutDashboard, label: isFa ? 'داشبورد' : 'Dashboard' },
                { tab: 'schedule', icon: CalendarDays, label: isFa ? 'برنامه هفتگی' : 'Schedule' },
                { tab: 'courses', icon: BookOpen, label: isFa ? 'دروس من' : 'Courses' },
                { tab: 'tasks', icon: ClipboardList, label: isFa ? 'تکالیف و تمرین‌ها' : 'Tasks' },
                { tab: 'exams', icon: Calendar, label: isFa ? 'امتحانات' : 'Exams' },
                { tab: 'timer', icon: Timer, label: isFa ? 'تایمر پومودورو' : 'Timer' },
                { tab: 'resources', icon: Layers, label: isFa ? 'بانک جزوات و منابع' : 'Vault' },
                { tab: 'marketplace', icon: ShoppingBag, label: isFa ? 'بازارچه خوابگاه' : 'Marketplace' },
                { tab: 'favorites', icon: Heart, label: isFa ? 'نشان‌شده‌ها' : 'Favorites' },
                { tab: 'settings', icon: Settings, label: isFa ? 'تنظیمات' : 'Settings' },
              ].map(({ tab, icon: Icon, label }) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleSelectTab(tab)}
                    title={label}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom icon */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onOpenProfileModal}
              className="w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors text-base"
              title={user.name || 'Profile'}
            >
              {user.avatar || '👨‍🎓'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="p-3.5 sm:p-4">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between px-1 mb-5">
            <div
              className="flex items-center gap-2.5 cursor-pointer min-w-0"
              onClick={() => handleSelectTab('dashboard')}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white truncate">
                  TermYar
                </span>
                <span className="text-[9px] font-medium text-slate-400 -mt-1 tracking-wider uppercase truncate">
                  {isFa ? 'دستیار دانشجو' : 'Student Cockpit'}
                </span>
              </div>
            </div>

            {/* Desktop Collapse Button */}
            {!isMobile && (
              <button
                type="button"
                onClick={toggleDesktopCollapse}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                title={isFa ? 'جمع کردن منو (فضای بازتر)' : 'Collapse sidebar'}
                aria-label="Collapse sidebar"
              >
                <ChevronsRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}

            {isMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 -mr-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

        {/* Business Dossier Special Item */}
        <div className="mb-2">
          <button
            onClick={() => handleSelectTab('dossier')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border ${
              activeTab === 'dossier'
                ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20'
                : 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200/60 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{isFa ? 'پرونده تحلیلی کسب‌وکار' : 'Business Dossier'}</span>
            </div>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500 text-white">
              {isFa ? 'دانشگاهی' : 'New'}
            </span>
          </button>
        </div>

        {/* Dashboard Single Active Item */}
        <div className="mb-4">
          <button
            onClick={() => handleSelectTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
            <span>{isFa ? 'داشبورد' : 'Dashboard'}</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-4">
          {/* Section: Study Plan */}
          <div>
            <button
              onClick={() => toggleSection('studyPlan')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
            >
              <span>{isFa ? 'برنامه تحصیلی' : 'Study Plan'}</span>
              {collapsedSections['studyPlan'] ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {!collapsedSections['studyPlan'] && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleSelectTab('schedule')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'schedule'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'برنامه هفتگی' : 'Weekly Schedule'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('courses')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'courses'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'دروس من' : 'My Courses'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Section: Tasks & Assessments */}
          <div>
            <button
              onClick={() => toggleSection('tasks')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
            >
              <span>{isFa ? 'تکالیف و ارزیابی‌ها' : 'Tasks & Assessments'}</span>
              {collapsedSections['tasks'] ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {!collapsedSections['tasks'] && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleSelectTab('tasks')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'tasks'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <FileCheck className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'تکالیف و تمرین‌ها' : 'Assignments'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('exams')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'exams'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <ClipboardList className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'امتحانات' : 'Exams'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('schedule')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'calendar'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'تقویم ترم' : 'Calendar'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Section: Study & Progress */}
          <div>
            <button
              onClick={() => toggleSection('progress')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
            >
              <span>{isFa ? 'مطالعه و پیشرفت' : 'Study & Progress'}</span>
              {collapsedSections['progress'] ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {!collapsedSections['progress'] && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleSelectTab('timer')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'timer'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <Timer className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'تایمر مطالعه (پومودورو)' : 'Study Timer'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('statistics')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'statistics'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'آمار مطالعه' : 'Statistics'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'reports'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'گزارش‌های تحصیلی' : 'Reports'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('health_score')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'health_score'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span>{isFa ? 'سلامت ترم (هوشمند)' : 'Semester Health'}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                    100
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Section: Academic Resources */}
          <div>
            <button
              onClick={() => toggleSection('resources')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
            >
              <span>{isFa ? 'منابع و خدمات دانشجویی' : 'Academic Resources'}</span>
              {collapsedSections['resources'] ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {!collapsedSections['resources'] && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleSelectTab('resources')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'resources'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{isFa ? 'منابع درسی و جزوات' : 'Academic Resources'}</span>
                  </div>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-medium">
                    {isFa ? 'کتابخانه' : 'Library'}
                  </span>
                </button>

                <button
                  onClick={() => handleSelectTab('marketplace')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'marketplace'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    <span>{isFa ? 'بازارچه اجاره و خرید خوابگاه' : 'Marketplace'}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-medium">
                    {isFa ? 'خوابگاه' : 'Dorm'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Section: Account */}
          <div>
            <button
              onClick={() => toggleSection('account')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
            >
              <span>{isFa ? 'حساب کاربری' : 'Account'}</span>
              {collapsedSections['account'] ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            {!collapsedSections['account'] && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => onOpenProfileModal ? onOpenProfileModal() : handleSelectTab('profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{isFa ? 'مشخصات دانشجو' : 'Profile'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('favorites')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'favorites'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'text-rose-500 fill-current' : 'text-slate-400'}`} />
                  <span>{isFa ? 'نشان‌شده‌ها' : 'Favorites'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900'
                  }`}
                >
                  <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  <span>{isFa ? 'تنظیمات' : 'Settings'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Semester Card from Screenshot */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-700/60">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {isFa ? 'نیم‌سال بهار ۱۴۰۴' : 'Spring 2025'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {isFa ? 'ترم تحصیلی جاری' : 'Current Semester'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
      {/* 1. Permanent Desktop Sidebar */}
      {isDesktop && (
        <aside
          className={`desktop-sidebar hidden lg:flex shrink-0 bg-white dark:bg-slate-900 rtl:border-l ltr:border-r border-slate-200/90 dark:border-slate-800 flex-col justify-between h-screen sticky top-0 overflow-y-auto select-none transition-all duration-200 z-20 ${
            isDesktopCollapsed ? 'w-20' : 'w-60 xl:w-64'
          }`}
        >
          {renderNavContent(false)}
        </aside>
      )}

      {/* 2. Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-out Drawer (Mounted ONLY when isMobileOpen is true) */}
      {isMobileOpen && (
        <aside
          className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between h-full overflow-y-auto select-none lg:hidden"
        >
          {renderNavContent(true)}
        </aside>
      )}
    </>
  );
};

