// For formatting dates, text, etc.
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return "Unknown";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function truncateText(text, maxLength = 150) {
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

