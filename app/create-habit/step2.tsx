import { Colors } from "@/constants/theme";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProgressEvaluation = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();

  const handleSelect = (type: "yes_no" | "timer" | "count") => {
    setStepData({ type });
    router.push("/create-habit/step3");
  };

  return (
    <View
      className="flex-1 p-6 justify-center"
      style={{ backgroundColor: Colors.dark.background }}
    >
      <Text
        className="text-xl font-bold text-center mb-10"
        style={{ color: Colors.dark.primary }}
      >
        How do you want to evaluate your progress?
      </Text>

      <TouchableOpacity
        onPress={() => handleSelect("yes_no")}
        activeOpacity={0.8}
        className="p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
        style={{ backgroundColor: Colors.dark.primary }}
      >
        <View className="items-center mr-4">
          <Text
            className="font-bold text-lg mb-1"
            style={{ color: Colors.dark.text }}
          >
            WITH A YES OR NO
          </Text>
          <Text className="text-xs" style={{ color: Colors.dark.text }}>
            Simple check: Did I do it? (e.g., Wake up early)
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSelect("count")}
        activeOpacity={0.8}
        className="p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
        style={{ backgroundColor: Colors.dark.primary }}
      >
        <View className="items-center mr-4">
          <Text
            className="font-bold text-lg mb-1"
            style={{ color: Colors.dark.text }}
          >
            WITH A NUMERIC VALUE
          </Text>
          <Text className="text-xs" style={{ color: Colors.dark.text }}>
            Track units (e.g., 2000ml water, 10 pages)
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSelect("timer")}
        activeOpacity={0.8}
        className="p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
        style={{ backgroundColor: Colors.dark.primary }}
      >
        <View className="items-center mr-4">
          <Text
            className="font-bold text-lg mb-1"
            style={{ color: Colors.dark.text }}
          >
            WITH A TIMER
          </Text>
          <Text className="text-xs" style={{ color: Colors.dark.text }}>
            Track duration (e.g., Meditate for 30 mins)
          </Text>
        </View>
      </TouchableOpacity>

      <View className="mt-auto flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text
            className="font-bold text-base"
            style={{ color: Colors.dark.textSecondary }}
          >
            BACK
          </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-2">
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
          <View
            className="w-2 m-1 h-2 rounded-full"
            style={{ backgroundColor: Colors.dark.disabled }}
          />
        </View>

        <View style={{ width: 40 }} />
      </View>
    </View>
  );
};

export default ProgressEvaluation;
