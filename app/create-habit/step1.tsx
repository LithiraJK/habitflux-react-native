import CreateCategorySheet from "@/components/ui/CreateCategorySheet";
import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const CategorySelection = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();
  const { categories, defaultCategories } = useCategoryStore();
  const [showSheet, setShowSheet] = useState(false);
  const allCategories = [...categories, ...defaultCategories];

  const handleSelectCategory = (category: any) => {
    setStepData({ category: category.id });
    router.push("/create-habit/step2");
  };

  return (
    <View
      className="flex-1 px-4 pt-6"
      style={{ backgroundColor: Colors.dark.background }}
    >
      <Text
        className="text-xl font-bold text-center mb-8 mt-4"
        style={{ color: Colors.dark.primary }}
      >
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
              <Text
                className="font-bold text-sm flex-1 mr-2"
                style={{ color: Colors.dark.text }}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <View
                style={{ backgroundColor: `${item.color}60` }}
                className="w-10 h-10 rounded-xl items-center justify-center"
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.color}
                />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => setShowSheet(true)}
            activeOpacity={0.7}
            className="bg-[rgba(255,255,255,0.8)] w-[48%] px-4 py-4 rounded-2xl mb-2 flex-row justify-between items-center"
            style={{
              borderWidth: 1,
              borderColor: Colors.dark.defaultCategory + "4D",
            }}
          >
            <View>
              <Text
                className="font-bold text-sm"
                style={{ color: Colors.dark.text }}
              >
                Create category
              </Text>
              <Text
                className="text-[10px] mt-0.5"
                style={{ color: Colors.dark.textSecondary }}
              >
                {categories.length} available
              </Text>
            </View>

            <View
              className="w-10 h-10 rounded-full border-2 items-center justify-center"
              style={{ borderColor: Colors.dark.border }}
            >
              <Ionicons
                name="add"
                size={24}
                color={Colors.dark.textSecondary}
              />
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
