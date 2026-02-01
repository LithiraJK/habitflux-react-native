import { Habit } from "@/services/habitService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { addDays, format, startOfWeek } from "date-fns";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DayItem } from "./DayItem";

export type HabitStatus = "completed" | "failed" | "skipped" | "pending";

export const HabitCard = ({ habit }: { habit: Habit }) => {
  const router = useRouter();
  const { categories, defaultCategories } = useCategoryStore();
  const today = new Date();
  const startDay = startOfWeek(today);

  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(startDay, i),
  );

  const getFrequencyText = () => {
    if (!habit.frequency) return "Every day";

    if (habit.frequency.type === "daily") {
      return habit.frequency.interval === 1
        ? "Every day"
        : `Every ${habit.frequency.interval} days`;
    }
    if (habit.frequency.type === "weekly") return "Weekly";
    return "Custom";
  };

  const completionRate = useMemo(() => {
    if (!habit.startDate || !habit.totalCompleted) return 0;
    const start = new Date(habit.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const rate = Math.round((habit.totalCompleted / totalDays) * 100);
    return rate > 100 ? 100 : rate;
  }, [habit]);

  // Get category by ID
  const allCategories = [...categories, ...defaultCategories];
  const category = allCategories.find((cat) => cat.id === habit.category);
  const iconName = (category?.icon || "leaf") as keyof typeof Ionicons.glyphMap;

  return (
    <View className="bg-[#1C1C1E] rounded-3xl p-4 mb-4 border border-gray-800">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">
            {habit.title}
          </Text>
          <Text className="text-gray-500 text-xs">{getFrequencyText()}</Text>
        </View>
        <View className="bg-gray-800 p-2 rounded-xl ml-2">
          <Ionicons
            name={iconName}
            size={18}
            color={category?.color || "#22C55E"}
          />
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        {weekDays.map((date, index) => {
          const dateKey = format(date, "yyyy-MM-dd");
          const historyRecord = habit.history?.[dateKey];
          const status = historyRecord?.status || "none";

          return (
            <DayItem key={index} date={date} status={status as HabitStatus} />
          );
        })}
      </View>

      <View className="flex-row justify-between items-center border-t border-gray-800 pt-3">
        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center">
            <Ionicons name="link-outline" size={16} color="#22C55E" />
            <Text className="text-gray-300 text-xs ml-1 font-bold">
              {habit.currentStreak || 0}
            </Text>
          </View>
          <View className="flex-row items-center ml-3">
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color="#F59E0B"
            />
            <Text className="text-gray-300 text-xs ml-1 font-bold">
              {completionRate}%
            </Text>
          </View>
        </View>

        <View className="flex-row space-x-1">
          <TouchableOpacity
            className="p-2"
            onPress={() => router.push(`/habit-details/${habit.id}` as any)}
          >
            <Ionicons name="calendar-outline" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <Ionicons name="stats-chart-outline" size={18} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={18} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
