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
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#11182A]/90 text-[#F1F3FA] border border-white/[0.1] shadow-lg hover:bg-white/[0.08] hover:text-[#65D5FF] transition-all active:scale-95 select-none ${className}`}
        title={previousPageName ? `${defaultLabel} به ${previousPageName}` : defaultLabel}
      >
        <ArrowRight className="w-4 h-4 text-[#39A7FF] shrink-0 rtl:rotate-0 ltr:rotate-180 transition-transform group-hover:-translate-x-0.5" />
        <span>{defaultLabel}</span>
        {previousPageName && (
          <span className="hidden sm:inline text-[#707B96] text-[11px] font-normal">
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
        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold btn-primary-futuristic text-white transition-all active:scale-95 select-none ${className}`}
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
      className={`group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-[#A6AEC3] bg-[#11182A]/80 hover:bg-white/[0.08] hover:text-[#F1F3FA] border border-white/[0.08] transition-all active:scale-95 select-none ${className}`}
      title={previousPageName ? `${defaultLabel} به ${previousPageName}` : defaultLabel}
    >
      <ArrowRight className="w-3.5 h-3.5 text-[#707B96] group-hover:text-[#39A7FF] shrink-0 rtl:rotate-0 ltr:rotate-180 transition-transform group-hover:-translate-x-0.5" />
      <span>{defaultLabel}</span>
      {previousPageName && (
        <span className="text-[11px] text-[#707B96] font-normal">
          به {previousPageName}
        </span>
      )}
    </button>
  );
};
