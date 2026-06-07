/**
 * Formats a price given in minor units (e.g. øre/cents) as a currency string.
 * Returns "Free" when the amount is 0.
 */
export const formatPrice = (minor: number, currency: string): string => {
  if (minor === 0) return "Free";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(minor / 100);
  } catch {
    return `${(minor / 100).toFixed(2)} ${currency}`;
  }
};

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/**
 * Formats an ISO date string using Intl, with the user's locale.
 * Pass `options` to override the default (e.g. short month, weekday, time).
 * Returns the original string if it can't be parsed.
 *
 * @example formatDate('2026-01-01')
 */
export const formatDate = (
  iso: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, options).format(d);
};

/** Removes everything except digits from a phone number string. */
export const digitsOnly = (value: string): string =>
  value.replace(/[^\d]/g, "");

/** Combines a country code and a raw number into a single E.164-ish string. */
export const combinePhone = (code: string, number: string): string => {
  if (!number.trim()) return "";
  return `${code}${digitsOnly(number)}`;
};
