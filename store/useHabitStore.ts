import { create } from 'zustand';


interface HabitState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  // Habits list here
  habits: any[]; 
  setHabits: (habits: any[]) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  selectedDate: new Date(), // Default value is today
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  habits: [],
  setHabits: (habits) => set({ habits }),
}));