import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Globe, 
  Plus,
  Menu,
  Compass,
} from 'lucide-react';
import { UserProfile } from '../types';

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
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode,
  toggleDarkMode,
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  onOpenProfileModal,
  onToggleMobileMenu,
  onOpenDossier,
  onOpenLanding,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isFa = lang === 'fa';

  return (
    <header className="h-16 bg-[#0B1020]/80 dark:bg-[#0B1020]/85 backdrop-blur-xl border-b border-white/[0.08] px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Left zone: Mobile hamburger button + Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-xl min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 -ml-1 rounded-xl text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors shrink-0"
          aria-label={isFa ? 'منوی ناوبری' : 'Open navigation menu'}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-[#707B96] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isFa ? 'جستجو در دروس، تکالیف و پرونده‌ها...' : 'Search courses, tasks, notes...'}
            className="w-full bg-[#11182A]/80 hover:bg-[#151D33]/90 border border-white/[0.08] rounded-xl ps-9 pe-4 sm:pe-12 py-2 text-xs sm:text-sm text-[#F1F3FA] placeholder-[#707B96] focus:outline-none focus:ring-2 focus:ring-[#663AF3]/30 focus:border-[#663AF3] transition-all text-start"
          />
          <div className="hidden sm:flex absolute end-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[11px] font-medium text-[#707B96] bg-[#0B1020]/90 px-1.5 py-0.5 rounded border border-white/[0.08] shadow-2xs pointer-events-none">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Business Dossier, Language toggle, Theme toggle, Notifications, User profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Landing Page Link */}
        {onOpenLanding && (
          <button
            onClick={onOpenLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/[0.05] hover:bg-white/[0.1] text-[#A6AEC3] hover:text-white border border-white/[0.08] transition-all cursor-pointer shrink-0"
            title={isFa ? 'مشاهده صفحه اصلی و معرفی ترم‌یار' : 'View Landing Page'}
          >
            <Compass className="w-3.5 h-3.5 text-[#65D5FF]" />
            <span className="hidden sm:inline">{isFa ? 'صفحه اصلی' : 'Landing'}</span>
          </button>
        )}

        {/* Language switch */}
        <button
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#A6AEC3] hover:text-[#F1F3FA] bg-[#11182A]/70 hover:bg-white/[0.08] transition-colors border border-white/[0.08]"
          title={isFa ? 'تغییر زبان' : 'Switch Language'}
        >
          <Globe className="w-3.5 h-3.5 text-[#39A7FF]" />
          <span className="text-[11px] font-bold tracking-wider">{lang === 'en' ? 'FA' : 'EN'}</span>
        </button>

        {/* Notifications with glowing indicator */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-[#A6AEC3] hover:text-[#F1F3FA] bg-[#11182A]/70 hover:bg-white/[0.08] transition-colors border border-white/[0.08] relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] absolute top-1.5 right-1.5 ring-2 ring-[#0B1020]" />
          </button>

          {showNotifications && (
            <div className="absolute end-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-[#0B1020]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl p-3 z-50 text-xs">
              <div className="font-semibold text-[#F1F3FA] pb-2 border-b border-white/[0.08] flex items-center justify-between">
                <span>{isFa ? 'اعلان‌های هوشمند' : 'Notifications'}</span>
                <span className="text-[10px] bg-rose-500/15 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-medium">
                  {isFa ? '۲ رویداد نزدیک' : '2 Upcoming'}
                </span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2.5 bg-[#11182A]/90 hover:bg-[#151D33] border border-white/[0.06] rounded-xl transition-colors">
                  <div className="font-medium text-[#F1F3FA]">
                    {isFa ? 'کوییز ریاضی ۱' : 'Quiz 1 - MATH101'}
                  </div>
                  <div className="text-[#A6AEC3] text-[11px] mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {isFa ? 'تا ۲ روز آینده - ساعت ۱۰:۰۰' : 'In 2 days - 10:00 AM'}
                  </div>
                </div>
                <div className="p-2.5 bg-[#11182A]/90 hover:bg-[#151D33] border border-white/[0.06] rounded-xl transition-colors">
                  <div className="font-medium text-[#F1F3FA]">
                    {isFa ? 'گزارش آزمایشگاه فیزیک' : 'Lab report - PHYS101'}
                  </div>
                  <div className="text-[#A6AEC3] text-[11px] mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    {isFa ? 'مهلت تحویل تا ۵:۰۰ عصر امروز' : 'Due today at 5:00 PM'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div 
          onClick={onOpenProfileModal}
          className="flex items-center gap-2 ps-1.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] p-0.5 ring-1 ring-white/20 shadow-xs flex items-center justify-center overflow-hidden">
            {user.avatar && user.avatar.startsWith('http') ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="w-full h-full rounded-full bg-[#11182A] flex items-center justify-center text-xs font-bold text-[#F1F3FA]">
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'AM'}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#F1F3FA] hidden sm:inline">
            {user.name || 'Alex Morgan'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#707B96] hidden sm:inline" />
        </div>
      </div>
    </header>
  );
};
