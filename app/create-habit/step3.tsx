import { Colors } from "@/constants/theme";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { showToast } from "@/utils/notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

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
      className="flex-1"
    >
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <Text
          className="text-xl font-bold text-center mt-10 mb-12"
          style={{ color: Colors.dark.primary }}
        >
          Define your habit
        </Text>

        <View className="mb-6 rounded-3xl overflow-hidden border border-white/10">
  <BlurView intensity={20} tint="dark" className="p-4">
    <Text className="text-indigo-400 text-[10px] uppercase tracking-widest font-black mb-2 ml-1">
      Habit Name
    </Text>
    <TextInput
      value={title}
      onChangeText={setTitle}
      placeholder="e.g., Drink Water"
      placeholderTextColor="#64748b"
      className="text-white text-lg font-bold py-2 px-1"
      autoFocus
    />
  </BlurView>
</View>

<View className="mb-6 rounded-3xl overflow-hidden border border-white/10">
  <BlurView intensity={20} tint="dark" className="p-4">
    <Text className="text-gray-500 text-[10px] uppercase tracking-widest font-black mb-2 ml-1">
      Description (Optional)
    </Text>
    <TextInput
      value={description}
      onChangeText={setDescription}
      placeholder="Add some details..."
      placeholderTextColor="#475569"
      className="text-gray-300 text-sm py-2 px-1 min-h-[80px]"
      multiline
      textAlignVertical="top"
    />
  </BlurView>
</View>

        {habitData.type !== "yes_no" && (
          <View className="flex-row space-x-4 mb-6">
            <View className="flex-1 mr-2">
              <Text
                className="text-xs font-bold mb-2 ml-1 relative -top-3 left-4 self-start px-1"
                style={{
                  color: Colors.dark.primary,
                  backgroundColor: Colors.dark.background,
                }}
              >
                {getTargetLabel()}
              </Text>
              <TextInput
                value={targetValue}
                onChangeText={setTargetValue}
                placeholder="0"
                placeholderTextColor={Colors.dark.textSecondary}
                keyboardType="numeric"
                className="bg-transparent text-lg p-4 rounded-2xl"
                style={{
                  borderWidth: 1,
                  borderColor: Colors.dark.primary,
                  color: Colors.dark.text,
                }}
              />
            </View>

            {/* Unit Input (Only for 'count') */}
            {habitData.type === "count" && (
              <View className="flex-1 ml-2">
                <Text
                  className="text-xs font-bold mb-2 ml-1 relative -top-3 left-4 self-start px-1"
                  style={{
                    color: Colors.dark.primary,
                    backgroundColor: Colors.dark.background,
                  }}
                >
                  Unit
                </Text>
                <TextInput
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="e.g. ml"
                  placeholderTextColor={Colors.dark.textSecondary}
                  className="bg-transparent text-lg p-4 rounded-2xl"
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.dark.primary,
                    color: Colors.dark.text,
                  }}
                />
              </View>
            )}

            {habitData.type === "timer" && (
              <View className="justify-center items-center px-4 rounded-2xl bg-transparent">
                <Text
                  className="font-bold"
                  style={{ color: Colors.dark.textSecondary }}
                >
                  MIN
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Footer / Navigation */}
        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text
              className="font-bold text-base"
              style={{ color: Colors.dark.textSecondary }}
            >
              BACK
            </Text>
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View className="flex-row space-x-2">
            <View
              className="w-2 m-1 h-2 rounded-full"
              style={{ backgroundColor: Colors.dark.disabled }}
            />
            <View
              className="w-2 m-1 h-2 rounded-full"
              style={{ backgroundColor: Colors.dark.disabled }}
            />
            <View
              className="w-2 m-1 h-2 rounded-full"
              style={{ backgroundColor: Colors.dark.primary }}
            />
            <View
              className="w-2 m-1 h-2 rounded-full"
              style={{ backgroundColor: Colors.dark.disabled }}
            />
            <View
              className="w-2 m-1 h-2 rounded-full"
              style={{ backgroundColor: Colors.dark.disabled }}
            />
          </View>

          <TouchableOpacity onPress={handleNext} disabled={!title.trim()}>
            <Text
              className="font-bold text-base"
              style={{
                color: title.trim()
                  ? Colors.dark.primary
                  : Colors.dark.disabled,
              }}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default DefineHabit;
