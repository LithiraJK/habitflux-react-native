import { Colors } from "@/constants/theme";
import { Habit } from "@/services/habitService";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface StatisticsTabProps {
  habit: Habit;
}

const StatisticsTab = ({ habit }: StatisticsTabProps) => {
  // Calculate completion rate
  const completionRate = useMemo(() => {
    if (!habit.startDate) return 0;

    const start = new Date(habit.startDate);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const rate = Math.round((habit.totalCompleted / totalDays) * 100);
    return rate > 100 ? 100 : rate;
  }, [habit]);

  // SVG Circle calculations
  const size = 160;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (completionRate / 100) * circumference;

  // Helper component for statistics rows
  const StatRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <View className="flex-row justify-between py-4 border-b border-gray-800 last:border-0">
      <Text style={{ color: Colors.dark.textSecondary }} className="text-base">
        {label}
      </Text>
      <Text style={{ color: Colors.dark.text }} className="font-bold text-base">
        {value}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="items-center my-8">
        <View className="bg-gray-800 px-3 py-1 rounded-full mb-6">
          <Text
            style={{ color: Colors.dark.textSecondary }}
            className="text-xs font-bold uppercase tracking-widest"
          >
            Habit Score
          </Text>
        </View>

        <View className="items-center justify-center">
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={Colors.dark.border}
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={Colors.dark.primary}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>
          <Text
            style={{ color: Colors.dark.text }}
            className="absolute text-4xl font-bold"
          >
            {completionRate}
          </Text>
        </View>
      </View>

      {/* Streak Statistics Cards */}
      <View
        style={{ backgroundColor: Colors.dark.cardBackground }}
        className="p-6 rounded-3xl border border-gray-800 mb-6"
      >
        <View className="items-center mb-4">
          <Text
            style={{ color: Colors.dark.textTertiary }}
            className="text-xs bg-gray-800 px-2 py-1 rounded font-medium"
          >
            STREAK
          </Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <View className="items-center flex-1 border-r border-gray-700">
            <Text
              style={{ color: Colors.dark.textSecondary }}
              className="text-xs mb-1 uppercase tracking-wider"
            >
              Current
            </Text>
            <Text
              style={{ color: Colors.dark.primary }}
              className="text-xl font-bold"
            >
              {habit.currentStreak || 0} DAYS
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text
              style={{ color: Colors.dark.textSecondary }}
              className="text-xs mb-1 uppercase tracking-wider"
            >
              Best
            </Text>
            <Text
              style={{ color: Colors.dark.primary }}
              className="text-xl font-bold"
            >
              {habit.bestStreak || 0} DAYS
            </Text>
          </View>
        </View>
      </View>

      {/* Completion Breakdown */}
      <View
        style={{ backgroundColor: Colors.dark.cardBackground }}
        className="p-5 rounded-3xl border border-gray-800 mb-10"
      >
        <View className="items-center mb-2">
          <Text
            style={{ color: Colors.dark.textTertiary }}
            className="text-xs bg-gray-800 px-2 py-1 rounded font-medium"
          >
            TIMES COMPLETED
          </Text>
        </View>

        <StatRow label="Current Streak" value={habit.currentStreak || 0} />
        <StatRow label="Total Completed" value={habit.totalCompleted || 0} />
        <StatRow label="Target per day" value={habit.dailyTarget || 1} />
      </View>
    </ScrollView>
  );
};

export default StatisticsTab;
