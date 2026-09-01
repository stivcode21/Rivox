export const formatDuration = (seconds = 0) => {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export const formatListeners = (count = 0) => {
  if (count >= 1_000_000) {
    const value = count / 1_000_000;
    const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    return `${formatted}M`;
  }

  if (count >= 1_000) {
    const value = count / 1_000;
    const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    return `${formatted}K`;
  }

  return String(count);
};
