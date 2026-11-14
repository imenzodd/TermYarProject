import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  Globe,
  Menu,
  Compass,
  Sun,
  Moon,
  CheckCircle2,
} from 'lucide-react';
import { Task, UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  lang: 'en' | 'fa';
  setLang: (lang: 'en' | 'fa') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenProfileModal: () => void;
  onOpenNewTaskModal?: () => void;
  onToggleMobileMenu?: () => void;
  onOpenDossier?: () => void;
  onOpenLanding?: () => void;
  tasks?: Task[];
  onNavigateTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode = true,
  toggleDarkMode,
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  onOpenProfileModal,
  onToggleMobileMenu,
  onOpenLanding,
  tasks = [],
  onNavigateTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifContainerRef = useRef<HTMLDivElement>(null);
  const isFa = lang === 'fa';

  // Wire Cmd+K / Ctrl+K shortcut to search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close notifications dropdown on outside click
  useEffect(() => {
    if (!showNotifications) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (notifContainerRef.current && !notifContainerRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  // Real upcoming pending tasks & exams for notifications
  const upcomingItems = tasks
    .filter((t) => !t.done)
    .sort((a, b) => {
      const rank = (p?: string) => (p === 'high' ? 0 : p === 'medium' ? 1 : 2);
      return rank(a.priority) - rank(b.priority);
    })
    .slice(0, 4);

  return (
    <header className="h-14 bg-white/95 dark:bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] px-3 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30 transition-colors">
      {/* Start zone: Mobile drawer toggle + Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
          aria-label={isFa ? 'باز کردن منو' : 'Open navigation menu'}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 min-w-0">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#707B96] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isFa ? 'جستجو...' : 'Search...'}
            className="w-full h-9 bg-slate-50 dark:bg-[#11182A]/80 hover:bg-slate-100/80 dark:hover:bg-[#151D33] border border-slate-200/90 dark:border-white/[0.08] rounded-xl ps-8 pe-3 sm:pe-12 text-xs sm:text-[13px] text-slate-900 dark:text-[#F1F3FA] placeholder-slate-400 dark:placeholder-[#707B96] focus:outline-none focus:ring-2 focus:ring-[#663AF3]/25 focus:border-[#663AF3]/60 transition-all text-start"
          />
          <kbd className="hidden sm:inline-flex absolute end-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] font-medium text-slate-400 dark:text-[#707B96] bg-white dark:bg-[#0B1020] px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/[0.08] pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* End zone: Compact Utility Controls & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Theme Switcher */}
        {toggleDarkMode && (
          <button
            type="button"
            onClick={toggleDarkMode}
            className="h-9 flex items-center gap-1.5 px-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 dark:bg-[#11182A]/70 dark:hover:bg-white/[0.08] text-slate-700 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] border border-slate-200/90 dark:border-white/[0.08] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            title={
              darkMode
                ? isFa ? 'تغییر به تم روشن' : 'Switch to Light Mode'
                : isFa ? 'تغییر به تم تیره' : 'Switch to Dark Mode'
            }
            aria-label={darkMode ? (isFa ? 'تم روشن' : 'Light mode') : (isFa ? 'تم تیره' : 'Dark mode')}
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden md:inline text-[11px]">{isFa ? 'روشن' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#663AF3] shrink-0" />
                <span className="hidden md:inline text-[11px]">{isFa ? 'تیره' : 'Dark'}</span>
              </>
            )}
          </button>
        )}

        {/* Language Toggle */}
        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="h-9 flex items-center gap-1.5 px-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] bg-slate-50 dark:bg-[#11182A]/70 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors border border-slate-200/90 dark:border-white/[0.08] cursor-pointer shrink-0 whitespace-nowrap"
          title={isFa ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
        >
          <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-[#39A7FF] shrink-0" />
          <span className="text-[11px] font-semibold">{lang === 'en' ? 'FA' : 'EN'}</span>
        </button>

        {/* Landing Shortcut */}
        {onOpenLanding && (
          <button
            type="button"
            onClick={onOpenLanding}
            className="hidden sm:flex h-9 items-center gap-1.5 px-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 dark:bg-[#11182A]/70 dark:hover:bg-white/[0.08] text-slate-700 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] border border-slate-200/90 dark:border-white/[0.08] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            title={isFa ? 'صفحه معرفی ترم‌یار' : 'Landing Page'}
          >
            <Compass className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#65D5FF] shrink-0" />
            <span className="hidden lg:inline text-[11px]">{isFa ? 'صفحه اصلی' : 'Landing'}</span>
          </button>
        )}

        {/* Notifications */}
        <div ref={notifContainerRef} className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="w-9 h-9 rounded-xl text-slate-600 dark:text-[#A6AEC3] hover:text-slate-900 dark:hover:text-[#F1F3FA] bg-slate-50 dark:bg-[#11182A]/70 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors border border-slate-200/90 dark:border-white/[0.08] relative flex items-center justify-center cursor-pointer"
            aria-label={isFa ? 'اعلان‌ها' : 'Notifications'}
          >
            <Bell className="w-4 h-4" />
            {upcomingItems.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute top-2 end-2" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute end-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-white dark:bg-[#0D1324] border border-slate-200 dark:border-white/[0.1] rounded-2xl shadow-xl p-3 z-50 text-xs">
              <div className="font-semibold text-slate-900 dark:text-[#F1F3FA] pb-2 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                <span>{isFa ? 'یادآورهای نزدیک' : 'Upcoming Reminders'}</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-[#A6AEC3] tabular-nums">
                  {upcomingItems.length} {isFa ? 'مورد' : 'items'}
                </span>
              </div>

              {upcomingItems.length > 0 ? (
                <div className="py-1.5 divide-y divide-slate-100 dark:divide-white/[0.06]">
                  {upcomingItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        if (onNavigateTab) {
                          onNavigateTab(item.type === 'exam' ? 'exams' : 'tasks');
                        }
                      }}
                      className="w-full py-2 px-2 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-lg transition-colors text-start cursor-pointer block"
                    >
                      <div className="font-medium text-slate-900 dark:text-[#F1F3FA] truncate">
                        {item.title}
                      </div>
                      <div className="text-slate-500 dark:text-[#A6AEC3] text-[11px] mt-0.5 flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            item.priority === 'high' ? 'bg-rose-500' : 'bg-amber-400'
                          }`}
                        />
                        <span className="truncate">
                          {item.courseName} · {item.relativeDue || item.date}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 dark:text-[#A6AEC3] flex flex-col items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{isFa ? 'تکلیف یا امتحان معوقی ندارید' : 'All caught up!'}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        <button
          type="button"
          onClick={onOpenProfileModal}
          className="h-9 flex items-center gap-2 ps-1.5 pe-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
          title={isFa ? 'ویرایش پروفایل' : 'Edit Profile'}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] p-[1.5px] flex items-center justify-center overflow-hidden shrink-0">
            {user.avatar && user.avatar.startsWith('http') ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="w-full h-full rounded-full bg-white dark:bg-[#11182A] flex items-center justify-center text-[11px] font-bold text-slate-800 dark:text-[#F1F3FA]">
                {user.name ? user.name.slice(0, 2) : 'TY'}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-[#F1F3FA] hidden sm:inline max-w-[110px] truncate">
            {user.name || (isFa ? 'دانشجو' : 'Student')}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-[#707B96] hidden sm:inline shrink-0" />
        </button>
      </div>
    </header>
  );
};
