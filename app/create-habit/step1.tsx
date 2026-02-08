import CreateCategorySheet from "@/components/ui/CreateCategorySheet";
import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from "react-native";

const CategorySelection = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();
  const { categories, defaultCategories } = useCategoryStore();
  const [showSheet, setShowSheet] = useState(false);
  
  const allCategories = [...categories, ...defaultCategories];

  const handleSelectCategory = (category: any) => {
    setStepData({ category: category.id });
    router.push("/create-habit/step2" as any);
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        <View className="pt-14 px-6 pb-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-2xl font-black">Category</Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 }}
        >
          <Text className="text-gray-400 text-sm mb-6 px-1">
            Select a category for your habit
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {allCategories.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSelectCategory(item)}
                activeOpacity={0.8}
                className="w-[48%] mb-3 rounded-2xl overflow-hidden border border-white/10"
              >
                <BlurView intensity={20} tint="dark" className="flex-row items-center justify-between p-4 h-[72px]">
                  {/* Title on Left */}
                  <Text
                    className="text-white font-bold text-sm flex-1 mr-2"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  
                  {/* Icon Box on Right */}
                  <View
                    style={{ backgroundColor: `${item.color}30` }}
                    className="w-10 h-10 rounded-xl items-center justify-center border border-white/5"
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.color}
                    />
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}

            {/* "Create category" Button matching the style */}
            <TouchableOpacity
              onPress={() => setShowSheet(true)}
              activeOpacity={0.8}
              className="w-[48%] mb-3 rounded-2xl overflow-hidden border border-white/10"
            >
              <BlurView intensity={10} tint="dark" className="flex-row items-center justify-between p-4 h-[72px] bg-indigo-500/5">
                <View className="flex-1 mr-2">
                  <Text className="text-indigo-300 font-bold text-xs uppercase">
                    Create
                  </Text>
                  <Text className="text-gray-500 text-[9px] uppercase font-bold">
                    0 available
                  </Text>
                </View>
                
                <View className="w-10 h-10 rounded-full border border-gray-600 items-center justify-center">
                  <Ionicons name="add" size={24} color="#94a3b8" />
                </View>
              </BlurView>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {showSheet && <CreateCategorySheet onClose={() => setShowSheet(false)} />}
    </View>
  );
};

export default CategorySelection;