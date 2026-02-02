import { Colors } from "@/constants/theme";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { showToast } from "@/utils/notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

const FREQUENCIES = ["Every day", "Specific days of the week"];

const Frequency = () => {
  const router = useRouter();
  const { habitData, setStepData } = useHabitCreateStore();

  const [selectedOption, setSelectedOption] = useState<string>(
    habitData.frequency?.type === "weekly"
      ? "Specific days of the week"
      : "Every day",
  );

  const [selectedDays, setSelectedDays] = useState<number[]>(
    habitData.frequency?.daysOfWeek || [],
  );

  const toggleDay = (index: number) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((d) => d !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const handleNext = () => {
    let frequencyObject: any = { type: "daily", interval: 1 };

    if (selectedOption === "Every day") {
      frequencyObject = { type: "daily", interval: 1 };
    } else if (selectedOption === "Specific days of the week") {
      if (selectedDays.length === 0) {
        showToast(
          "error",
          "Select Days",
          "Please select at least one day of the week.",
        );
        return;
      }
      frequencyObject = { type: "weekly", daysOfWeek: selectedDays };
    }

    setStepData({ frequency: frequencyObject });

    router.push("/create-habit/step5");
  };

  return (
    <View
      className="flex-1 p-6"
      style={{ backgroundColor: Colors.dark.background }}
    >
      <Text
        className="text-xl font-bold text-center mt-10 mb-10"
        style={{ color: Colors.dark.primary }}
      >
        How often do you want to do it?
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {FREQUENCIES.map((freq) => (
          <View key={freq} className="mb-6">
            <TouchableOpacity
              onPress={() => setSelectedOption(freq)}
              className="flex-row items-center mb-2"
              activeOpacity={0.7}
            >
              <View
                className="w-6 h-6 rounded-full border-2 items-center justify-center mr-4"
                style={{
                  borderColor:
                    selectedOption === freq
                      ? Colors.dark.primary
                      : Colors.dark.textSecondary,
                }}
              >
                {selectedOption === freq && (
                  <View
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: Colors.dark.primary }}
                  />
                )}
              </View>

              <Text
                className="text-base font-medium"
                style={{
                  color:
                    selectedOption === freq
                      ? Colors.dark.text
                      : Colors.dark.textSecondary,
                }}
              >
                {freq}
              </Text>
            </TouchableOpacity>

            {/* Day Selector */}
            {freq === "Specific days of the week" &&
              selectedOption === freq && (
                <View className="flex-row justify-between ml-10 mt-2">
                  {DAYS_OF_WEEK.map((day, index) => {
                    const isSelected = selectedDays.includes(index);
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => toggleDay(index)}
                        className="w-9 h-9 rounded-full items-center justify-center"
                        style={{
                          backgroundColor: isSelected
                            ? Colors.dark.primary
                            : "transparent",
                          borderWidth: 1,
                          borderColor: isSelected
                            ? Colors.dark.primary
                            : Colors.dark.border,
                        }}
                      >
                        <Text
                          className="font-bold"
                          style={{
                            color: isSelected
                              ? Colors.dark.text
                              : Colors.dark.textSecondary,
                          }}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
          </View>
        ))}
      </ScrollView>

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
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Text
            className="font-bold text-base"
            style={{ color: Colors.dark.primary }}
          >
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Frequency;
