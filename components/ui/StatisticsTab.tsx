import { Colors } from "@/constants/theme";
import { Habit } from "@/services/habitService";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface StatisticsTabProps {
  habit: Habit;
}

const StatisticsTab = ({ habit }: StatisticsTabProps) => {
  const completionRate = useMemo(() => {
    if (!habit.startDate) return 0;
    const start = new Date(habit.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const rate = Math.round((habit.totalCompleted / totalDays) * 100);
    return Math.min(rate, 100);
  }, [habit]);

  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  const StatBox = ({ label, value, icon, color }: any) => (
    <View className="flex-1 rounded-3xl overflow-hidden border border-white/10">
      <BlurView intensity={20} tint="dark" className="p-5 items-center">
        <View className="w-10 h-10 rounded-2xl bg-white/5 items-center justify-center mb-2 border border-white/5">
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text className="text-white text-2xl font-black">{value}</Text>
        <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{label}</Text>
      </BlurView>
    </View>
  );

  return (
    <ScrollView 
      className="flex-1 px-6" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="mt-4 mb-6 rounded-[32px] overflow-hidden border border-white/10">
        <BlurView intensity={20} tint="dark" className="p-8 items-center">
          <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-[4px] mb-6">Habit Score</Text>
          
          <View className="items-center justify-center">
            <Svg width={size} height={size}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#818cf8"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
              />
            </Svg>
            <View className="absolute items-center justify-center">
              <Text className="text-white text-5xl font-black">{completionRate}%</Text>
              <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Success</Text>
            </View>
          </View>
        </BlurView>
      </View>

      <View className="flex-row space-x-4 mb-6">
        <StatBox label="Total" value={habit.totalCompleted || 0} icon="checkmark-done" color="#34d399" />
        <StatBox label="Best" value={habit.bestStreak || 0} icon="trophy" color="#fbbf24" />
      </View>

      <View className="rounded-[32px] overflow-hidden border border-white/10">
        <BlurView intensity={20} tint="dark" className="p-6">
          <Text className="text-white font-bold text-lg mb-4">Detailed Insights</Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-3 border-b border-white/5">
                <Text className="text-gray-400 font-medium">Daily Target</Text>
                <Text className="text-white font-bold">{habit.dailyTarget} {habit.bestStreak || "times"}</Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-white/5">
                <Text className="text-gray-400 font-medium">Current Streak</Text>
                <View className="flex-row items-center">
                    <Ionicons name="flame" size={14} color="#f87171" style={{ marginRight: 4 }} />
                    <Text className="text-white font-bold">{habit.currentStreak} Days</Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center py-3">
                <Text className="text-gray-400 font-medium">Evaluation Type</Text>
                <Text className="text-indigo-300 font-black uppercase text-[10px]">{habit.type.replace('_', ' ')}</Text>
            </View>
          </View>
        </BlurView>
      </View>

    </ScrollView>
  );
};

export default StatisticsTab;