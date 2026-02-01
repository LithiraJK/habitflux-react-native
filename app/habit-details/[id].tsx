import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useHabitStore } from "@/store/useHabitStore";
import CalendarTab from "@/components/ui/CalendarTab";
import StatisticsTab from "@/components/ui/StatisticsTab";
import EditTab from "@/components/ui/EditTab";

const HabitDetailScreen = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<
    "Calendar" | "Statistics" | "Edit"
  >("Calendar");

  const { habits } = useHabitStore();

  // useMemo ensures this only runs when 'habits' or 'id' changes
  const selectedHabit = useMemo(() => {
    return habits.find((h) => h.id === id);
  }, [habits, id]);

  if (!selectedHabit) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] justify-center items-center">
        <Text className="text-white text-lg font-bold">Habit not found!</Text>
        <Text className="text-gray-500 mt-2">It might have been deleted.</Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 bg-[#1C1C1E] px-6 py-3 rounded-xl"
        >
          <Text className="text-[#8B5CF6] font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="px-4 py-2 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.replace("/(drawer)/(tabs)/habits")}
          className="p-2"
        >
          <Ionicons name="chevron-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>

        <Text
          className="text-white text-lg font-bold flex-1 text-center mr-8"
          numberOfLines={1}
        >
          {selectedHabit.title}
        </Text>
      </View>

      {/* --- Tab Navigation Bar --- */}
      <View className="flex-row justify-around border-b border-gray-800 mt-2">
        {["Calendar", "Statistics", "Edit"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            className={`pb-3 px-4 ${activeTab === tab ? "border-b-2 border-[#8B5CF6]" : ""}`}
          >
            <Text
              className={`${activeTab === tab ? "text-white font-bold" : "text-gray-500"}`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View className="flex-1 mt-2">
        {activeTab === "Calendar" && <CalendarTab habit={selectedHabit} />}
        {activeTab === "Statistics" && <StatisticsTab habit={selectedHabit} />}
        {activeTab === "Edit" && <EditTab habit={selectedHabit} />}
      </View>
    </SafeAreaView>
  );
};

export default HabitDetailScreen;
