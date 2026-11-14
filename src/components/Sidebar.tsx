import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  ClipboardList,
  Calendar,
  Timer,
  FileText,
  ShoppingBag,
  Heart,
  Settings,
  Layers,
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
  pendingTasksCount = 0,
  user,
  lang = 'en',
  onOpenProfileModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const isFa = lang === 'fa';

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

  const primaryGroups = [
    {
      id: 'core',
      label: isFa ? 'فضای کاری' : 'Workspace',
      items: [
        { tab: 'dashboard', icon: LayoutDashboard, label: isFa ? 'داشبورد' : 'Dashboard' },
        { tab: 'schedule', icon: CalendarDays, label: isFa ? 'برنامه هفتگی' : 'Weekly Schedule' },
        { tab: 'courses', icon: GraduationCap, label: isFa ? 'دروس من' : 'My Courses' },
      ],
    },
    {
      id: 'productivity',
      label: isFa ? 'برنامه‌ریزی و تمرکز' : 'Study & Focus',
      items: [
        {
          tab: 'tasks',
          icon: ClipboardList,
          label: isFa ? 'تکالیف و تمرین‌ها' : 'Tasks',
          count: pendingTasksCount > 0 ? pendingTasksCount : undefined,
        },
        { tab: 'exams', icon: Calendar, label: isFa ? 'امتحانات' : 'Exams' },
        { tab: 'timer', icon: Timer, label: isFa ? 'تایمر پومودورو' : 'Focus Timer' },
      ],
    },
    {
      id: 'campus',
      label: isFa ? 'منابع و دانشگاه' : 'Campus & Vault',
      items: [
        { tab: 'resources', icon: Layers, label: isFa ? 'بانک جزوات و منابع' : 'Notes Vault' },
        { tab: 'marketplace', icon: ShoppingBag, label: isFa ? 'بازارچه خوابگاه' : 'Marketplace' },
      ],
    },
  ];

  const secondaryItems = [
    { tab: 'favorites', icon: Heart, label: isFa ? 'نشان‌شده‌ها' : 'Favorites' },
    { tab: 'settings', icon: Settings, label: isFa ? 'تنظیمات' : 'Settings' },
    { tab: 'dossier', icon: FileText, label: isFa ? 'پرونده تحلیلی' : 'Dossier' },
    { tab: 'landing', icon: Compass, label: isFa ? 'صفحه معرفی' : 'Landing Page' },
  ];

  const renderNavItem = (
    item: { tab: string; icon: React.ComponentType<{ className?: string }>; label: string; count?: number },
    collapsed: boolean
  ) => {
    const Icon = item.icon;
    const isActive = activeTab === item.tab;

    if (collapsed) {
      return (
        <button
          key={item.tab}
          type="button"
          onClick={() => handleSelectTab(item.tab)}
          title={item.label}
          aria-label={item.label}
          className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150 cursor-pointer shrink-0 ${
            isActive
              ? 'bg-[#663AF3]/12 dark:bg-[#663AF3]/20 text-[#663AF3] dark:text-[#C9BAFF]'
              : 'text-slate-500 dark:text-[#A6AEC3] hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-[#F1F3FA]'
          }`}
        >
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute start-0 top-2.5 bottom-2.5 w-[3px] rounded-full bg-[#663AF3] dark:bg-[#8E73FF]"
            />
          )}
          <Icon className="w-4 h-4 shrink-0" />
        </button>
      );
    }

    return (
      <button
        key={item.tab}
        type="button"
        onClick={() => handleSelectTab(item.tab)}
        className={`relative w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-colors duration-150 cursor-pointer shrink-0 ${
          isActive
            ? 'bg-[#663AF3]/10 dark:bg-[#663AF3]/18 text-[#5227D8] dark:text-white font-semibold'
            : 'text-slate-600 dark:text-[#A6AEC3] hover:bg-slate-100/80 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-[#F1F3FA] font-medium'
        }`}
      >
        {/* Subtle active vertical accent indicator */}
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute start-0 top-2 bottom-2 w-[3px] rounded-full bg-[#663AF3] dark:bg-[#8E73FF]"
          />
        )}

        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={`w-4 h-4 shrink-0 ${
              isActive
                ? 'text-[#663AF3] dark:text-[#C9BAFF]'
                : 'text-slate-400 dark:text-[#707B96]'
            }`}
          />
          <span className="truncate">{item.label}</span>
        </div>

        {typeof item.count === 'number' && (
          <span
            className={`text-[11px] font-semibold tabular-nums shrink-0 ${
              isActive
                ? 'text-[#663AF3] dark:text-[#C9BAFF]'
                : 'text-slate-400 dark:text-[#707B96]'
            }`}
          >
            {item.count}
          </span>
        )}
      </button>
    );
  };

  const renderNavContent = (isMobile: boolean = false) => {
    const collapsed = !isMobile && isDesktopCollapsed;

    return (
      <div className="flex flex-col h-full min-h-0">
        {/* Top Brand Header */}
        <div
          className={`flex items-center ${
            collapsed ? 'flex-col gap-2.5 py-4 px-2' : 'justify-between px-4 pt-4 pb-3'
          } shrink-0 border-b border-slate-100 dark:border-white/[0.06]`}
        >
          <button
            type="button"
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer min-w-0 text-start"
            title="TermYar"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] flex items-center justify-center text-white shadow-sm shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-[#F1F3FA] truncate">
                  {isFa ? 'ترم‌یار' : 'TermYar'}
                </span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-[#707B96] -mt-0.5 truncate">
                  {isFa ? 'فضای کار دانشجویی' : 'Academic Workspace'}
                </span>
              </div>
            )}
          </button>

          {!isMobile ? (
            <button
              type="button"
              onClick={toggleDesktopCollapse}
              className="p-1.5 rounded-lg text-slate-400 dark:text-[#707B96] hover:text-slate-800 dark:hover:text-[#F1F3FA] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
              title={
                collapsed
                  ? isFa ? 'باز کردن منو' : 'Expand sidebar'
                  : isFa ? 'جمع کردن منو' : 'Collapse sidebar'
              }
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronsLeft className="w-4 h-4 rtl:rotate-180" />
              ) : (
                <ChevronsRight className="w-4 h-4 rtl:rotate-180" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 dark:text-[#707B96] hover:text-slate-800 dark:hover:text-[#F1F3FA] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
              aria-label={isFa ? 'بستن منو' : 'Close menu'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Upper Primary Navigation + Flexible Spacer */}
        <div
          className={`flex-1 min-h-0 overflow-y-auto ${
            collapsed ? 'px-2 py-3 flex flex-col items-center gap-1.5' : 'px-3 py-3.5 space-y-5'
          }`}
        >
          {primaryGroups.map((group) => (
            <div key={group.id} className={collapsed ? 'flex flex-col items-center gap-1 w-full' : ''}>
              {!collapsed && (
                <div className="px-3 mb-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#707B96]">
                  {group.label}
                </div>
              )}
              <div className={collapsed ? 'flex flex-col items-center gap-1 w-full' : 'space-y-0.5'}>
                {group.items.map((item) => renderNavItem(item, collapsed))}
              </div>
            </div>
          ))}
        </div>

        {/* Lower Secondary Navigation + Account Footer anchored to bottom */}
        <div
          className={`shrink-0 border-t border-slate-200/80 dark:border-white/[0.08] ${
            collapsed ? 'px-2 py-3 flex flex-col items-center gap-1.5' : 'px-3 py-3 space-y-3'
          }`}
        >
          <div className={collapsed ? 'flex flex-col items-center gap-1 w-full' : 'space-y-0.5'}>
            {secondaryItems.map((item) => renderNavItem(item, collapsed))}
          </div>

          {/* Account / Current Term Compact Footer */}
          {collapsed ? (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#11182A] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-[#F1F3FA] hover:border-[#663AF3]/40 flex items-center justify-center transition-colors text-xs font-bold cursor-pointer mt-1"
              title={user.name || (isFa ? 'پروفایل دانشجو' : 'Student Profile')}
            >
              {user.name ? user.name.slice(0, 2) : 'TY'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#11182A]/75 hover:bg-slate-100 dark:hover:bg-[#151D33] border border-slate-200/90 dark:border-white/[0.08] rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer text-start"
            >
              <div className="w-8 h-8 rounded-lg bg-[#663AF3]/10 dark:bg-[#663AF3]/20 text-[#663AF3] dark:text-[#C9BAFF] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-[#F1F3FA] truncate">
                  {user.name || (isFa ? 'حساب دانشجویی' : 'Student Account')}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#707B96] truncate">
                  {isFa ? 'نیم‌سال بهار ۱۴۰۴' : 'Spring 2025 Term'}
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Permanent Full-Height Desktop Sidebar (Fixed viewport height + layout width spacer) */}
      {isDesktop && (
        <div
          className={`desktop-sidebar hidden lg:block shrink-0 transition-[width] duration-200 ${
            isDesktopCollapsed ? 'w-[72px]' : 'w-60 xl:w-64'
          }`}
        >
          <aside
            aria-label={isFa ? 'منوی ناوبری اصلی' : 'Sidebar navigation'}
            className={`desktop-sidebar hidden lg:flex fixed inset-y-0 start-0 bg-white dark:bg-[#0B1020] rtl:border-l ltr:border-r border-slate-200 dark:border-white/[0.08] flex-col select-none transition-[width] duration-200 z-30 ${
              isDesktopCollapsed ? 'w-[72px]' : 'w-60 xl:w-64'
            }`}
          >
            {renderNavContent(false)}
          </aside>
        </div>
      )}

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-out Full-Height Drawer */}
      {isMobileOpen && (
        <aside
          aria-label={isFa ? 'منوی ناوبری موبایل' : 'Mobile navigation drawer'}
          className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-[#0B1020] border-e border-slate-200 dark:border-white/[0.1] shadow-2xl flex flex-col h-full select-none lg:hidden"
        >
          {renderNavContent(true)}
        </aside>
      )}
    </>
  );
};
