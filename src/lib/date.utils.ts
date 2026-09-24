import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export { dayjs };

/**
 * Formats date to human-readable format e.g. "Sep 17, 2026"
 */
export function formatDate(
  date?: string | Date | number | null,
  format: string = "MMM D, YYYY"
): string {
  if (!date) return "";
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : "";
}

/**
 * Formats date and time e.g. "Sep 17, 2026, 11:30 PM"
 */
export function formatDateTime(
  date?: string | Date | number | null,
  format: string = "MMM D, YYYY, h:mm A"
): string {
  if (!date) return "";
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : "";
}

/**
 * Formats month and year e.g. "Jan 2024"
 */
export function formatMonthYear(
  date?: string | Date | number | null
): string {
  if (!date) return "";
  const d = dayjs(date);
  return d.isValid() ? d.format("MMM YYYY") : "";
}

/**
 * Formats relative time from now e.g. "3 hours ago", "in 2 days"
 */
export function formatTimeAgo(
  date?: string | Date | number | null
): string {
  if (!date) return "";
  const d = dayjs(date);
  return d.isValid() ? d.fromNow() : "";
}

/**
 * Formats date for HTML <input type="date"> (YYYY-MM-DD)
 */
export function formatInputDate(
  date?: string | Date | number | null
): string {
  if (!date) return "";
  const d = dayjs(date);
  return d.isValid() ? d.format("YYYY-MM-DD") : "";
}

/**
 * Returns ISO string if valid, otherwise undefined
 */
export function toISO(
  date?: string | Date | number | null
): string | undefined {
  if (!date) return undefined;
  const d = dayjs(date);
  return d.isValid() ? d.toISOString() : undefined;
}
