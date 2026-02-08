import CategoryItem from "@/components/ui/CategoryItem";
import CreateCategorySheet from "@/components/ui/CreateCategorySheet";
import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const {
    categories,
    defaultCategories,
    fetchCategories,
    loading,
    setEditingCategory,
  } = useCategoryStore();

  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (item: any) => {
    setEditingCategory(item);
    setShowSheet(true);
  };

  const handleAddNewCategory = () => {
    setEditingCategory(null);
    setShowSheet(true);
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="pt-14 px-6 pb-4 flex-row items-center justify-between z-10">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-4"
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            
            <View>
              <Text className="text-gray-400 text-[10px] uppercase tracking-[3px] font-bold">
                Organize
              </Text>
              <Text className="text-white text-2xl font-black">Categories</Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
        >
          {/* Custom Categories Section */}
          <View className="mb-8">
            <View className="flex-row justify-between items-end mb-4 px-1">
              <Text className="text-white text-lg font-bold">My Custom</Text>
              <Text className="text-indigo-400 text-xs font-semibold">{categories.length} Items</Text>
            </View>

            {loading ? (
              <ActivityIndicator color={Colors.dark.primary} size="large" className="mt-4" />
            ) : categories.length === 0 ? (
              <BlurView intensity={10} tint="dark" className="p-8 rounded-3xl border border-white/10 items-center">
                <Ionicons name="layers-outline" size={32} color="gray" />
                <Text className="text-gray-500 mt-2 text-sm">No custom categories yet</Text>
              </BlurView>
            ) : (
              <View className="flex-row flex-wrap gap-3">
                {categories.map((item) => (
                  <CategoryItem
                    key={item.id}
                    item={item}
                    onPress={() => handleEditCategory(item)}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Default Categories Section */}
          <View>
            <View className="flex-row justify-between items-end mb-4 px-1">
              <Text className="text-white text-lg font-bold">Defaults</Text>
              <Text className="text-gray-500 text-xs font-semibold">{defaultCategories.length} Items</Text>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {defaultCategories.map((item) => (
                <CategoryItem
                  key={item.id}
                  item={item}
                  onPress={() => handleEditCategory(item)}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Gradient Floating Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleAddNewCategory}
          className="absolute bottom-28 right-6 shadow-2xl shadow-indigo-500/50 overflow-hidden rounded-2xl"
        >
          <LinearGradient
            colors={["#6366f1", "#4f46e5"]}
            className="w-16 h-16 items-center justify-center"
          >
            <Ionicons name="add" size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        {showSheet && <CreateCategorySheet onClose={() => setShowSheet(false)} />}
      </LinearGradient>
    </View>
  );
};

export default CategoriesScreen;