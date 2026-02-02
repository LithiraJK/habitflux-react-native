import { Habit } from "@/services/habitService";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarTabProps {
  habit: Habit;
}

const CalendarTab = ({ habit }: CalendarTabProps) => {
  const markedDates = useMemo(() => {
    const dates: any = {};
    const history = habit.history || {};

    Object.keys(history).forEach((date) => {
      const record = history[date];
      const status = record.status;

      let color = "#374151";

      if (status === "completed") color = "#22C55E";
      if (status === "failed") color = "#EF4444";
      if (status === "skipped") color = "#F59E0B";

      dates[date] = {
        selected: true,
        selectedColor: color,
        disableTouchEvent: true,
      };
    });

    return dates;
  }, [habit]);

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* Calendar View */}
      <View className="mt-4 mb-6">
        <Calendar
          theme={{
            backgroundColor: "#121212",
            calendarBackground: "#121212",
            textSectionTitleColor: "#6B7280",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#8B5CF6",
            dayTextColor: "#ffffff",
            textDisabledColor: "#374151",
            monthTextColor: "#ffffff",
            arrowColor: "#8B5CF6",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayFontSize: 14,
          }}
          markedDates={markedDates}
        />
      </View>

      {/* Current Streak Display */}
      <View className="bg-[#1C1C1E] p-4 rounded-2xl border border-gray-800 items-center mb-6">
        <View className="bg-gray-800 px-3 py-1 rounded-full mb-2">
          <Text className="text-gray-400 text-xs font-medium">
            Current Streak
          </Text>
        </View>
        <View className="flex-row items-end">
          <Text className="text-[#8B5CF6] text-3xl font-bold">
            {habit.currentStreak || 0}
          </Text>
          <Text className="text-gray-500 text-base mb-1 ml-1 font-medium">
            DAYS
          </Text>
        </View>
      </View>

      {/* Notes Section Placeholder */}
      <View className="items-center mb-8">
        <View className="bg-gray-800 px-3 py-1 rounded-full mb-4">
          <Text className="text-gray-400 text-xs font-medium">Notes</Text>
        </View>
        <View className="flex-row items-center opacity-50">
          <Ionicons name="document-text-outline" size={20} color="gray" />
          <Text className="text-gray-500 ml-2">No notes for this month</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CalendarTab;
