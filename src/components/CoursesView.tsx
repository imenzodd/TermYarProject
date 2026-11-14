import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Award, Clock, MapPin, X, Sparkles, FileSpreadsheet } from 'lucide-react';
import { Course } from '../types';
import { toPersianDigits } from '../utils/persian';
import { BackButton } from './BackButton';

interface CoursesViewProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onUpdateCourseProgress: (courseId: string, progress: number) => void;
  onDeleteCourse: (courseId: string) => void;
  onOpenGolestanModal?: () => void;
  onBack?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onAddCourse,
  onUpdateCourseProgress,
  onDeleteCourse,
  onOpenGolestanModal,
  onBack,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [units, setUnits] = useState(3);
  const [color, setColor] = useState('#4f46e5');
  const [currentGrade, setCurrentGrade] = useState(17);

  const totalUnits = courses.reduce((acc, c) => acc + c.units, 0);
  const avgProgress = courses.length
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newCourse: Course = {
      id: `c_${Date.now()}`,
      name: name.trim(),
      code: name.trim().slice(0, 4).toUpperCase() + '101',
      professor: professor.trim() || 'نامشخص',
      credits: Number(units),
      units: Number(units),
      color,
      progress: 0,
      currentGrade: Number(currentGrade),
      schedule: [],
    };
    onAddCourse(newCourse);
    setName('');
    setProfessor('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName="داشبورد"
            />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F1F3FA] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#39A7FF] shrink-0" />
              <span>دروس و نمرات ترم جاری</span>
            </h1>
            <p className="text-xs text-[#A6AEC3] mt-1">
              مجموعاً {toPersianDigits(courses.length)} درس ثبت شده ({toPersianDigits(totalUnits)} واحد تحصیلی)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {onOpenGolestanModal && (
            <button
              type="button"
              onClick={onOpenGolestanModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-primary-futuristic flex items-center gap-1.5 shrink-0 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>استخراج از گلستان (گزارش ۸۸)</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#F1F3FA] bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>افزودن درس دستی</span>
          </button>
        </div>
      </div>

      {/* Course Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4.5 rounded-2xl glass-card glow-purple-sm">
          <span className="text-xs text-[#707B96] font-medium">تعداد واحدهای انتخابی</span>
          <div className="text-2xl font-black text-[#F1F3FA] mt-1 tabular-nums">
            {toPersianDigits(totalUnits)} واحد
          </div>
        </div>

        <div className="p-4.5 rounded-2xl glass-card glow-purple-sm">
          <span className="text-xs text-[#707B96] font-medium">میانگین پیشرفت سرفصل‌ها</span>
          <div className="text-2xl font-black text-[#39A7FF] mt-1 tabular-nums">
            {toPersianDigits(avgProgress)}٪
          </div>
        </div>

        <div className="p-4.5 rounded-2xl glass-card glow-purple-sm">
          <span className="text-xs text-[#707B96] font-medium">وضعیت سرفصل دروس</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            مناسب و در حال پیشرفت
          </div>
        </div>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="p-12 text-center glass-card rounded-3xl border border-dashed border-white/[0.1] space-y-3">
          <BookOpen className="w-10 h-10 text-[#707B96] mx-auto" />
          <h3 className="font-bold text-sm text-[#F1F3FA]">
            هنوز درسی برای این ترم اضافه نکرده‌اید
          </h3>
          <p className="text-xs text-[#A6AEC3] max-w-sm mx-auto">
            با کلیک روی دکمه زیر، اولین درس (نام درس، تعداد واحد و نام استاد) را ثبت کنید تا برنامه هفتگی و پیشرفت شما فعال شود.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-2 px-4 py-2.5 rounded-xl text-xs font-bold btn-primary-futuristic text-white cursor-pointer"
          >
            + افزودن اولین درس ترم
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl glass-card space-y-4 hover:border-[#663AF3]/50 transition-all hover:scale-[1.01]"
            >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                  style={{
                    backgroundColor: course.color || '#663AF3',
                    boxShadow: `0 0 15px ${course.color || '#663AF3'}40`,
                  }}
                >
                  {course.units}و
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#F1F3FA]">
                    {course.name}
                  </h3>
                  <span className="text-xs text-[#A6AEC3]">
                    استاد: {course.professor} · {toPersianDigits(course.units)} واحد
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`آیا از حذف درس ${course.name} اطمینان دارید؟`)) {
                    onDeleteCourse(course.id);
                  }
                }}
                className="p-1.5 text-[#707B96] hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                title="حذف درس"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A6AEC3] font-medium">
                  پیشرفت تدریس / مطالعه سرفصل‌ها:
                </span>
                <span className="font-bold text-[#39A7FF] tabular-nums">
                  {toPersianDigits(course.progress)}٪
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={course.progress}
                onChange={(e) => onUpdateCourseProgress(course.id, Number(e.target.value))}
                className="w-full accent-[#663AF3] cursor-pointer h-2 bg-[#11182A] rounded-lg border border-white/[0.04]"
              />
            </div>

            {/* Estimated Grade & Classroom Schedule */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A6AEC3]">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>نمره تخمینی: </span>
                <span className="font-bold text-[#F1F3FA] tabular-nums">
                  {toPersianDigits(course.currentGrade || 16)} از ۲۰
                </span>
              </div>

              <span className="text-[#707B96]">{toPersianDigits(course.schedule.length)} جلسه در هفته</span>
            </div>
          </div>
        ))}
      </div>
    )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-panel bg-[#0B1020]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/[0.12] shadow-2xl p-4 sm:p-6 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="font-black text-sm text-[#F1F3FA]">
                ثبت درس جدید ترم
              </span>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#A6AEC3] mb-1.5">
                  نام درس:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: ریاضی مهندسی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-[#A6AEC3] mb-1.5">
                  نام استاد:
                </label>
                <input
                  type="text"
                  placeholder="دکتر ..."
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#A6AEC3] mb-1.5">
                    تعداد واحد:
                  </label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] outline-none transition-all"
                  >
                    {[1, 2, 3, 4].map((u) => (
                      <option key={u} value={u} className="bg-[#0B1020] text-[#F1F3FA]">
                        {toPersianDigits(u)} واحد
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#A6AEC3] mb-1.5">
                    هدف نمره:
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#A6AEC3] mb-1.5">
                  رنگ برچسب درس:
                </label>
                <div className="flex items-center gap-2">
                  {['#663AF3', '#39A7FF', '#65D5FF', '#10B981', '#F59E0B', '#EC4899'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                        color === c ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#080B16] ring-[#39A7FF] scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn-primary-futuristic text-xs px-5 py-2 cursor-pointer font-bold"
                >
                  ذخیره درس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
