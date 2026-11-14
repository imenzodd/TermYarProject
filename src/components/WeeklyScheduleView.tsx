import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, User, Plus, X, Sparkles, ImageDown, Check } from 'lucide-react';
import { Course, CourseSchedule } from '../types';
import { PERSIAN_DAYS, getJalaliWeekDays, toPersianDigits } from '../utils/persian';
import { repairLegacyGolestanGluedText, timeToMinutes } from '../utils/golestanParser';
import { exportScheduleToPng } from '../utils/scheduleExport';
import { BackButton } from './BackButton';

interface WeeklyScheduleViewProps {
  courses: Course[];
  onAddScheduleSlot: (courseId: string, slot: CourseSchedule) => void;
  lang?: 'en' | 'fa';
  onOpenGolestanModal?: () => void;
  onBack?: () => void;
  studentName?: string;
  university?: string;
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({
  courses,
  onAddScheduleSlot,
  lang = 'fa',
  onOpenGolestanModal,
  onBack,
  studentName,
  university,
}) => {
  const isFa = lang === 'fa';
  const [showAddModal, setShowAddModal] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [exportSaved, setExportSaved] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState(0);
  const [startTime, setStartTime] = useState('10:30');
  const [endTime, setEndTime] = useState('12:00');
  const [room, setRoom] = useState(isFa ? 'کلاس ۱۰۲ تالارها' : 'Room 302, Science Hall');

  const weekDays = getJalaliWeekDays();
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  // Flatten all class schedules with course info and sort chronologically (earliest at top -> latest at bottom)
  const scheduledClasses: Array<{
    course: Course;
    schedule: CourseSchedule;
  }> = [];

  courses.forEach((course) => {
    course.schedule.forEach((sch) => {
      scheduledClasses.push({ course, schedule: sch });
    });
  });

  scheduledClasses.sort((a, b) => {
    const startDiff = timeToMinutes(a.schedule.startTime) - timeToMinutes(b.schedule.startTime);
    if (startDiff !== 0) return startDiff;
    const endDiff = timeToMinutes(a.schedule.endTime) - timeToMinutes(b.schedule.endTime);
    if (endDiff !== 0) return endDiff;
    return a.course.name.localeCompare(b.course.name, 'fa');
  });

  const [activeMobileDay, setActiveMobileDay] = useState<number>(() => {
    const today = weekDays.find((d) => d.isToday);
    return today ? today.dayIndex : 0;
  });
  const [mobileViewMode, setMobileViewMode] = useState<'day' | 'table'>('day');

  const selectedMobileDayData = weekDays.find((d) => d.dayIndex === activeMobileDay) || weekDays[0];
  const selectedMobileClasses = scheduledClasses.filter((c) => c.schedule.day === activeMobileDay);

  const handleExportPng = async () => {
    if (courses.length === 0 || isExportingPng) return;
    setIsExportingPng(true);
    try {
      await exportScheduleToPng(courses, {
        studentName,
        university,
        lang,
      });
      setExportSaved(true);
      setTimeout(() => setExportSaved(false), 2600);
    } catch (err) {
      console.error('PNG schedule export failed:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    onAddScheduleSlot(selectedCourseId, {
      day: Number(selectedDay),
      startTime,
      endTime,
      room,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName={isFa ? 'داشبورد' : 'Dashboard'}
              lang={lang}
            />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F1F3FA] flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-[#39A7FF] shrink-0" />
              <span>{isFa ? 'برنامه هفتگی و کلاسی دانشگاه' : 'Weekly Class Schedule'}</span>
            </h1>
            <p className="text-xs text-[#A6AEC3] mt-1">
              {isFa
                ? 'مشاهده زمان‌بندی دقیق کلاس‌ها، اساتید و شماره اتاق‌ها در طول هفته'
                : 'Weekly timetable, classrooms, professors, and course time slots'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Mobile view toggle */}
          <div className="flex md:hidden items-center bg-[#11182A]/80 p-0.5 rounded-xl border border-white/[0.08] text-xs">
            <button
              onClick={() => setMobileViewMode('day')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                mobileViewMode === 'day'
                  ? 'nav-pill-active text-white font-bold'
                  : 'text-[#A6AEC3]'
              }`}
            >
              {isFa ? 'روزانه' : 'Day View'}
            </button>
            <button
              onClick={() => setMobileViewMode('table')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                mobileViewMode === 'table'
                  ? 'nav-pill-active text-white font-bold'
                  : 'text-[#A6AEC3]'
              }`}
            >
              {isFa ? 'کل هفته' : 'Full Week'}
            </button>
          </div>

          {/* Clean PNG Image Export Button */}
          <button
            type="button"
            onClick={handleExportPng}
            disabled={courses.length === 0 || isExportingPng}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all border ${
              exportSaved
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                : 'bg-white dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.12] text-slate-800 dark:text-[#F1F3FA] border-slate-200 dark:border-white/[0.1] shadow-xs'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isFa ? 'ذخیره تصویر باکیفیت برنامه هفتگی در گالری' : 'Save weekly schedule as clean PNG image'}
          >
            {exportSaved ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <ImageDown className="w-3.5 h-3.5 text-[#39A7FF] shrink-0" />
            )}
            <span>
              {exportSaved
                ? isFa
                  ? 'تصویر ذخیره شد ✓'
                  : 'Saved ✓'
                : isFa
                ? 'خروجی عکس تمیز'
                : 'Save Image'}
            </span>
          </button>

          {/* Golestan OCR Import Button */}
          {onOpenGolestanModal && (
            <button
              type="button"
              onClick={onOpenGolestanModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-primary-futuristic flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>{isFa ? 'استخراج از گلستان (گزارش ۸۸)' : 'Import Golestan PDF'}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (courses.length === 0) {
                alert(
                  isFa
                    ? 'برای تنظیم ساعات برنامه هفتگی، لطفاً ابتدا حداقل یک درس را از بخش «دروس و نمرات» اضافه نمایید یا فایل گلستان را بارگذاری کنید.'
                    : 'Please add at least one course in the Courses section first.'
                );
                return;
              }
              setShowAddModal(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-[#F1F3FA] bg-white dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFa ? 'افزودن کلاس دستی' : 'Add Class'}</span>
          </button>
        </div>
      </div>

      {/* Golestan OCR Feature Banner inside Weekly Schedule */}
      {onOpenGolestanModal && (
        <div className="p-4 rounded-2xl glass-card bg-gradient-to-r from-indigo-50 via-white to-sky-50 dark:from-[#663AF3]/20 dark:via-[#11182A] dark:to-[#39A7FF]/15 border border-indigo-200 dark:border-[#663AF3]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 glow-purple-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#663AF3] to-[#39A7FF] text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(102,58,243,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#F1F3FA] flex items-center gap-2">
                <span>{isFa ? 'استخراج خودکار برنامه هفتگی از فایل گلستان (گزارش ۸۸)' : 'Import Schedule from Golestan PDF'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-[#663AF3]/25 border border-indigo-200 dark:border-[#663AF3]/40 text-indigo-700 dark:text-[#C9BAFF]">
                  {isFa ? 'هوشمند' : 'Smart'}
                </span>
              </div>
              <p className="text-[11px] text-[#A6AEC3] mt-0.5">
                {isFa
                  ? 'فایل PDF یا تصویر انتخاب واحد گلستان را بارگذاری کنید تا تمام کلاس‌ها، اساتید، ساعات و شماره اتاق‌ها خودکار ثبت شوند.'
                  : 'Upload Golestan Report 88 PDF/image to auto-populate your semester courses and timetable.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenGolestanModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold btn-primary-futuristic text-white transition-all active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>{isFa ? 'بارگذاری برنامه گلستان' : 'Import Golestan'}</span>
          </button>
        </div>
      )}

      {/* MOBILE DAY SELECTOR VIEW */}
      {mobileViewMode === 'day' && (
        <div className="md:hidden space-y-4">
          {/* Days bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {weekDays.map((d) => {
              const count = scheduledClasses.filter((c) => c.schedule.day === d.dayIndex).length;
              const isSelected = activeMobileDay === d.dayIndex;
              return (
                <button
                  key={d.name}
                  onClick={() => setActiveMobileDay(d.dayIndex)}
                  className={`flex flex-col items-center py-2 px-3 rounded-2xl min-w-[68px] shrink-0 border transition-all ${
                    isSelected
                      ? 'nav-pill-active text-white border-transparent'
                      : d.isToday
                      ? 'bg-[#663AF3]/15 text-[#C9BAFF] border-[#663AF3]/30'
                      : 'bg-[#11182A]/80 text-[#A6AEC3] border-white/[0.08]'
                  }`}
                >
                  <span className="text-xs font-bold">{d.name}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#707B96]'}`}>
                    {d.dateStr}
                  </span>
                  {count > 0 && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full mt-1 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#663AF3]/30 text-[#C9BAFF]'
                      }`}
                    >
                      {toPersianDigits(count)} کلاس
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Day Classes Card List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#A6AEC3] px-1">
              <span className="font-bold text-[#F1F3FA]">
                کلاس‌های {selectedMobileDayData.name} ({selectedMobileDayData.dateStr})
              </span>
              <span>
                {selectedMobileClasses.length > 0
                  ? `${toPersianDigits(selectedMobileClasses.length)} جلسه آموزشی`
                  : 'تعطیل یا بدون کلاس'}
              </span>
            </div>

            {selectedMobileClasses.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-3xl border border-dashed border-white/[0.1]">
                <CalendarDays className="w-8 h-8 text-[#707B96] mx-auto mb-2" />
                <p className="text-xs text-[#A6AEC3] font-medium">
                  در این روز هیچ کلاسی ثبت نشده است. می‌توانید استراحت کنید یا به مطالعه بپردازید.
                </p>
              </div>
            ) : (
              selectedMobileClasses.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-card space-y-2.5 relative overflow-hidden"
                  style={{ borderInlineStartWidth: '4px', borderInlineStartColor: item.course.color || '#663AF3' }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#F1F3FA]">
                      {repairLegacyGolestanGluedText(item.course.name)}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#C9BAFF]">
                      {item.course.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#A6AEC3] pt-2 border-t border-white/[0.08]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#39A7FF] shrink-0" />
                      <span className="tabular-nums font-medium">
                        {toPersianDigits(item.schedule.startTime)} - {toPersianDigits(item.schedule.endTime)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{repairLegacyGolestanGluedText(item.schedule.room)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate col-span-2 text-[#707B96]">
                      <User className="w-3.5 h-3.5 text-[#707B96] shrink-0" />
                      <span>استاد: {repairLegacyGolestanGluedText(item.course.professor)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Week Calendar Grid (Visible on md+ or when mobileViewMode is 'table') */}
      <div className={`${mobileViewMode === 'table' ? 'block' : 'hidden md:block'} space-y-2`}>
        {mobileViewMode === 'table' && (
          <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-[#663AF3]/15 rounded-xl text-[11px] text-[#C9BAFF] font-medium border border-[#663AF3]/30">
            <span>{isFa ? '💡 برای دیدن تمام روزها، جدول را به چپ یا راست بکشید' : '💡 Swipe horizontally to view all week days'}</span>
            <span className="font-mono text-xs">⟷</span>
          </div>
        )}
        <div className="glass-panel rounded-3xl border border-white/[0.08] shadow-2xl overflow-x-auto">
          <div className="min-w-[720px]">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-white/[0.08] text-center bg-[#11182A]/80">
            {weekDays.map((d) => (
              <div
                key={d.name}
                className={`p-3 border-l border-white/[0.08] last:border-l-0 ${
                  d.isToday ? 'bg-[#663AF3]/20 font-bold text-[#65D5FF]' : 'text-[#F1F3FA]'
                }`}
              >
                <span className="block text-xs font-bold">{d.name}</span>
                <span className="block text-[10px] text-[#707B96] mt-0.5">{d.dateStr}</span>
              </div>
            ))}
          </div>

          {/* Calendar Body: 7 Days Columns */}
          <div className="grid grid-cols-7 min-h-[460px] divide-x divide-x-reverse divide-white/[0.06]">
            {weekDays.map((d) => {
              const dayClasses = scheduledClasses.filter((c) => c.schedule.day === d.dayIndex);

              return (
                <div
                  key={d.name}
                  className={`p-2 space-y-2 min-h-full ${
                    d.isToday ? 'bg-[#663AF3]/5' : ''
                  }`}
                >
                  {dayClasses.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-[#707B96]/50">
                      بدون کلاس
                    </div>
                  ) : (
                    dayClasses.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl text-right shadow-md border transition-all hover:scale-[1.02] backdrop-blur-md"
                        style={{
                          backgroundColor: `${item.course.color || '#663AF3'}20`,
                          borderColor: `${item.course.color || '#663AF3'}55`,
                          boxShadow: `0 0 12px ${item.course.color || '#663AF3'}25`,
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_6px_currentColor]"
                            style={{ backgroundColor: item.course.color || '#663AF3' }}
                          />
                          <h4 className="font-bold text-xs text-[#F1F3FA] truncate">
                            {repairLegacyGolestanGluedText(item.course.name)}
                          </h4>
                        </div>

                        <div className="mt-1.5 space-y-1 text-[10px] text-[#A6AEC3]">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#707B96] shrink-0" />
                            <span className="tabular-nums">
                              {toPersianDigits(item.schedule.startTime)} - {toPersianDigits(item.schedule.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-[#707B96] shrink-0" />
                            <span className="truncate">{repairLegacyGolestanGluedText(item.schedule.room)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] text-[#707B96] truncate">
                            <User className="w-3 h-3 text-[#707B96] shrink-0" />
                            <span className="truncate">{repairLegacyGolestanGluedText(item.course.professor)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-panel bg-[#0B1020]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/[0.1] shadow-2xl p-4 sm:p-6 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="font-black text-sm text-[#F1F3FA]">
                {isFa ? 'ثبت ساعت کلاسی جدید' : 'Add New Class Slot'}
              </span>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#F1F3FA] mb-1">
                  {isFa ? 'درس مربوطه:' : 'Select Course:'}
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id} className="bg-white dark:bg-[#0B1020] text-slate-900 dark:text-white">
                      {c.name} ({c.professor})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#F1F3FA] mb-1">
                  {isFa ? 'روز هفته:' : 'Day of Week:'}
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3]"
                >
                  {PERSIAN_DAYS.map((day, idx) => (
                    <option key={day} value={idx} className="bg-white dark:bg-[#0B1020] text-slate-900 dark:text-white">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-[#F1F3FA] mb-1">
                    {isFa ? 'ساعت شروع:' : 'Start Time:'}
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#F1F3FA] mb-1">
                    {isFa ? 'ساعت پایان:' : 'End Time:'}
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#F1F3FA] mb-1">
                  محل کلاس یا دانشکده:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: کلاس ۱۰۲ تالارها یا سایت ۲"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#11182A] border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl btn-primary-futuristic text-white font-bold"
                >
                  ثبت در تقویم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
