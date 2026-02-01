import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { showToast } from "@/utils/notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DefineHabit = () => {
  const router = useRouter();
  const { habitData, setStepData } = useHabitCreateStore();
  const [title, setTitle] = useState(habitData.title || "");
  const [description, setDescription] = useState(habitData.description || "");

  const [targetValue, setTargetValue] = useState(
    habitData.dailyTarget ? habitData.dailyTarget.toString() : "",
  );
  const [unit, setUnit] = useState(habitData.unit || "");

  const handleNext = () => {
    if (!title.trim()) {
      showToast("error", "Missing Information", "Please enter a habit name.");
      return;
    }

    if (habitData.type !== "yes_no") {
      if (!targetValue || isNaN(Number(targetValue))) {
        showToast(
          "error",
          "Missing Information",
          "Please enter a valid daily target.",
        );
        return;
      }

      const numericTarget = Number(targetValue);
      if (numericTarget <= 0) {
        showToast(
          "error",
          "Invalid Target",
          "Daily target must be greater than 0.",
        );
        return;
      }

      if (habitData.type === "count" && !unit.trim()) {
        showToast(
          "error",
          "Missing Information",
          "Please enter a unit (e.g., ml, pages, reps).",
        );
        return;
      }
    }

    // Save to store
    setStepData({
      title,
      description,
      dailyTarget: targetValue ? Number(targetValue) : 1,
      unit: habitData.type === "timer" ? "min" : unit,
    });

    router.push("/create-habit/step4");
  };

  const getTargetLabel = () => {
    if (habitData.type === "timer") return "Daily Goal (minutes)";
    return "Daily Target";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#121212]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-12">
          Define your habit
        </Text>

        <View className="mb-6">
          <Text className="text-[#0891B2] text-xs font-bold mb-2 ml-1 relative -top-3 left-4 bg-[#121212] self-start px-1">
            Habit Name
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Drink Water"
            placeholderTextColor="#6B7280"
            className="bg-transparent border border-[#0891B2] text-white text-lg p-4 rounded-2xl"
            autoFocus
          />
        </View>

        {/* 2. Description Input */}
        <View className="mb-6">
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description (optional)"
            placeholderTextColor="#6B7280"
            className="bg-[#1C1C1E] text-white text-base p-4 rounded-2xl border border-gray-800 h-24"
            multiline
            textAlignVertical="top"
            autoFocus
          />
        </View>

        {habitData.type !== "yes_no" && (
          <View className="flex-row space-x-4 mb-6">
            <View className="flex-1 mr-2">
              <Text className="text-[#0891B2] text-xs font-bold mb-2 ml-1 relative -top-3 left-4 bg-[#121212] self-start px-1">
                {getTargetLabel()}
              </Text>
              <TextInput
                value={targetValue}
                onChangeText={setTargetValue}
                placeholder="0"
                placeholderTextColor="#6B7280"
                keyboardType="numeric"
                className="bg-transparent border border-[#0891B2] text-white text-lg p-4 rounded-2xl"
              />
            </View>

            {/* Unit Input (Only for 'count') */}
            {habitData.type === "count" && (
              <View className="flex-1 ml-2">
                <Text className="text-[#0891B2] text-xs font-bold mb-2 ml-1 relative -top-3 left-4 bg-[#121212] self-start px-1">
                  Unit
                </Text>
                <TextInput
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="e.g. ml"
                  placeholderTextColor="#6B7280"
                  className="bg-transparent border border-[#0891B2] text-white text-lg p-4 rounded-2xl"
                />
              </View>
            )}

            {habitData.type === "timer" && (
              <View className="justify-center items-center px-4 rounded-2xl bg-transparent">
                <Text className="text-gray-400 font-bold">MIN</Text>
              </View>
            )}
          </View>
        )}

        {/* Footer / Navigation */}
        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-gray-400 font-bold text-base">BACK</Text>
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View className="flex-row space-x-2">
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#0891B2]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
          </View>

          <TouchableOpacity onPress={handleNext} disabled={!title.trim()}>
            <Text
              className={`font-bold text-base ${title.trim() ? "text-[#0891B2]" : "text-gray-600"}`}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DefineHabit;
