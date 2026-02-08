import { HabitCard } from "@/components/ui/HabitCard";
import { Colors } from "@/constants/theme";
import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Habits = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { habits, fetchHabits, isLoading } = useHabitStore();

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="pt-14 px-6 pb-4 flex-row justify-between items-center z-10">
          <View className="flex-row items-center">
            {/* Menu Button */}
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-4"
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>

            <View>
              <Text className="text-gray-400 text-[10px] uppercase tracking-[3px] font-bold">
                Your Journey
              </Text>
              <Text className="text-white text-2xl font-black">All Habits</Text>
            </View>
          </View>

          {/* Sort/Filter Button (Optional placeholder) */}
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20">
            <Ionicons name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View className="flex-1 px-4">
          {isLoading && habits.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color={Colors.dark.primary} />
            </View>
          ) : habits.length === 0 ? (
            // Empty State - Glassmorphism
            <View className="flex-1 justify-center items-center px-6">
              <BlurView
                intensity={20}
                tint="dark"
                className="w-full p-8 rounded-3xl border border-white/10 items-center overflow-hidden"
              >
                <View className="w-20 h-20 bg-white/5 rounded-full items-center justify-center mb-6 border border-white/10">
                  <Ionicons
                    name="clipboard-outline"
                    size={40}
                    color={Colors.dark.textTertiary}
                  />
                </View>
                <Text className="text-white text-xl font-bold text-center mb-2">
                  No habits found yet
                </Text>
                <Text className="text-gray-400 text-center text-sm leading-5">
                  Your journey to self-improvement starts here. Create your first habit now!
                </Text>
              </BlurView>
            </View>
          ) : (
            // Habits List
            <FlatList
              data={habits}
              keyExtractor={(item) => item.id || Math.random().toString()}
              renderItem={({ item }) => (
                <View className="mb-4">
                  <HabitCard habit={item} />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
            />
          )}
        </View>

        {/* Gradient Floating Action Button (FAB) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/create-habit/step1" as any)}
          className="absolute bottom-28 right-6 shadow-2xl shadow-indigo-500/50 overflow-hidden rounded-2xl z-50"
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

export default Habits;