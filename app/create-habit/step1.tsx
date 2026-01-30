import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCategoryStore } from '@/store/useCategoryStore';
import CreateCategorySheet from '@/components/ui/CreateCategorySheet';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';

const CategorySelection = () => {
  const router = useRouter();
  
  const { categories, defaultCategories } = useCategoryStore();
  const { setStepData } = useHabitCreateStore();
  
  
  const [showSheet, setShowSheet] = useState(false);

  const allCategories = [...categories, ...defaultCategories];

  const handleSelectCategory = (category: any) => {
    
    setStepData({ category: category.id }); 
    
    router.push('/create-habit/step2');
  };

  return (
    <View className="flex-1 bg-[#121212] px-4 pt-6">
      
      <Text className="text-[#0891B2] text-xl font-bold text-center mb-8 mt-4">
        Select a category for your habit
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          
          {allCategories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => handleSelectCategory(item)}
              activeOpacity={0.7}
              className="bg-[rgba(255,255,255,0.8)] w-[48%] px-4 py-4 rounded-2xl mb-2 flex-row justify-between items-center"
            >
              <Text className="text-white font-bold text-sm flex-1 mr-2" numberOfLines={1}>
                {item.title}
              </Text>
              
              <View 
                style={{ backgroundColor: `${item.color}60` }}
                className="w-10 h-10 rounded-xl items-center justify-center"
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            onPress={() => setShowSheet(true)}
            activeOpacity={0.7}
            className="bg-[rgba(255,255,255,0.8)] w-[48%] px-4 py-4 rounded-2xl mb-2 flex-row justify-between items-center border border-[#0891B2]/30"
          >
            <View>
              <Text className="text-white font-bold text-sm">Create category</Text>
              <Text className="text-gray-500 text-[10px] mt-0.5">
                {categories.length} available
              </Text>
            </View>
            
            <View className="w-10 h-10 rounded-full border-2 border-gray-600 items-center justify-center">
              <Ionicons name="add" size={24} color="gray" />
            </View>
          </TouchableOpacity>

        </View>
        
        <View className="h-20" />
      </ScrollView>

      {showSheet && <CreateCategorySheet onClose={() => setShowSheet(false)} />}
      
    </View>
  );
};

export default CategorySelection;