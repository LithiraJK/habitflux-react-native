import { addDays, format, isSameDay } from 'date-fns';

export const generateInfiniteDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = -500; i <= 500; i++) {
    const date = addDays(today, i);
    dates.push({
      id: i.toString(),
      fullDate: date,
      dayName: format(date, 'EEE'),
      dateNum: format(date, 'd'),
      isToday: isSameDay(date, today),
    });
  }
  return dates;
};