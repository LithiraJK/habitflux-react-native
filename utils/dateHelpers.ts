import { addDays, format, isSameDay } from "date-fns";

export const generateInfiniteDates = () => {
  const dates = [];
  const today = new Date();
  // Reduced range for better performance (6 months past, 6 months future)
  for (let i = -180; i <= 180; i++) {
    const date = addDays(today, i);
    dates.push({
      id: i.toString(),
      fullDate: date,
      dayName: format(date, "EEE"),
      dateNum: format(date, "d"),
      isToday: isSameDay(date, today),
    });
  }
  return dates;
};
