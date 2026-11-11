import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { Priority, Task, TaskType, Course } from '../types';
import { getTodayJalaliString } from '../utils/persian';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  courses: Course[];
  initialType?: TaskType;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  courses,
  initialType = 'homework',
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>(initialType);
  const [courseName, setCourseName] = useState(courses[0]?.name || '');
  const [date, setDate] = useState(getTodayJalaliString());
  const [time, setTime] = useState('18:00');
  const [priority, setPriority] = useState<Priority>('medium');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: title.trim(),
      type,
      courseName: courseName || undefined,
      date,
      time,
      priority,
      done: false,
      notes: notes.trim() || undefined,
    };

    onAddTask(newTask);
    onClose();
    setTitle('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="glass-panel bg-[#0B1020]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/[0.12] shadow-2xl p-4 sm:p-6 space-y-4 text-right">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#663AF3]/20 border border-[#663AF3]/35 text-[#65D5FF]">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <h2 className="font-black text-sm text-[#F1F3FA]">
              ثبت مورد جدید (تکلیف، پروژه، امتحان)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#A6AEC3] mb-1.5">
              عنوان کار:
            </label>
            <input
              type="text"
              required
              placeholder="مثلاً: حل تمرین فصل ۳ فیزیک یا امتحان میان‌ترم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                نوع:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3] cursor-pointer"
              >
                <option value="homework" className="bg-[#0B1020]">تکلیف</option>
                <option value="project" className="bg-[#0B1020]">پروژه</option>
                <option value="exam" className="bg-[#0B1020]">امتحان</option>
                <option value="study" className="bg-[#0B1020]">مطالعه</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                درس مرتبط:
              </label>
              <select
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3] cursor-pointer"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#0B1020]">
                    {c.name}
                  </option>
                ))}
                <option value="" className="bg-[#0B1020]">سایر / غیر درسی</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                تاریخ شمسی:
              </label>
              <input
                type="text"
                placeholder="۱۴۰۴/۰۸/۲۴"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                ساعت:
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] outline-none focus:border-[#663AF3]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#A6AEC3] mb-1.5">
              اولویت:
            </label>
            <div className="flex items-center gap-2">
              {[
                { id: 'low', label: 'کم' },
                { id: 'medium', label: 'متوسط' },
                { id: 'high', label: 'بالا و فوری' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id as Priority)}
                  className={`flex-1 py-2 rounded-xl font-bold cursor-pointer transition-all ${
                    priority === p.id
                      ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white shadow-[0_0_15px_rgba(102,58,243,0.4)]'
                      : 'bg-[#11182A]/80 border border-white/[0.06] text-[#A6AEC3] hover:text-[#F1F3FA]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#A6AEC3] mb-1.5">
              یادداشت یا توضیحات:
            </label>
            <textarea
              rows={2}
              placeholder="مثلاً: سوالات ۲ تا ۵ تمرین یا جزوه دکتر سهرابی..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3] transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn-primary-futuristic text-xs px-5 py-2.5 font-bold cursor-pointer"
            >
              ذخیره در برنامه
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
