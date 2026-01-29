import { create } from 'zustand';
import { addCategory, getAllCategory, updateCategory } from '@/services/categoryService';

interface CategoryStore {
  categories: any[];          
  defaultCategories: any[];
  loading: boolean;
  editingCategory: any | null; 
  setEditingCategory: (category: any | null) => void;
  fetchCategories: () => Promise<void>;
  saveCategory: (categoryData: { title: string; icon: string; color: string }) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  defaultCategories: [],
  loading: false,
  editingCategory: null,


  setEditingCategory: (category) => set({ editingCategory: category }),

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const allData = await getAllCategory(); //
      
      // Data Filtering
      const custom = allData.filter((c: any) => c.isDefault === false || c.isDefault === undefined);
      const defaults = allData.filter((c: any) => c.isDefault === true);
      
      set({ 
        categories: custom, 
        defaultCategories: defaults, 
        loading: false 
      });
    } catch (error) {
      console.error("Fetch Categories Error:", error);
      set({ loading: false });
    }
  },

  // Save or Update
  saveCategory: async (categoryData) => {
    const { editingCategory } = get();
    try {
      if (editingCategory) {
        
        await updateCategory(editingCategory.id, categoryData);
      } else {
       
        await addCategory(categoryData.title, categoryData.icon, categoryData.color);
      }
      
      // Data Refresh 
      await get().fetchCategories(); 
    } catch (error) {
      console.error("Save Category Error:", error);
    }
  }
}));