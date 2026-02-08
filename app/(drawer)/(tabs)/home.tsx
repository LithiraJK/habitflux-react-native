import CalendarStrip from "@/components/ui/CalendarStrip";
import HabitItem from "@/components/ui/HabitItem";
import ProgressRing from "@/components/ui/ProgressRing";
import { Colors } from "@/constants/theme";
import { Habit } from "@/services/habitService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { format, isAfter, startOfDay } from "date-fns";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useNavigation } from "expo-router"; 
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const {
    filteredHabits,
    fetchHabits,
    toggleHabitStatus,
    isLoading: isHabitLoading,
    selectedDate,
    getFilteredHabits,
  } = useHabitStore();

  const { categories, defaultCategories, fetchCategories } = useCategoryStore();

  const allCategories = useMemo(
    () => [...categories, ...defaultCategories],
    [categories, defaultCategories]
  );

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
      fetchCategories();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getFilteredHabits();
    }, [selectedDate])
  );

  const progressPercentage = useMemo(() => {
    if (filteredHabits.length === 0) return 0;
    const completedCount = filteredHabits.filter((h) => h.isComplete).length;
    return Math.round((completedCount / filteredHabits.length) * 100);
  }, [filteredHabits]);

  const isFutureDate = useMemo(() => {
    return isAfter(startOfDay(selectedDate), startOfDay(new Date()));
  }, [selectedDate]);

  const getHabitStyle = (categoryId: string | undefined) => {
    if (!categoryId)
      return { icon: "leaf", color: Colors.dark.defaultCategory };
    const foundCategory = allCategories.find((cat) => cat.id === categoryId);
    return foundCategory
      ? { icon: foundCategory.icon, color: foundCategory.color }
      : { icon: "leaf", color: Colors.dark.defaultCategory };
  };

  const getFrequencyLabel = (frequency: Habit["frequency"]) => {
    if (!frequency || frequency.type === "daily") {
      return frequency?.interval === 1 || !frequency
        ? "Daily"
        : `Every ${frequency.interval} days`;
    }
    return frequency.type.charAt(0).toUpperCase() + frequency.type.slice(1);
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        <View className="pt-14 px-6 pb-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-4"
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>

            <View>
              <Text className="text-gray-400 text-[10px] uppercase tracking-[3px] font-bold">
                {format(selectedDate, "EEEE, d MMM")}
              </Text>
              <Text className="text-white text-2xl font-black">My Habits</Text>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20">
            <Ionicons name="notifications-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Calendar Strip Container */}
        <View className="px-4 mb-4">
          <BlurView
            intensity={10}
            tint="dark"
            className="rounded-3xl overflow-hidden border border-white/10 p-2"
          >
            <CalendarStrip />
          </BlurView>
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl
              refreshing={isHabitLoading}
              onRefresh={() => {
                fetchHabits();
                fetchCategories();
              }}
              tintColor={Colors.dark.primary}
            />
          }
        >
          {/* Progress Card - Glassmorphism */}
          <View className="mb-8 overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
            <BlurView
              intensity={30}
              tint="dark"
              className="p-6 items-center flex-row justify-between"
            >
              <View className="flex-1 pr-4">
                <Text className="text-white text-xl font-bold mb-1">
                  Today's Progress
                </Text>
                <Text className="text-gray-400 text-sm">
                  {progressPercentage === 100
                    ? "Perfect! All habits done! 🚀"
                    : `${
                        filteredHabits.filter((h) => h.isComplete).length
                      } of ${filteredHabits.length} completed`}
                </Text>
              </View>
              <ProgressRing
                percentage={progressPercentage}
                size={90}
                strokeWidth={10}
              />
            </BlurView>
          </View>

          {/* Habits List Header */}
          <View className="flex-row justify-between items-end mb-4 px-1">
            <Text className="text-white text-lg font-bold">Today's Tasks</Text>
            <Text className="text-indigo-400 text-xs font-semibold">
              {filteredHabits.length} Total
            </Text>
          </View>

          {/* Habits Mapping */}
          <View className="space-y-4">
            {isHabitLoading && filteredHabits.length === 0 ? (
              <ActivityIndicator
                size="large"
                color={Colors.dark.primary}
                className="mt-10"
              />
            ) : filteredHabits.length === 0 ? (
              <BlurView
                intensity={10}
                className="rounded-3xl p-10 items-center border border-white/5 mt-4"
              >
                <Ionicons
                  name="sparkles-outline"
                  size={40}
                  color={Colors.dark.textTertiary}
                />
                <Text className="text-white text-base font-medium mt-3">
                  All clear for today!
                </Text>
                <Text className="text-gray-500 text-xs text-center mt-1">
                  Tap the plus button to start a new habit
                </Text>
              </BlurView>
            ) : (
              filteredHabits.map((habit) => {
                const { icon, color } = getHabitStyle(habit.category);
                return (
                  <View key={habit.id} className="mb-3">
                    <HabitItem
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
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/create-habit/step1" as any)}
          className="absolute bottom-28 right-6 shadow-2xl shadow-indigo-500/50 overflow-hidden rounded-2xl"
        >
          <LinearGradient
            colors={["#6366f1", "#4f46e5"]}
            className="w-16 h-16 items-center justify-center"
          >
            <Ionicons name="add" size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;