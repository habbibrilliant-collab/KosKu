export type AllowedDurationMonths = 1 | 3 | 6 | 8 | 12;
export const ALLOWED_DURATIONS: AllowedDurationMonths[] = [1, 3, 6, 8, 12];

export interface DurationDiscountMap {
  '1'?: number;
  '3'?: number;
  '6'?: number;
  '8'?: number;
  '12'?: number;
}

export function calculateMultiMonthPayment(params: {
  monthlyPrice: number;
  monthsCount: AllowedDurationMonths;
  discounts?: DurationDiscountMap;
  lateFeeAmount?: number;
}) {
  const { monthlyPrice, monthsCount, discounts = {}, lateFeeAmount = 0 } = params;
  const subtotal = monthlyPrice * monthsCount;
  const rawPct = Number(discounts[String(monthsCount) as keyof DurationDiscountMap] ?? 0);
  const discountPercent = Math.max(0, Math.min(100, rawPct));
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + lateFeeAmount);

  return {
    monthsCount,
    monthlyPrice,
    subtotal,
    discountPercent,
    discountAmount,
    lateFeeAmount,
    grandTotal,
  };
}
