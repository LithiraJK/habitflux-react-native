import { create } from 'zustand';
import { getAllHabit, completeHabit } from '@/services/habitService'; // Service import

interface HabitState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  
  habits: any[]; 
  isLoading: boolean; // Loading state එක වැදගත්
  
  fetchHabits: () => Promise<void>; // දත්ත ලබා ගැනීමට
  toggleHabitStatus: (id: string, currentStatus: boolean) => Promise<void>; // Complete කිරීමට
}

export const useHabitStore = create<HabitState>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  habits: [],
  isLoading: false,

  // 🚀 1. Firebase වලින් දත්ත ලබා ගැනීම
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

  // 🚀 2. Habit එක Complete/Incomplete කිරීම (Optimistic Update)
  toggleHabitStatus: async (id, currentStatus) => {
    // UI එක ඉක්මනින් Update කිරීමට (Server එකට යන්න කලින්)
    const updatedHabits = get().habits.map((habit) => 
      habit.id === id ? { ...habit, isComplete: !currentStatus } : habit
    );
    set({ habits: updatedHabits });

    // Background එකේ Database එක Update කිරීම
    try {
      await completeHabit(id, !currentStatus);
    } catch (error) {
      console.error("Update failed", error);
      // Error එකක් ආවොත් පරණ තත්ත්වයට පත් කරන්න (Rollback)
      set({ habits: get().habits }); 
    }
  }
}));