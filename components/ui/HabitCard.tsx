import { Habit } from "@/services/habitService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import { addDays, format, startOfWeek } from "date-fns";
import { BlurView } from "expo-blur";
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
        ? "Daily"
        : `Every ${habit.frequency.interval} days`;
    }
    return (
      habit.frequency.type.charAt(0).toUpperCase() +
      habit.frequency.type.slice(1)
    );
  };

  const completionRate = useMemo(() => {
    if (!habit.startDate || !habit.totalCompleted) return 0;
    const start = new Date(habit.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const rate = Math.round((habit.totalCompleted / totalDays) * 100);
    return Math.min(rate, 100);
  }, [habit]);

  const allCategories = [...categories, ...defaultCategories];
  const category = allCategories.find((cat) => cat.id === habit.category);
  const iconName = (category?.icon || "leaf") as keyof typeof Ionicons.glyphMap;
  const categoryColor = category?.color || "#818cf8";

  return (
    <View className="mb-4 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
      <BlurView intensity={20} tint="dark" className="p-5">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push({
              pathname: "/habit-details",
              params: { id: habit.id },
            })
          }
          className="flex-row justify-between items-start mb-5"
        >
          <View className="flex-1 pr-4">
            <Text
              className="text-white font-black text-xl mb-1 tracking-tight"
              numberOfLines={1}
            >
              {habit.title}
            </Text>
            <View className="flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 shadow-sm shadow-indigo-500" />
              <Text className="text-gray-500 text-[10px] font-black uppercase tracking-[2px]">
                {getFrequencyText()}
              </Text>
            </View>
          </View>

          <View
            className="w-12 h-12 rounded-2xl items-center justify-center border border-white/5 shadow-inner"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <Ionicons name={iconName} size={22} color={categoryColor} />
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-between mb-6 bg-white/5 p-3 rounded-[24px] border border-white/5">
          {weekDays.map((date, index) => {
            const dateKey = format(date, "yyyy-MM-dd");
            const historyRecord = habit.history?.[dateKey];
            const status = historyRecord?.status || "none";
            return (
              <DayItem key={index} date={date} status={status as HabitStatus} />
            );
          })}
        </View>

        <View className="flex-row justify-between items-center border-t border-white/5 pt-4">
          <View className="flex-row items-center space-x-3">
            <View className="flex-row items-center bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
              <Ionicons name="flame" size={14} color="#818cf8" />
              <Text className="text-indigo-300 text-[10px] ml-1.5 font-black uppercase">
                {habit.currentStreak || 0} Days
              </Text>
            </View>

            <View className="flex-row items-center bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <Ionicons name="pie-chart" size={14} color="#34d399" />
              <Text className="text-emerald-400 text-[10px] ml-1.5 font-black uppercase">
                {completionRate}%
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="w-9 h-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 mr-3"
              onPress={() =>
                router.push({
                  pathname: "/habit-details/stats",
                  params: { id: habit.id },
                })
              }
            >
              <Ionicons name="stats-chart" size={16} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-9 h-9 items-center justify-center rounded-xl bg-white/5 border border-white/10"
              onPress={() =>
                router.push({
                  pathname: "/habit-details/edit",
                  params: { id: habit.id },
                })
              }
            >
              <Ionicons name="settings-sharp" size={16} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
};
