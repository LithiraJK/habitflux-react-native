import CalendarTab from "@/components/ui/CalendarTab";
import EditTab from "@/components/ui/EditTab";
import StatisticsTab from "@/components/ui/StatisticsTab";
import { Colors } from "@/constants/theme";
import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors.dark.background }}
      >
        <Text className="text-lg font-bold" style={{ color: Colors.dark.text }}>
          Habit not found!
        </Text>
        <Text className="mt-2" style={{ color: Colors.dark.textSecondary }}>
          It might have been deleted.
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 px-6 py-3 rounded-xl"
          style={{ backgroundColor: Colors.dark.cardBackground }}
        >
          <Text className="font-bold" style={{ color: Colors.dark.primary }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.dark.background }}
    >
      <View className="px-4 py-2 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.replace("/(drawer)/(tabs)/habits")}
          className="p-2"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.dark.primary}
          />
        </TouchableOpacity>

        <Text
          className="text-lg font-bold flex-1 text-center mr-8"
          style={{ color: Colors.dark.text }}
          numberOfLines={1}
        >
          {selectedHabit.title}
        </Text>
      </View>

      {/* --- Tab Navigation Bar --- */}
      <View
        className="flex-row justify-around border-b mt-2"
        style={{ borderBottomColor: Colors.dark.border }}
      >
        {["Calendar", "Statistics", "Edit"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            className="pb-3 px-4"
            style={
              activeTab === tab
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.dark.primary,
                  }
                : {}
            }
          >
            <Text
              className={activeTab === tab ? "font-bold" : ""}
              style={{
                color:
                  activeTab === tab
                    ? Colors.dark.text
                    : Colors.dark.textSecondary,
              }}
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
