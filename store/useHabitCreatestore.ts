import { create } from "zustand";

interface HabitState {
  habitData: {
    category: string | null;
    type: "yes_no" | "timer" | "count" | null;
    title: string;
    description: string;
    dailyTarget?: number;
    unit?: string;
    frequency: any;
    startDate: string;
    endDate?: string | null;
    priority: string;
    reminderTimes?: string[];
  };
  setStepData: (data: Partial<HabitState["habitData"]>) => void;
  resetForm: () => void;
}

export const useHabitCreateStore = create<HabitState>((set) => ({
  habitData: {
    category: null,
    type: null,
    title: "",
    description: "",
    dailyTarget: undefined,
    unit: undefined,
    frequency: { type: "daily", interval: 1 },
    startDate: new Date().toISOString(),
    endDate: null,
    priority: "Medium",
    reminderTimes: [],
  },
  setStepData: (data) =>
    set((state) => ({ habitData: { ...state.habitData, ...data } })),
  resetForm: () =>
    set({
      habitData: {
        category: null,
        type: null,
        title: "",
        description: "",
        dailyTarget: undefined,
        unit: undefined,
        frequency: { type: "daily", interval: 1 },
        startDate: new Date().toISOString(),
        endDate: null,
        priority: "Medium",
        reminderTimes: [],
      },
    }),
}));
