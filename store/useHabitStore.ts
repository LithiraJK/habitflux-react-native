import { create } from 'zustand';
import { getAllHabit, toggleHabitCompletion, Habit } from '@/services/habitService';

interface HabitState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  
  habits: Habit[]; 
  isLoading: boolean;
  
  fetchHabits: () => Promise<void>;
  toggleHabitStatus: (id: string, currentStatus: boolean) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  habits: [],
  isLoading: false,

  fetchHabits: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllHabit();
      set({ habits: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch habits", error);
      set({ isLoading: false });
    }
  },

  toggleHabitStatus: async (id, currentStatus) => {
    const previousHabits = get().habits;
    const newStatus = !currentStatus;
    const todayStr = new Date().toISOString().split('T')[0];

    const updatedHabits = previousHabits.map((habit) => {
      if (habit.id !== id) return habit;

      const updatedHabit = { ...habit, isComplete: newStatus };
      
      if (newStatus) {
        updatedHabit.history = { 
            ...habit.history, 
            [todayStr]: { status: 'completed', progress: habit.dailyTarget || 1 } 
        };
        updatedHabit.currentStreak = (habit.currentStreak || 0) + 1;
        updatedHabit.totalCompleted = (habit.totalCompleted || 0) + 1;
        
        if (updatedHabit.currentStreak > (updatedHabit.bestStreak || 0)) {
            updatedHabit.bestStreak = updatedHabit.currentStreak;
        }
      } else {
        const newHistory = { ...habit.history };
        delete newHistory[todayStr];
        updatedHabit.history = newHistory;
        
        updatedHabit.currentStreak = Math.max(0, (habit.currentStreak || 0) - 1);
        updatedHabit.totalCompleted = Math.max(0, (habit.totalCompleted || 0) - 1);
      }

      return updatedHabit;
    });

    set({ habits: updatedHabits });

    try {
      await toggleHabitCompletion(id, newStatus);
    } catch (error) {
      console.error("Update failed", error);
      set({ habits: previousHabits });
    }
  }
}));