import { Course, CourseSchedule, Task } from '../types';
import { cleanPersianText, timeToMinutes, toEnDigits } from './golestanParser';
import { PERSIAN_DAYS, toPersianDigits } from './persian';

interface ExportScheduleOptions {
  studentName?: string;
  university?: string;
  lang?: 'fa' | 'en';
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let trimmed = text;
  while (trimmed.length > 1 && ctx.measureText(trimmed + '...').width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed + '...';
}

/**
 * Renders a crisp, gallery-ready PNG image of the weekly class schedule
 * with every day sorted chronologically from earliest (top) to latest (bottom).
 */
export async function exportScheduleToPng(
  courses: Course[],
  options: ExportScheduleOptions = {}
): Promise<{ ok: boolean; fileName: string }> {
  const { studentName, university, lang = 'fa' } = options;
  const isFa = lang === 'fa';

  // Ensure web fonts (Vazirmatn) are ready before drawing
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // continue with system font fallback
    }
  }

  // Group and strictly sort classes per day (0=شنبه ... 6=جمعه)
  const dayBuckets: Array<{
    dayIndex: number;
    dayName: string;
    items: Array<{ course: Course; schedule: CourseSchedule }>;
  }> = [];

  // Include Saturday..Wednesday always, plus Thu/Fri only if classes exist on them
  const hasThu = courses.some((c) => c.schedule.some((s) => s.day === 5));
  const hasFri = courses.some((c) => c.schedule.some((s) => s.day === 6));
  const activeDayIndices = [0, 1, 2, 3, 4];
  if (hasThu) activeDayIndices.push(5);
  if (hasFri) activeDayIndices.push(6);

  const enDayNames = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  for (const dayIdx of activeDayIndices) {
    const items: Array<{ course: Course; schedule: CourseSchedule }> = [];
    courses.forEach((course) => {
      course.schedule.forEach((sch) => {
        if (sch.day === dayIdx) {
          items.push({ course, schedule: sch });
        }
      });
    });

    items.sort((a, b) => {
      const diff = timeToMinutes(a.schedule.startTime) - timeToMinutes(b.schedule.startTime);
      if (diff !== 0) return diff;
      return a.course.name.localeCompare(b.course.name, 'fa');
    });

    dayBuckets.push({
      dayIndex: dayIdx,
      dayName: isFa ? PERSIAN_DAYS[dayIdx] : enDayNames[dayIdx],
      items,
    });
  }

  // RTL order places شنبه on the rightmost column
  const orderedColumns = isFa ? [...dayBuckets].reverse() : dayBuckets;
  const maxItemsInDay = Math.max(1, ...orderedColumns.map((d) => d.items.length));

  const scale = 2;
  const colCount = orderedColumns.length;
  const paddingX = 48;
  const colGap = 16;
  const colWidth = 236;
  const canvasWidth = paddingX * 2 + colCount * colWidth + (colCount - 1) * colGap;
  const headerHeight = 128;
  const dayHeaderHeight = 52;
  const cardHeight = 132;
  const cardGap = 14;
  const bodyTopPad = 18;
  const footerHeight = 54;
  const contentHeight =
    dayHeaderHeight + bodyTopPad + maxItemsInDay * cardHeight + (maxItemsInDay - 1) * cardGap + 24;
  const canvasHeight = headerHeight + contentHeight + footerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = '#FAF8F3';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Soft top editorial accent strip
  const accentGrad = ctx.createLinearGradient(0, 0, canvasWidth, 0);
  accentGrad.addColorStop(0, '#4F46E5');
  accentGrad.addColorStop(0.5, '#0EA5E9');
  accentGrad.addColorStop(1, '#10B981');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(0, 0, canvasWidth, 8);

  const fontStack = 'Vazirmatn, "Segoe UI", Tahoma, Arial, sans-serif';

  // Header text
  ctx.direction = isFa ? 'rtl' : 'ltr';
  ctx.textAlign = isFa ? 'right' : 'left';
  const headerAnchorX = isFa ? canvasWidth - paddingX : paddingX;

  ctx.fillStyle = '#0F172A';
  ctx.font = `900 28px ${fontStack}`;
  ctx.fillText(isFa ? 'برنامه هفتگی کلاس‌ها' : 'Weekly Class Schedule', headerAnchorX, 58);

  const totalUnits = courses.reduce((sum, c) => sum + (Number(c.units ?? c.credits) || 0), 0);
  const subParts = [
    studentName ? cleanPersianText(studentName) : '',
    university ? cleanPersianText(university) : '',
    isFa
      ? `${toPersianDigits(courses.length)} درس · ${toPersianDigits(totalUnits)} واحد`
      : `${courses.length} Courses · ${totalUnits} Credits`,
  ].filter(Boolean);

  ctx.fillStyle = '#475569';
  ctx.font = `600 14px ${fontStack}`;
  ctx.fillText(subParts.join('  ·  '), headerAnchorX, 90);

  // Brand badge on opposite corner
  ctx.textAlign = isFa ? 'left' : 'right';
  const brandX = isFa ? paddingX : canvasWidth - paddingX;
  ctx.fillStyle = '#18181B';
  ctx.font = `800 15px ${fontStack}`;
  ctx.fillText('TERMYAR · ترم‌یار', brandX, 62);
  ctx.fillStyle = '#64748B';
  ctx.font = `500 12px ${fontStack}`;
  ctx.fillText(isFa ? 'مرتب‌سازی ساعتی از صبح به عصر' : 'Sorted earliest to latest', brandX, 86);

  // Main table container card
  const tableX = paddingX;
  const tableY = headerHeight;
  const tableW = canvasWidth - paddingX * 2;
  const tableH = contentHeight;

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, tableX, tableY, tableW, tableH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Columns
  orderedColumns.forEach((col, idx) => {
    const colX = tableX + idx * (colWidth + colGap) + (idx === 0 ? 0 : 0);
    // Use equal grid columns inside tableW
    const cellW = (tableW - colGap * (colCount - 1) - 32) / colCount;
    const cellX = tableX + 16 + idx * (cellW + colGap);

    // Day Header Pill
    ctx.fillStyle = col.items.length > 0 ? '#EEF2FF' : '#F8FAFC';
    roundRect(ctx, cellX, tableY + 14, cellW, dayHeaderHeight - 8, 14);
    ctx.fill();
    ctx.strokeStyle = col.items.length > 0 ? 'rgba(79, 70, 229, 0.22)' : 'rgba(15, 23, 42, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.direction = isFa ? 'rtl' : 'ltr';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0F172A';
    ctx.font = `800 15px ${fontStack}`;
    ctx.fillText(col.dayName, cellX + cellW / 2, tableY + 42);

    if (col.items.length === 0) {
      ctx.fillStyle = '#94A3B8';
      ctx.font = `500 13px ${fontStack}`;
      ctx.fillText(isFa ? 'بدون کلاس' : 'No classes', cellX + cellW / 2, tableY + dayHeaderHeight + 80);
      return;
    }

    col.items.forEach((item, itemIdx) => {
      const cardY = tableY + dayHeaderHeight + bodyTopPad + itemIdx * (cardHeight + cardGap);
      const color = item.course.color || '#4F46E5';

      // Soft tinted background
      ctx.fillStyle = `${color}12`;
      roundRect(ctx, cellX, cardY, cellW, cardHeight, 16);
      ctx.fill();

      ctx.strokeStyle = `${color}45`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Colored accent bar (right side for RTL, left side for LTR)
      ctx.fillStyle = color;
      const barW = 5;
      const barX = isFa ? cellX + cellW - barW : cellX;
      roundRect(ctx, barX, cardY + 12, barW, cardHeight - 24, 3);
      ctx.fill();

      const textPad = 14;
      const textX = isFa ? cellX + cellW - textPad - 6 : cellX + textPad + 6;
      const maxTextW = cellW - textPad * 2 - 8;

      ctx.direction = isFa ? 'rtl' : 'ltr';
      ctx.textAlign = isFa ? 'right' : 'left';

      // Course Title
      ctx.fillStyle = '#0F172A';
      ctx.font = `800 14px ${fontStack}`;
      const cleanName = cleanPersianText(item.course.name);
      ctx.fillText(truncateText(ctx, cleanName, maxTextW), textX, cardY + 30);

      // Time Range
      ctx.fillStyle = '#1E293B';
      ctx.font = `700 13px ${fontStack}`;
      const timeStr = isFa
        ? `${toPersianDigits(item.schedule.startTime)} تا ${toPersianDigits(item.schedule.endTime)}`
        : `${item.schedule.startTime} - ${item.schedule.endTime}`;
      ctx.fillText(`🕒 ${timeStr}`, textX, cardY + 58);

      // Room
      ctx.fillStyle = '#475569';
      ctx.font = `500 12px ${fontStack}`;
      const cleanRoom = cleanPersianText(item.schedule.room || 'کلاس دانشگاهی');
      ctx.fillText(truncateText(ctx, `📍 ${cleanRoom}`, maxTextW), textX, cardY + 84);

      // Professor
      ctx.fillStyle = '#64748B';
      ctx.font = `500 11.5px ${fontStack}`;
      const cleanProf = cleanPersianText(item.course.professor || '');
      ctx.fillText(truncateText(ctx, `👤 ${cleanProf}`, maxTextW), textX, cardY + 109);
    });
  });

  // Footer
  ctx.direction = isFa ? 'rtl' : 'ltr';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748B';
  ctx.font = `500 12px ${fontStack}`;
  ctx.fillText(
    isFa
      ? 'ساخته‌شده با پلتفرم دانشجویی ترم‌یار (TermYar)'
      : 'Generated by TermYar Student Productivity Platform',
    canvasWidth / 2,
    canvasHeight - 22
  );

  // Trigger Download
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const fileName = isFa ? 'TermYar-Barname-Haftegi.png' : 'TermYar-Weekly-Schedule.png';
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return { ok: true, fileName };
}

/**
 * Jalali (Shamsi) to Gregorian date conversion (Borkowski algorithm)
 */
function jalaliToGregorian(jy: number, jm: number, jd: number): { gy: number; gm: number; gd: number } {
  let gy: number;
  let jyAdj = jy;
  if (jyAdj > 979) {
    gy = 1600;
    jyAdj -= 979;
  } else {
    gy = 621;
  }

  let days =
    365 * jyAdj +
    Math.floor(jyAdj / 33) * 8 +
    Math.floor(((jyAdj % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    days--;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;
  const salA = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 0;
  for (gm = 1; gm <= 12; gm++) {
    const v = salA[gm];
    if (gd <= v) break;
    gd -= v;
  }

  return { gy, gm, gd };
}

function parseTaskDateToGregorian(dateStr: string): { year: number; month: number; day: number } {
  const normalized = toEnDigits(dateStr || '').trim();
  const match = normalized.match(/(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})/);

  if (match) {
    const y = Number(match[1]);
    const m = Number(match[2]);
    const d = Number(match[3]);
    if (y >= 1300 && y <= 1500) {
      const { gy, gm, gd } = jalaliToGregorian(y, m, d);
      return { year: gy, month: gm, day: gd };
    }
    if (y >= 1900 && y <= 2200) {
      return { year: y, month: m, day: d };
    }
  }

  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

function formatIcsUtc(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}` +
    `${pad(date.getUTCMonth() + 1)}` +
    `${pad(date.getUTCDate())}T` +
    `${pad(date.getUTCHours())}` +
    `${pad(date.getUTCMinutes())}` +
    `${pad(date.getUTCSeconds())}Z`
  );
}

function escapeIcsText(str: string): string {
  return (str || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Generates and downloads an RFC 5545 .ics calendar file for exams,
 * directly importable into Google Calendar, Apple Calendar, and Outlook.
 */
export function exportExamsToIcs(
  tasks: Task[],
  lang: 'fa' | 'en' = 'fa'
): { count: number; fileName: string } {
  const exams = tasks.filter((t) => t.type === 'exam');
  if (exams.length === 0) {
    return { count: 0, fileName: '' };
  }

  const dtStamp = formatIcsUtc(new Date());
  const events: string[] = [];

  exams.forEach((exam) => {
    const { year, month, day } = parseTaskDateToGregorian(exam.date);
    const timeCleaned = toEnDigits(exam.time || '09:00');
    const timeMatch = timeCleaned.match(/(\d{1,2}):(\d{2})/);
    const hh = timeMatch ? Number(timeMatch[1]) : 9;
    const mm = timeMatch ? Number(timeMatch[2]) : 0;

    // Interpret exam time as Tehran local time (UTC+03:30 permanent)
    const startUtcMs = Date.UTC(year, month - 1, day, hh, mm, 0) - 210 * 60 * 1000;
    const endUtcMs = startUtcMs + 120 * 60 * 1000; // Default 2-hour exam duration

    const dtStart = formatIcsUtc(new Date(startUtcMs));
    const dtEnd = formatIcsUtc(new Date(endUtcMs));
    const summary = exam.courseName
      ? `${exam.title} (${exam.courseName})`
      : exam.title;
    const descParts = [
      exam.courseName ? `درس: ${exam.courseName}` : '',
      exam.courseCode ? `کد درس: ${exam.courseCode}` : '',
      exam.notes ? `توضیحات: ${exam.notes}` : '',
      'ثبت‌شده توسط پلتفرم دانشجویی ترم‌یار (TermYar)',
    ].filter(Boolean);

    events.push(
      [
        'BEGIN:VEVENT',
        `UID:${exam.id}-${dtStamp}@termyar.app`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${escapeIcsText(summary)}`,
        `DESCRIPTION:${escapeIcsText(descParts.join('\n'))}`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeIcsText(`یادآور ۱ روز مانده تا ${summary}`)}`,
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-PT2H',
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeIcsText(`یادآور ۲ ساعت مانده تا ${summary}`)}`,
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n')
    );
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TermYar//Academic Exams Calendar//FA',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = lang === 'fa' ? 'TermYar-Exams-Calendar.ics' : 'TermYar-Exams.ics';
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { count: exams.length, fileName };
}
