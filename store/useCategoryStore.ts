import { addCategory, getAllCategory } from '@/services/categoryService';
import { create } from 'zustand';

interface CategoryStore {
  categories: any[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  addNewCategory: (title: string, desc: string, icon: string, color: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  loading: false,
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const data = await getAllCategory();
      set({ categories: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  addNewCategory: async (title, desc, icon, color) => {
    await addCategory(title, desc, icon, color);
    await get().fetchCategories(); 
  }
}));