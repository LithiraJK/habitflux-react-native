import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { addHabit } from "@/services/habitService";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { useLoader } from "@/hooks/useLoader";

const Reminders = () => {
  const router = useRouter();
  const { habitData, resetForm } = useHabitCreateStore();

  const { showLoader, hideLoader } = useLoader();

  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);
  const [startDate, setStartDate] = useState("Today");
  const [priority, setPriority] = useState("Default");
  const [remindersCount, setRemindersCount] = useState(0);

  const handleSave = async () => {
    try {
      showLoader();

      const finalHabitData = {
        ...habitData,
        startDate: startDate === "Today" ? new Date().toISOString() : startDate,
        endDate: isEndDateEnabled ? null : null,
        priority: priority,
        reminders: remindersCount,
        category: habitData.category ?? undefined,
        type: habitData.type ?? undefined,
      };

      await addHabit(finalHabitData);

      Alert.alert("Success", "Habit created successfully!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            if (router.canDismiss()) {
              router.dismissAll();
            }

            router.replace("/(dashboard)/(tabs)/home");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Error saving habit:", error);
      Alert.alert("Error", "Failed to create habit.");
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-12">
        When do you want to do it?
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={24} color="#0891B2" />
            <Text className="text-gray-300 text-base ml-4">Start date</Text>
          </View>
          <TouchableOpacity className="bg-[#083344] px-4 py-2 rounded-lg">
            <Text className="text-[#0891B2] font-bold">{startDate}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={24} color="#0891B2" />
            <Text className="text-gray-300 text-base ml-4">End date</Text>
          </View>
          <Switch
            trackColor={{ false: "#3e3e3e", true: "#0891B2" }}
            thumbColor={isEndDateEnabled ? "#ffffff" : "#f4f3f4"}
            onValueChange={setIsEndDateEnabled}
            value={isEndDateEnabled}
          />
        </View>

        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <Ionicons name="notifications-outline" size={24} color="#0891B2" />
            <Text className="text-gray-300 text-base ml-4">
              Time and reminders
            </Text>
          </View>
          <View className="bg-[#083344] w-8 h-8 rounded-full items-center justify-center">
            <Text className="text-[#0891B2] font-bold">{remindersCount}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <Ionicons name="flag-outline" size={24} color="#0891B2" />
            <Text className="text-gray-300 text-base ml-4">Priority</Text>
          </View>
          <TouchableOpacity className="bg-[#083344] px-4 py-2 rounded-lg">
            <Text className="text-[#0891B2] font-bold">{priority}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="mt-auto flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-400 font-bold text-base">BACK</Text>
        </TouchableOpacity>

        <View className="flex-row space-x-2">
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#0891B2]" />
        </View>

        <TouchableOpacity onPress={handleSave}>
          <Text className="text-[#0891B2] font-bold text-base">SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reminders;
