import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const dayFromNow = (date?: Date | string) => {
  const now = dayjs();
  const target = dayjs(date);

  const diffMinutes = now.diff(target, "minute");
  const diffHours = now.diff(target, "hour");
  const diffDays = now.diff(target, "day");
  const diffMonths = now.diff(target, "month");
  const diffYears = now.diff(target, "year");

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};
