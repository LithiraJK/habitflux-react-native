import {
  getAllHabit,
  Habit,
  toggleHabitCompletion,
} from "@/services/habitService";
import { format, getDay, isSameDay } from "date-fns";
import { create } from "zustand";

// Helper function to check if habit should appear on selected date
const shouldShowHabitOnDate = (habit: Habit, selectedDate: Date): boolean => {
  const habitStartDate = new Date(habit.startDate);
  const habitEndDate = habit.endDate ? new Date(habit.endDate) : null;

  // Check if selected date is within habit's date range
  if (selectedDate < habitStartDate) return false;
  if (habitEndDate && selectedDate > habitEndDate) return false;

  const frequency = habit.frequency;

  if (!frequency) return true; // Default to daily

  // Daily frequency
  if (frequency.type === "daily") {
    const interval = frequency.interval || 1;
    if (interval === 1) return true;

    // Check interval (every X days)
    const daysDiff = Math.floor(
      (selectedDate.getTime() - habitStartDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return daysDiff % interval === 0;
  }

  // Specific days of week
  if (frequency.type === "specific_days" && frequency.daysOfWeek) {
    const dayOfWeek = getDay(selectedDate); // 0 = Sunday, 6 = Saturday
    return frequency.daysOfWeek.includes(dayOfWeek);
  }

  // Weekly
  if (frequency.type === "weekly") {
    const startDayOfWeek = getDay(habitStartDate);
    const selectedDayOfWeek = getDay(selectedDate);
    return startDayOfWeek === selectedDayOfWeek;
  }

  // Monthly
  if (frequency.type === "monthly") {
    return habitStartDate.getDate() === selectedDate.getDate();
  }

  return true;
};

interface HabitState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  habits: Habit[];
  filteredHabits: Habit[]; // Date-filtered habits
  isLoading: boolean;

  fetchHabits: () => Promise<void>;
  getFilteredHabits: () => Habit[];
  toggleHabitStatus: (id: string, currentStatus: boolean) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => {
    set({ selectedDate: date });
    // Trigger re-filter when date changes
    get().getFilteredHabits();
  },

  habits: [],
  filteredHabits: [],
  isLoading: false,

  fetchHabits: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllHabit();
      set({ habits: data, isLoading: false });
      // Filter habits after fetching
      get().getFilteredHabits();
    } catch (error) {
      console.error("Failed to fetch habits", error);
      set({ isLoading: false });
    }
  },

  getFilteredHabits: () => {
    const { habits, selectedDate } = get();
    const dateStr = format(selectedDate, "yyyy-MM-dd");

    // Filter habits that should appear on selected date
    const filtered = habits
      .filter(
        (habit) =>
          !habit.isArchived && shouldShowHabitOnDate(habit, selectedDate),
      )
      .map((habit) => {
        // Check if habit was completed on selected date from history
        const historyEntry = habit.history?.[dateStr];
        const isCompleteOnDate = historyEntry?.status === "completed";

        return {
          ...habit,
          isComplete: isCompleteOnDate,
          dailyProgress: historyEntry?.progress || 0,
        };
      });

    set({ filteredHabits: filtered });
    return filtered;
  },

  toggleHabitStatus: async (id, currentStatus) => {
    const previousHabits = get().habits;
    const { selectedDate } = get();
    const newStatus = !currentStatus;
    const dateStr = format(selectedDate, "yyyy-MM-dd");

    const updatedHabits = previousHabits.map((habit) => {
      if (habit.id !== id) return habit;

      const updatedHabit = { ...habit };

      if (newStatus) {
        updatedHabit.history = {
          ...habit.history,
          [dateStr]: { status: "completed", progress: habit.dailyTarget || 1 },
        };

        // Only update streaks if toggling today's habit
        const isToday = isSameDay(selectedDate, new Date());
        if (isToday) {
          updatedHabit.currentStreak = (habit.currentStreak || 0) + 1;
          updatedHabit.totalCompleted = (habit.totalCompleted || 0) + 1;

          if (updatedHabit.currentStreak > (updatedHabit.bestStreak || 0)) {
            updatedHabit.bestStreak = updatedHabit.currentStreak;
          }
        }
      } else {
        const newHistory = { ...habit.history };
        delete newHistory[dateStr];
        updatedHabit.history = newHistory;

        // Only update streaks if toggling today's habit
        const isToday = isSameDay(selectedDate, new Date());
        if (isToday) {
          updatedHabit.currentStreak = Math.max(
            0,
            (habit.currentStreak || 0) - 1,
          );
          updatedHabit.totalCompleted = Math.max(
            0,
            (habit.totalCompleted || 0) - 1,
          );
        }
      }

      return updatedHabit;
    });

    set({ habits: updatedHabits });
    get().getFilteredHabits(); // Re-filter after update

    try {
      await toggleHabitCompletion(id, newStatus, dateStr);
    } catch (error) {
      console.error("Update failed", error);
      set({ habits: previousHabits });
      get().getFilteredHabits();
    }
  },
}));
