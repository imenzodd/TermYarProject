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
  Compass,
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
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] flex items-center justify-center text-white shadow-lg shadow-[#663AF3]/30 hover:scale-105 transition-transform shrink-0 cursor-pointer"
              title="TermYar"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleDesktopCollapse}
              className="w-8 h-8 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
              title={isFa ? 'باز کردن منو' : 'Expand sidebar'}
            >
              <ChevronsLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div className="w-8 h-px bg-white/[0.08] my-1" />

            {/* Quick collapsed icons */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              {[
                { tab: 'landing', icon: Compass, label: isFa ? 'صفحه اصلی و معرفی' : 'Landing Page' },
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
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      active
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.06] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom user avatar */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onOpenProfileModal}
              className="w-10 h-10 rounded-xl text-[#A6AEC3] hover:bg-white/[0.06] hover:text-[#F1F3FA] flex items-center justify-center transition-colors text-base cursor-pointer"
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] flex items-center justify-center text-white shadow-lg shadow-[#663AF3]/30 shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-black tracking-tight text-[#F1F3FA] truncate">
                  TermYar
                </span>
                <span className="text-[9px] font-medium text-[#707B96] -mt-0.5 tracking-wider uppercase truncate">
                  {isFa ? 'دستیار تحصیلی مدرن' : 'Student Cockpit'}
                </span>
              </div>
            </div>

            {/* Desktop Collapse Button */}
            {!isMobile && (
              <button
                type="button"
                onClick={toggleDesktopCollapse}
                className="p-1.5 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
                title={isFa ? 'جمع کردن منو (فضای بازتر)' : 'Collapse sidebar'}
                aria-label="Collapse sidebar"
              >
                <ChevronsRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}

            {isMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 -mr-1.5 rounded-xl text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Landing Page Preview Item */}
          <div className="mb-2">
            <button
              onClick={() => handleSelectTab('landing')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border cursor-pointer ${
                activeTab === 'landing'
                  ? 'nav-pill-active text-white border-transparent'
                  : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-[#A6AEC3] hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-[#F1F3FA]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className={`w-4 h-4 shrink-0 ${activeTab === 'landing' ? 'text-white' : 'text-[#0284C7] dark:text-[#39A7FF]'}`} />
                <span>{isFa ? 'صفحه اصلی و معرفی' : 'Landing Page'}</span>
              </div>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${
                activeTab === 'landing'
                  ? 'bg-white/20 text-white border-white/20'
                  : 'bg-sky-50 dark:bg-white/[0.08] text-sky-700 dark:text-[#39A7FF] border-sky-200 dark:border-white/[0.06]'
              }`}>
                {isFa ? 'جدید' : 'New'}
              </span>
            </button>
          </div>

          {/* Business Dossier Special Item (Single official button) */}
          <div className="mb-2">
            <button
              onClick={() => handleSelectTab('dossier')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border cursor-pointer ${
                activeTab === 'dossier'
                  ? 'nav-pill-active text-white border-transparent'
                  : 'bg-indigo-50 dark:bg-[#663AF3]/10 border-indigo-200 dark:border-[#663AF3]/30 text-indigo-800 dark:text-[#C9BAFF] hover:bg-indigo-100 dark:hover:bg-[#663AF3]/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className={`w-4 h-4 shrink-0 ${activeTab === 'dossier' ? 'text-white' : 'text-indigo-600 dark:text-[#39A7FF]'}`} />
                <span>{isFa ? 'پرونده تحلیلی کسب‌وکار' : 'Business Dossier'}</span>
              </div>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#663AF3] text-white shadow-xs">
                {isFa ? 'دانشگاهی' : 'New'}
              </span>
            </button>
          </div>

          {/* Dashboard Single Active Item */}
          <div className="mb-3">
            <button
              onClick={() => handleSelectTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'nav-pill-active text-white'
                  : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-[#707B96]'}`} />
              <span>{isFa ? 'داشبورد' : 'Dashboard'}</span>
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-3.5">
            {/* Section: Study Plan */}
            <div>
              <button
                onClick={() => toggleSection('studyPlan')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#707B96] uppercase tracking-wider hover:text-[#A6AEC3] transition-colors cursor-pointer"
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'schedule'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <CalendarDays className={`w-4 h-4 ${activeTab === 'schedule' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'برنامه هفتگی' : 'Weekly Schedule'}</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab('courses')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'courses'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <GraduationCap className={`w-4 h-4 ${activeTab === 'courses' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'دروس من' : 'My Courses'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Section: Tasks & Assessments */}
            <div>
              <button
                onClick={() => toggleSection('tasks')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#707B96] uppercase tracking-wider hover:text-[#A6AEC3] transition-colors cursor-pointer"
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'tasks'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <ClipboardList className={`w-4 h-4 ${activeTab === 'tasks' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'تکالیف و تمرین‌ها' : 'Tasks'}</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab('exams')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'exams'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 ${activeTab === 'exams' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'امتحانات' : 'Exams'}</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab('timer')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'timer'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Timer className={`w-4 h-4 ${activeTab === 'timer' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'تایمر پومودورو' : 'Timer'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Section: Academic Resources & Market */}
            <div>
              <button
                onClick={() => toggleSection('resources')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#707B96] uppercase tracking-wider hover:text-[#A6AEC3] transition-colors cursor-pointer"
              >
                <span>{isFa ? 'منابع و خدمات دانشجویی' : 'Resources & Services'}</span>
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
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'resources'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Layers className={`w-4 h-4 ${activeTab === 'resources' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'بانک جزوات و منابع' : 'Vault'}</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab('marketplace')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'marketplace'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <ShoppingBag className={`w-4 h-4 ${activeTab === 'marketplace' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'بازارچه خوابگاه' : 'Marketplace'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Section: General */}
            <div>
              <button
                onClick={() => toggleSection('general')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-[#707B96] uppercase tracking-wider hover:text-[#A6AEC3] transition-colors cursor-pointer"
              >
                <span>{isFa ? 'عمومی' : 'General'}</span>
                {collapsedSections['general'] ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              {!collapsedSections['general'] && (
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleSelectTab('favorites')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'favorites'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'text-white fill-current' : 'text-rose-400'}`} />
                    <span>{isFa ? 'نشان‌شده‌ها' : 'Favorites'}</span>
                  </button>
                  <button
                    onClick={() => handleSelectTab('settings')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      activeTab === 'settings'
                        ? 'nav-pill-active text-white'
                        : 'text-[#A6AEC3] hover:bg-white/[0.05] hover:text-[#F1F3FA]'
                    }`}
                  >
                    <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-[#707B96]'}`} />
                    <span>{isFa ? 'تنظیمات' : 'Settings'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Semester Card */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="p-3 bg-slate-50 dark:bg-[#11182A]/80 border border-slate-200 dark:border-white/[0.08] rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#663AF3]/15 to-[#39A7FF]/15 dark:from-[#663AF3]/30 dark:to-[#39A7FF]/30 border border-[#663AF3]/25 dark:border-[#663AF3]/40 text-indigo-700 dark:text-[#C9BAFF] flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
                {isFa ? 'نیم‌سال بهار ۱۴۰۴' : 'Spring 2025'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
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
          className={`desktop-sidebar hidden lg:flex shrink-0 bg-white dark:bg-[#0B1020]/90 backdrop-blur-2xl rtl:border-l ltr:border-r border-slate-200 dark:border-white/[0.08] flex-col justify-between h-screen sticky top-0 overflow-y-auto select-none transition-all duration-200 z-20 ${
            isDesktopCollapsed ? 'w-20' : 'w-60 xl:w-64'
          }`}
        >
          {renderNavContent(false)}
        </aside>
      )}

      {/* 2. Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-out Drawer */}
      {isMobileOpen && (
        <aside
          className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-[#0B1020]/98 backdrop-blur-3xl border-e border-slate-200 dark:border-white/[0.1] shadow-2xl flex flex-col justify-between h-full overflow-y-auto select-none lg:hidden"
        >
          {renderNavContent(true)}
        </aside>
      )}
    </>
  );
};
