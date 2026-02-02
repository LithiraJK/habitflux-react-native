import CategoryItem from "@/components/ui/CategoryItem";
import CreateCategorySheet from "@/components/ui/CreateCategorySheet";
import { Colors } from "@/constants/theme";
import { useCategoryStore } from "@/store/useCategoryStore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoriesScreen = () => {
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
    <View
      style={{ flex: 1, backgroundColor: Colors.dark.background }}
      className="px-4 pt-6"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Custom Categories Section */}
        <View className="mb-8">
          <Text
            style={{ color: Colors.dark.textSecondary }}
            className="font-bold mb-1 text-base"
          >
            Custom categories
          </Text>
          <Text
            style={{ color: Colors.dark.textTertiary }}
            className="text-xs mb-6"
          >
            {categories.length} available
          </Text>

          {loading ? (
            <ActivityIndicator color={Colors.dark.defaultCategory} />
          ) : (
            <View className="flex-row flex-wrap justify-start">
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
          <Text
            style={{ color: Colors.dark.textSecondary }}
            className="font-bold mb-1 text-base"
          >
            Default categories
          </Text>
          <Text
            style={{ color: Colors.dark.textTertiary }}
            className="text-xs mb-6"
          >
            {defaultCategories.length} available
          </Text>

          <View className="flex-row flex-wrap justify-start">
            {defaultCategories.map((item) => (
              <CategoryItem
                key={item.id}
                item={item}
                onPress={() => handleEditCategory(item)} // after I will implement premium check
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-6 left-4 right-4">
        <TouchableOpacity
          style={{ backgroundColor: Colors.dark.primary }}
          className="py-4 rounded-2xl items-center shadow-2xl"
          activeOpacity={0.8}
          onPress={handleAddNewCategory}
        >
          <Text
            style={{ color: Colors.dark.text }}
            className="font-bold text-lg tracking-widest uppercase"
          >
            New Category
          </Text>
        </TouchableOpacity>
      </View>

      {showSheet && <CreateCategorySheet onClose={() => setShowSheet(false)} />}
    </View>
  );
};

export default CategoriesScreen;
