import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Phone,
  CheckCircle,
  Tag,
  X,
  Search,
  Filter,
  Heart,
} from 'lucide-react';
import { MarketCategory, MarketItem, DealType } from '../types';
import { formatToman, toPersianDigits } from '../utils/persian';
import { BackButton } from './BackButton';

interface MarketplaceViewProps {
  items: MarketItem[];
  onOpenNewModal: () => void;
  onOpenNeedRequestTab: () => void;
  searchQuery: string;
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onBack?: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  onOpenNewModal,
  onOpenNeedRequestTab,
  searchQuery,
  favoriteIds = [],
  onToggleFavorite,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory | 'all'>('all');
  const [selectedDealType, setSelectedDealType] = useState<DealType | 'all'>('all');
  const [selectedDorm, setSelectedDorm] = useState<string>('all');
  const [activeItemModal, setActiveItemModal] = useState<MarketItem | null>(null);
  const [rentDurationDays, setRentDurationDays] = useState<number>(3);
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);
  const [showContactPhone, setShowContactPhone] = useState<boolean>(false);

  const categories: { id: MarketCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'همه اقلام' },
    { id: 'dorm_essentials', label: 'لوازم خوابگاه (قابلمه، کتری، اتو...)' },
    { id: 'engineering_tools', label: 'ابزار مهندسی (ماشین حساب، تخته رسم...)' },
    { id: 'books_notes', label: 'کتاب، جزوه و حل‌المسائل' },
    { id: 'electronics', label: 'دیجیتال و کابل' },
    { id: 'lab_medical', label: 'پزشکی و آزمایشگاه' },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedDealType !== 'all') {
      if (selectedDealType === 'rent' && item.dealType === 'sell') return false;
      if (selectedDealType === 'sell' && item.dealType === 'rent') return false;
    }
    if (selectedDorm !== 'all' && !item.dormLocation.includes(selectedDorm)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchOwner = item.ownerName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchOwner) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Clean Futuristic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName="داشبورد"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-[#663AF3]/25 to-[#39A7FF]/15 border border-[#663AF3]/30 text-[#65D5FF] shadow-[0_0_15px_rgba(102,58,243,0.3)]">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#F1F3FA]">
                بازارچه و امانت اقلام خوابگاهی
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#663AF3]/15 border border-[#663AF3]/30 text-[#65D5FF]">
                امکان جانبی ترم‌یار
              </span>
            </div>
            <p className="text-xs text-[#A6AEC3] mt-1.5">
              اجاره موقت و خرید وسایل دانشجویی (قابلمه، ماشین حساب مهندسی، تخته رسم و جزوه) با تحویل در لابی خوابگاه
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNeedRequestTab}
            className="btn-secondary-futuristic text-xs px-3.5 py-2 cursor-pointer font-semibold"
          >
            دیوار «کی داره؟»
          </button>

          <button
            onClick={onOpenNewModal}
            className="btn-primary-futuristic text-xs px-4 py-2 flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت آگهی کالا</span>
          </button>
        </div>
      </div>

      {/* Clean Filters and Controls Strip */}
      <div className="glass-panel p-4 rounded-2xl border border-white/[0.08] shadow-sm space-y-3.5">
        
        {/* Deal Type & Dorm location */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06] text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-[#11182A]/80 border border-white/[0.06] rounded-xl">
            <button
              onClick={() => setSelectedDealType('all')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-all cursor-pointer ${
                selectedDealType === 'all'
                  ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white font-bold shadow-[0_0_15px_rgba(102,58,243,0.4)]'
                  : 'text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.04]'
              }`}
            >
              همه آگهی‌ها
            </button>
            <button
              onClick={() => setSelectedDealType('rent')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-all cursor-pointer ${
                selectedDealType === 'rent'
                  ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white font-bold shadow-[0_0_15px_rgba(102,58,243,0.4)]'
                  : 'text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.04]'
              }`}
            >
              فقط اجاره روزانه
            </button>
            <button
              onClick={() => setSelectedDealType('sell')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-all cursor-pointer ${
                selectedDealType === 'sell'
                  ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white font-bold shadow-[0_0_15px_rgba(102,58,243,0.4)]'
                  : 'text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.04]'
              }`}
            >
              فروش قطعی
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A6AEC3]">محدوده خوابگاه:</span>
            <select
              value={selectedDorm}
              onChange={(e) => setSelectedDorm(e.target.value)}
              className="bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] rounded-xl px-3 py-1.5 outline-none cursor-pointer text-xs focus:border-[#663AF3]"
            >
              <option value="all" className="bg-[#0B1020] text-[#F1F3FA]">همه خوابگاه‌ها</option>
              <option value="طرشت" className="bg-[#0B1020] text-[#F1F3FA]">خوابگاه‌های طرشت</option>
              <option value="کوی" className="bg-[#0B1020] text-[#F1F3FA]">کوی دانشگاه</option>
              <option value="چمران" className="bg-[#0B1020] text-[#F1F3FA]">خوابگاه چمران</option>
              <option value="هنر" className="bg-[#0B1020] text-[#F1F3FA]">پردیس هنر و معماری</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-white/[0.12] text-white border border-white/[0.2] font-bold shadow-xs'
                  : 'bg-[#11182A]/80 text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.04] border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-white/[0.08]">
          <ShoppingBag className="w-10 h-10 text-[#707B96] mx-auto mb-2" />
          <h3 className="font-bold text-sm text-[#F1F3FA]">
            موردی مطابق با این فیلتر یافت نشد
          </h3>
          <p className="text-xs text-[#A6AEC3] mt-1">
            می‌توانید فیلترها را ریست کنید یا آگهی جدیدی ثبت نمایید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                setActiveItemModal(item);
                setReservationSuccess(false);
              }}
              className="group glass-card-interactive bg-[#0B1020]/75 rounded-2xl border border-white/[0.08] hover:border-[#663AF3]/50 shadow-sm transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-[#11182A] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#0B1020]/80 text-[#F1F3FA] border border-white/[0.1] backdrop-blur-md">
                    {item.dealType === 'rent' ? 'اجاره روزانه' : item.dealType === 'sell' ? 'فروشی' : 'اجاره / فروش'}
                  </span>
                </div>

                {onToggleFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    title={favoriteIds.includes(item.id) ? 'حذف از نشان‌شده‌ها' : 'افزودن به نشان‌شده‌ها'}
                    className={`absolute top-2.5 left-2.5 p-1.5 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                      favoriteIds.includes(item.id)
                        ? 'bg-rose-500 text-white scale-105 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'bg-[#0B1020]/70 text-white/80 hover:text-white hover:bg-[#0B1020] border border-white/[0.1]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${favoriteIds.includes(item.id) ? 'fill-current' : ''}`} />
                  </button>
                )}

                <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-[10px] text-white bg-[#0B1020]/85 border border-white/[0.08] backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#39A7FF] shrink-0" />
                    <span className="truncate">{item.dormLocation}</span>
                  </div>
                  <span className="shrink-0 text-[#A6AEC3]">{item.condition}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#F1F3FA] line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#A6AEC3] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.08] space-y-1">
                  {item.rentPriceDaily && (
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-[#A6AEC3] text-[11px]">کرایه روزانه:</span>
                      <span className="font-extrabold text-[#F1F3FA] tabular-nums">
                        {formatToman(item.rentPriceDaily)}
                        <span className="text-[10px] font-normal text-[#707B96]"> / روز</span>
                      </span>
                    </div>
                  )}

                  {item.sellPrice && (
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-[#A6AEC3] text-[11px]">قیمت فروش:</span>
                      <span className="font-bold text-[#F1F3FA] tabular-nums">
                        {formatToman(item.sellPrice)}
                      </span>
                    </div>
                  )}

                  {item.deposit && (
                    <div className="text-[10px] text-[#707B96] flex items-center justify-between">
                      <span>ودیعه امانت:</span>
                      <span className="tabular-nums">{formatToman(item.deposit)} یا کارت دانشجویی</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#A6AEC3] pt-1">
                  <span>{item.ownerName}</span>
                  <span className="text-[#65D5FF] font-semibold group-hover:underline">
                    مشاهده شرایط ←
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Item Details Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-panel bg-[#0B1020]/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/[0.12] shadow-2xl p-4 sm:p-6 space-y-4 text-right">
            
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="font-extrabold text-sm text-[#F1F3FA]">
                جزئیات کالا و امانت در خوابگاه
              </span>
              <button
                onClick={() => {
                  setActiveItemModal(null);
                  setShowContactPhone(false);
                }}
                className="p-1.5 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#11182A] border border-white/[0.08]">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-base font-black text-[#F1F3FA]">
                {activeItemModal.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#A6AEC3] mt-1">
                <span>{activeItemModal.dormLocation}</span>
                <span>·</span>
                <span>وضعیت: {activeItemModal.condition}</span>
                <span>·</span>
                <span>ثبت: {activeItemModal.createdAt}</span>
              </div>
            </div>

            <p className="text-xs text-[#F1F3FA] leading-relaxed bg-[#11182A]/90 p-3 rounded-xl border border-white/[0.08]">
              {activeItemModal.description}
            </p>

            {/* Rent Pricing Calculator */}
            {activeItemModal.rentPriceDaily && (
              <div className="bg-[#11182A]/80 p-4 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F1F3FA]">
                    محاسبه هزینه اجاره:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 7].map((days) => (
                      <button
                        key={days}
                        onClick={() => setRentDurationDays(days)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          rentDurationDays === days
                            ? 'bg-[#663AF3] text-white shadow-xs'
                            : 'bg-white/[0.06] text-[#A6AEC3] hover:text-white'
                        }`}
                      >
                        {toPersianDigits(days)} روز
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-xs">
                  <span className="text-[#A6AEC3]">
                    مبلغ کل ({toPersianDigits(rentDurationDays)} روز):
                  </span>
                  <span className="font-black text-sm text-[#F1F3FA] tabular-nums">
                    {formatToman(activeItemModal.rentPriceDaily * rentDurationDays)}
                  </span>
                </div>

                <div className="text-[11px] text-[#707B96] flex items-center justify-between">
                  <span>مبلغ ودیعه امانت (هنگام عودت برگردانده می‌شود):</span>
                  <span className="font-semibold text-[#A6AEC3] tabular-nums">
                    {formatToman(activeItemModal.deposit)} یا کارت دانشجویی
                  </span>
                </div>
              </div>
            )}

            {/* Safe Dorm Delivery Box */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#11182A]/70 border border-white/[0.08] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#39A7FF] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-[#F1F3FA]">تحویل در لابی خوابگاه:</strong>
                <p className="text-[11px] text-[#A6AEC3] mt-0.5">
                  تحویل کالا در لابی یا گیت ورودی خوابگاه انجام می‌شود. هنگام تحویل، تست سلامت کالا را انجام داده و برای ضمانت، ودیعه یا کارت دانشجویی مبادله نمایید.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#F1F3FA] block">
                    صاحب کالا: {activeItemModal.ownerName}
                  </span>
                  <span className="text-[11px] text-[#707B96]">
                    {activeItemModal.ownerMajor} · {activeItemModal.ownerDorm}
                  </span>
                </div>
                {activeItemModal.contactTelegram && (
                  <span className="font-mono text-xs text-[#65D5FF] bg-[#663AF3]/20 border border-[#663AF3]/35 px-2.5 py-1 rounded-lg">
                    {activeItemModal.contactTelegram}
                  </span>
                )}
              </div>

              {reservationSuccess ? (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>درخواست ثبت شد! پیام برای صاحب کالا در تلگرام ارسال گردید.</span>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => setReservationSuccess(true)}
                      className="btn-primary-futuristic py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>پیام و رزرو در تلگرام</span>
                    </button>

                    <button
                      onClick={() => setShowContactPhone(!showContactPhone)}
                      className="btn-secondary-futuristic py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{showContactPhone ? 'مخفی‌سازی شماره' : 'نمایش شماره تماس'}</span>
                    </button>
                  </div>

                  {showContactPhone && (
                    <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="font-bold block text-white">شماره تماس مستقیم:</span>
                          <span className="font-mono text-sm tracking-wider font-semibold block dir-ltr text-right text-emerald-300">
                            {activeItemModal.contactPhone || '۰۹۱۲۳۴۵۶۷۸۹'}
                          </span>
                        </div>
                      </div>
                      <a
                        href={`tel:${activeItemModal.contactPhone || '09123456789'}`}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors shadow-sm"
                      >
                        تماس
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
