import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, Clock, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Priority, Task, TaskType } from '../types';
import { toPersianDigits } from '../utils/persian';
import { BackButton } from './BackButton';

interface TasksViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onOpenNewTaskModal: (defaultType?: TaskType) => void;
  isExamOnly?: boolean;
  onBack?: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onOpenNewTaskModal,
  isExamOnly = false,
  onBack,
}) => {
  const [filterType, setFilterType] = useState<string>(isExamOnly ? 'exam' : 'all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    if (isExamOnly && task.type !== 'exam') return false;
    if (!isExamOnly && filterType !== 'all' && task.type !== filterType) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterStatus === 'pending' && task.done) return false;
    if (filterStatus === 'done' && !task.done) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          {onBack && (
            <BackButton
              onBack={onBack}
              previousPageName="داشبورد"
            />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F1F3FA] flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-[#663AF3]/25 to-[#39A7FF]/15 border border-[#663AF3]/30 text-[#65D5FF] shadow-[0_0_15px_rgba(102,58,243,0.3)]">
                <CheckSquare className="w-5 h-5 shrink-0" />
              </span>
              <span>{isExamOnly ? 'تقویم و برنامه امتحانات ترم' : 'تکالیف، پروژه‌ها و مهلت‌ها'}</span>
            </h1>
            <p className="text-xs text-[#A6AEC3] mt-1.5">
              {isExamOnly
                ? 'برنامه‌ریزی، خلاصه زمان‌بندی و پایش آمادگی برای امتحانات میان‌ترم و پایان‌ترم'
                : 'لیست هوشمند وظایف با اولویت‌بندی، تاریخ تحویل و تفکیک بر اساس دروس'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenNewTaskModal(isExamOnly ? 'exam' : 'homework')}
          className="btn-primary-futuristic text-xs px-4 py-2.5 flex items-center gap-2 self-start sm:self-auto cursor-pointer font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>{isExamOnly ? 'ثبت تاریخ امتحان جدید' : 'افزودن کار یا تکلیف'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      {!isExamOnly && (
        <div className="glass-panel p-3 rounded-2xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#11182A]/80 border border-white/[0.06] rounded-xl overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'all', label: 'همه موارد' },
              { id: 'homework', label: 'تکالیف' },
              { id: 'project', label: 'پروژه‌ها' },
              { id: 'exam', label: 'امتحانات' },
              { id: 'study', label: 'مطالعه' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-[#663AF3] to-[#39A7FF] text-white font-bold shadow-[0_0_15px_rgba(102,58,243,0.4)]'
                    : 'text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] outline-none cursor-pointer text-xs focus:border-[#663AF3]"
            >
              <option value="all" className="bg-[#0B1020] text-[#F1F3FA]">همه وضعیت‌ها</option>
              <option value="pending" className="bg-[#0B1020] text-[#F1F3FA]">در حال انجام</option>
              <option value="done" className="bg-[#0B1020] text-[#F1F3FA]">انجام شده</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] outline-none cursor-pointer text-xs focus:border-[#663AF3]"
            >
              <option value="all" className="bg-[#0B1020] text-[#F1F3FA]">همه اولویت‌ها</option>
              <option value="high" className="bg-[#0B1020] text-[#F1F3FA]">اولویت بالا</option>
              <option value="medium" className="bg-[#0B1020] text-[#F1F3FA]">اولویت متوسط</option>
              <option value="low" className="bg-[#0B1020] text-[#F1F3FA]">اولویت کم</option>
            </select>
          </div>
        </div>
      )}

      {/* Task Rows List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl border border-white/[0.08] text-[#707B96]">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#39A7FF]/40" />
            <p className="font-bold text-sm text-[#A6AEC3]">هیچ موردی با این فیلتر ثبت نشده است.</p>
            <p className="text-xs text-[#707B96] mt-1">با کلیک روی دکمه ثبت مورد جدید، تسک‌های ترم را مدیریت کنید.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                task.done
                  ? 'glass-card bg-[#0B1020]/40 border-white/[0.04] opacity-55'
                  : 'glass-card-interactive bg-[#0B1020]/75 border-white/[0.08] hover:border-[#663AF3]/40 hover:shadow-[0_4px_24px_rgba(102,58,243,0.12)]'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggleTask(task.id)}
                  className="w-5 h-5 rounded-lg text-[#663AF3] accent-[#663AF3] cursor-pointer mt-0.5 shrink-0 bg-[#11182A] border-white/[0.2]"
                />

                <div className="min-w-0 flex-1">
                  <h3 className={`font-bold text-sm leading-snug ${
                    task.done ? 'line-through text-[#707B96]' : 'text-[#F1F3FA]'
                  }`}>
                    {task.title}
                  </h3>

                  {task.notes && (
                    <p className="text-xs text-[#A6AEC3] mt-1 line-clamp-1">
                      {task.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#707B96] mt-2">
                    {task.courseName && (
                      <span className="font-semibold text-[#65D5FF] bg-[#39A7FF]/10 px-2 py-0.5 rounded-md border border-[#39A7FF]/20">
                        {task.courseName}
                      </span>
                    )}
                    <span className="flex items-center gap-1 tabular-nums text-[#A6AEC3]">
                      <Calendar className="w-3.5 h-3.5 text-[#39A7FF]" />
                      {toPersianDigits(task.date)}
                    </span>
                    {task.time && (
                      <span className="flex items-center gap-1 tabular-nums text-[#A6AEC3]">
                        <Clock className="w-3.5 h-3.5 text-[#707B96]" />
                        ساعت {toPersianDigits(task.time)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  task.priority === 'high'
                    ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30'
                    : task.priority === 'medium'
                    ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-[#A6AEC3] border-slate-200 dark:border-white/[0.08]'
                }`}>
                  اولویت {task.priority === 'high' ? 'زیاد' : task.priority === 'medium' ? 'متوسط' : 'کم'}
                </span>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                  task.type === 'homework'
                    ? 'bg-sky-50 dark:bg-[#39A7FF]/15 text-sky-700 dark:text-[#65D5FF] border-sky-200 dark:border-[#39A7FF]/30'
                    : task.type === 'project'
                    ? 'bg-indigo-50 dark:bg-[#663AF3]/20 text-indigo-700 dark:text-[#A6AEC3] border-indigo-200 dark:border-[#663AF3]/40'
                    : task.type === 'exam'
                    ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30'
                    : 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
                }`}>
                  {task.type === 'homework' ? 'تکلیف' : task.type === 'project' ? 'پروژه' : task.type === 'exam' ? 'امتحان' : 'مطالعه'}
                </span>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-[#707B96] hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="حذف کار"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
