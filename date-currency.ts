import { id as localeId } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

export const APP_TIMEZONE = 'Asia/Jakarta';

export function formatRupiah(amount: number | bigint): string {
  const numericAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
  return formatted.replace(/\s+/g, '');
}

export function formatDateWIB(dateInput: Date | string): string {
  const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return formatInTimeZone(dateObj, APP_TIMEZONE, 'dd MMM yyyy', { locale: localeId });
}

export function addMonthsSafe(startDateStr: string, monthsToAdd: number, anchorDay?: number): string {
  const [year, month, day] = startDateStr.split('-').map(Number);
  const targetDay = anchorDay ?? day;
  const totalMonths = (year * 12 + (month - 1)) + monthsToAdd;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonthIndex = totalMonths % 12;
  const maxDaysInTargetMonth = new Date(Date.UTC(targetYear, targetMonthIndex + 1, 0)).getUTCDate();
  const clampedDay = Math.min(targetDay, maxDaysInTargetMonth);
  const yyyy = String(targetYear).padStart(4, '0');
  const mm = String(targetMonthIndex + 1).padStart(2, '0');
  const dd = String(clampedDay).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function normalizeWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('08')) return '62' + digits.slice(1);
  if (digits.startsWith('8')) return '62' + digits;
  return digits;
}
