export function formatMessageTime(date) {
  const messageDate = new Date(date);
  const now = new Date();

  const isToday = messageDate.toDateString() === now.toDateString();

  const time = messageDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  if (isToday) {
    return time;
  } else {
    const day = messageDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    return `${day} ${time}`;
  }
}
