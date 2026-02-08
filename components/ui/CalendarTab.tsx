import { Habit } from "@/services/habitService";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarTab = ({ habit }: { habit: Habit }) => {
  return (
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      
      
      <View className="rounded-[32px] overflow-hidden border border-white/10 mb-6">
        <BlurView intensity={20} tint="dark" className="p-4">
          <Calendar
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: "#94a3b8",
              dayTextColor: "#ffffff",
              todayTextColor: "#818cf8",
              monthTextColor: "#ffffff",
              arrowColor: "#818cf8",
              textDayFontWeight: "600",
              textMonthFontWeight: "900",
            }}
          />
        </BlurView>
      </View>

      {/* 2. Streak Row */}
      <View className="flex-row space-x-4 mb-6">
        <BlurView intensity={20} tint="dark" className="flex-1 p-5 rounded-[28px] border border-white/10 items-center">
            <Ionicons name="flame" size={24} color="#818cf8" />
            <Text className="text-white text-3xl font-black mt-2">{habit.currentStreak || 0}</Text>
            <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Current Streak</Text>
        </BlurView>
        <BlurView intensity={20} tint="dark" className="flex-1 p-5 rounded-[28px] border border-white/10 items-center">
            <Ionicons name="trophy" size={22} color="#34d399" />
            <Text className="text-white text-3xl font-black mt-2">{habit.bestStreak || 0}</Text>
            <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Best Streak</Text>
        </BlurView>
      </View>

      {/* 3. Monthly Notes Section */}
      <BlurView intensity={20} tint="dark" className="p-6 rounded-[32px] border border-white/10">
          <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Ionicons name="document-text" size={18} color="#818cf8" />
                <Text className="text-white font-bold ml-2">Monthly Notes</Text>
              </View>
              <TouchableOpacity className="bg-white/10 px-3 py-1 rounded-lg"><Text className="text-white text-[10px] font-bold">VIEW ALL</Text></TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-center italic text-xs mb-6">"Every small step counts towards a bigger change."</Text>
          <TouchableOpacity className="bg-indigo-500/10 py-3 rounded-2xl border border-indigo-500/20 items-center">
              <Text className="text-indigo-400 font-black text-xs uppercase">+ Add Daily Note</Text>
          </TouchableOpacity>
      </BlurView>

    </ScrollView>
  );
};

export default CalendarTab;