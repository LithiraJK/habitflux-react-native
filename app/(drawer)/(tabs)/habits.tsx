import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HabitCard } from "@/components/ui/HabitCard";
import { Colors } from "@/constants/theme";
import { useHabitStore } from "@/store/useHabitStore";

const Habits = () => {
  const router = useRouter();

  const { habits, fetchHabits, isLoading } = useHabitStore();

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <View className="flex-1 px-4">
        {/* Habits List */}
        {isLoading && habits.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={Colors.dark.primary} />
          </View>
        ) : habits.length === 0 ? (
          <View className="flex-1 justify-center items-center opacity-50">
            <Ionicons
              name="clipboard-outline"
              size={64}
              color={Colors.dark.textSecondary}
            />
            <Text
              style={{ color: Colors.dark.textSecondary }}
              className="mt-4 text-lg"
            >
              No habits found
            </Text>
            <Text style={{ color: Colors.dark.textTertiary }}>
              Create your first habit to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => <HabitCard habit={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: Colors.dark.primary }}
        className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl items-center justify-center shadow-lg z-50"
        onPress={() => router.push("/create-habit/step1" as any)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={Colors.dark.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Habits;
