import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
  label?: string;
  previousPageName?: string;
  hasUnsavedChanges?: boolean;
  unsavedWarningMessage?: string;
  lang?: 'en' | 'fa';
  className?: string;
  variant?: 'subtle' | 'solid' | 'floating';
}

export const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  label,
  previousPageName,
  hasUnsavedChanges = false,
  unsavedWarningMessage,
  lang = 'fa',
  className = '',
  variant = 'subtle',
}) => {
  const isFa = lang === 'fa';
  const defaultLabel = label || (isFa ? 'بازگشت' : 'Back');
  const warningText =
    unsavedWarningMessage ||
    (isFa
      ? 'شما تغییرات ذخیره‌نشده دارید. آیا مطمئنید که می‌خواهید بدون ذخیره بازگردید؟'
      : 'You have unsaved changes. Are you sure you want to go back without saving?');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(warningText);
      if (!confirmLeave) return;
    }
    onBack();
  };

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95 select-none ${className}`}
        title={previousPageName ? `${defaultLabel} به ${previousPageName}` : defaultLabel}
      >
        <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 rtl:rotate-0 ltr:rotate-180 transition-transform group-hover:-translate-x-0.5" />
        <span>{defaultLabel}</span>
        {previousPageName && (
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500 text-[11px] font-normal">
            ({previousPageName})
          </span>
        )}
      </button>
    );
  }

  if (variant === 'solid') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all active:scale-95 select-none ${className}`}
        title={defaultLabel}
      >
        <ArrowRight className="w-4 h-4 shrink-0 rtl:rotate-0 ltr:rotate-180 transition-transform group-hover:-translate-x-1" />
        <span>{defaultLabel}</span>
        {previousPageName && (
          <span className="opacity-75 text-[11px] font-normal">
            • {previousPageName}
          </span>
        )}
      </button>
    );
  }

  // Default 'subtle' variant
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60 transition-all active:scale-95 select-none ${className}`}
      title={previousPageName ? `${defaultLabel} به ${previousPageName}` : defaultLabel}
    >
      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 rtl:rotate-0 ltr:rotate-180 transition-transform group-hover:-translate-x-0.5" />
      <span>{defaultLabel}</span>
      {previousPageName && (
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
          به {previousPageName}
        </span>
      )}
    </button>
  );
};
