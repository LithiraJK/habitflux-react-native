import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CreateCategorySheet from '@/components/ui/CreateCategorySheet';
import { useCategoryStore } from '@/store/useCategoryStore';


const CategoriesScreen = () => {
  const { categories, fetchCategories, loading } = useCategoryStore();
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View className="flex-1 bg-[#121212] px-4 pt-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-gray-400 font-bold mb-1">Custom categories</Text>
        <Text className="text-gray-600 text-xs mb-6">Create your own categories</Text>

        {loading ? (
          <ActivityIndicator color="#0891B2" className="mt-10" />
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {categories.map((item) => (
              <View key={item.id} className="items-center mb-8" style={{ width: '22%' }}>
                <View className="w-16 h-16 rounded-3xl items-center justify-center mb-2" style={{ backgroundColor: item.color }}>
                  <Ionicons name={item.icon} size={28} color="white" />
                </View>
                <Text className="text-white text-[10px] font-bold text-center" numberOfLines={1}>{item.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        className="bg-[#818CF8] py-4 rounded-2xl mb-8 items-center shadow-lg"
        onPress={() => setShowSheet(true)}
      >
        <Text className="text-white font-bold text-lg tracking-widest">NEW CATEGORY</Text>
      </TouchableOpacity>

      {/* Animated Bottom Sheet */}
      {showSheet && <CreateCategorySheet onClose={() => setShowSheet(false)} />}
    </View>
  );
};

export default CategoriesScreen;