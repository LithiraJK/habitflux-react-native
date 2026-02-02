import { Ionicons } from "@expo/vector-icons";
import { format, isAfter, startOfDay } from "date-fns";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarStrip from "@/components/ui/CalendarStrip";
import HabitItem from "@/components/ui/HabitItem";
import ProgressRing from "@/components/ui/ProgressRing";
import { Habit } from "@/services/habitService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useHabitStore } from "@/store/useHabitStore";

const HomeScreen = () => {
  const {
    filteredHabits,
    fetchHabits,
    toggleHabitStatus,
    isLoading: isHabitLoading,
    selectedDate,
    getFilteredHabits,
  } = useHabitStore();

  const { categories, defaultCategories, fetchCategories } = useCategoryStore();

  // Combine default and user-defined categories
  const allCategories = useMemo(
    () => [...categories, ...defaultCategories],
    [categories, defaultCategories],
  );

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
      fetchCategories();
    }, []),
  );

  // Re-filter habits when selected date changes
  useFocusEffect(
    useCallback(() => {
      getFilteredHabits();
    }, [selectedDate]),
  );

  const progressPercentage = useMemo(() => {
    if (filteredHabits.length === 0) return 0;
    const completedCount = filteredHabits.filter((h) => h.isComplete).length;
    return Math.round((completedCount / filteredHabits.length) * 100);
  }, [filteredHabits]);

  // Check if selected date is in the future
  const isFutureDate = useMemo(() => {
    return isAfter(startOfDay(selectedDate), startOfDay(new Date()));
  }, [selectedDate]);

  const getHabitStyle = (categoryId: string | undefined) => {
    if (!categoryId) return { icon: "leaf", color: "#818CF8" };

    const foundCategory = allCategories.find((cat) => cat.id === categoryId);

    if (foundCategory) {
      return {
        icon: foundCategory.icon,
        color: foundCategory.color,
      };
    }

    return { icon: "leaf", color: "#818CF8" };
  };

  const getFrequencyLabel = (frequency: Habit["frequency"]) => {
    if (!frequency) return "Daily";

    if (frequency.type === "daily") {
      return frequency.interval === 1
        ? "Daily"
        : `Every ${frequency.interval} days`;
    }
    if (frequency.type === "weekly") return "Weekly";
    if (frequency.type === "monthly") return "Monthly";

    return "Custom";
  };

  return (
    <View className="flex-1 bg-[#121212]">
      <View className="px-4 h-[100px] justify-center z-10">
        <CalendarStrip />
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={isHabitLoading}
            onRefresh={() => {
              fetchHabits();
              fetchCategories();
            }}
            tintColor="#0891B2"
          />
        }
      >
        <View className="pt-2 pb-1">
          <Text className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            {format(selectedDate, "EEEE, d MMMM")}
          </Text>
        </View>

        <View className="items-center mt-4 mb-6">
          <ProgressRing percentage={progressPercentage} size={160} />
        </View>

        <View className="flex-1">
          {isHabitLoading && filteredHabits.length === 0 ? (
            <ActivityIndicator size="large" color="#818CF8" className="mt-10" />
          ) : filteredHabits.length === 0 ? (
            <View className="items-center mt-10 opacity-50">
              <Ionicons name="list" size={48} color="gray" />
              <Text className="text-gray-400 mt-2">
                No habits for this date
              </Text>
              <Text className="text-gray-600 text-xs">Tap + to add one</Text>
            </View>
          ) : (
            filteredHabits.map((habit) => {
              const { icon, color } = getHabitStyle(habit.category);

              return (
                <HabitItem
                  key={habit.id}
                  title={habit.title}
                  goal={getFrequencyLabel(habit.frequency)}
                  icon={icon as any}
                  color={color}
                  completed={habit.isComplete}
                  disabled={isFutureDate}
                  onToggle={() =>
                    toggleHabitStatus(habit.id!, habit.isComplete)
                  }
                />
              );
            })
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#818CF8] rounded-2xl items-center justify-center shadow-lg z-50"
        onPress={() => router.push("/create-habit/step1" as any)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
