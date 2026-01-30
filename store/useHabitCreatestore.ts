
import { create } from 'zustand';

interface HabitState {
  habitData: {
    category: string | null;
    type: 'yes_no' | 'timer' | null;
    title: string;
    description: string;
    frequency: string;
    startDate: string;
    priority: string;
  };
  setStepData: (data: Partial<HabitState['habitData']>) => void;
  resetForm: () => void;
}

export const useHabitCreateStore = create<HabitState>((set) => ({
  habitData: {
    category: null,
    type: null,
    title: '',
    description: '',
    frequency: 'Every day',
    startDate: 'Today',
    priority: 'Default'
  },
  setStepData: (data) => set((state) => ({ habitData: { ...state.habitData, ...data } })),
  resetForm: () => set({ habitData: { category: null, type: null, title: '', description: '', frequency: 'Every day', startDate: 'Today', priority: 'Default' } })
}));

