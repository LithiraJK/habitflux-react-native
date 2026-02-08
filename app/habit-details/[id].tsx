import CalendarTab from "@/components/ui/CalendarTab";
import EditTab from "@/components/ui/EditTab";
import StatisticsTab from "@/components/ui/StatisticsTab";
import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HabitDetailScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); 
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<"CALENDAR" | "STATISTICS" | "EDIT">("CALENDAR");
  const { habits } = useHabitStore();

  const selectedHabit = useMemo(() => {
    return habits.find((h) => String(h.id) === String(id));
  }, [habits, id]);

  if (!selectedHabit) return null;

  return (
    <View className="flex-1" style={{ backgroundColor: "#0f172a" }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0f172a", "#1e1b4b", "#0f172a"]} className="flex-1">
        
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          
          {/* --- Header Section --- */}
          <View className="px-6 py-4 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/10"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-1 px-4">
                <Text className="text-indigo-400 text-[10px] uppercase tracking-[3px] font-black">
                    Habit Details
                </Text>
                <Text className="text-2xl font-black text-white" numberOfLines={1}>
                    {selectedHabit.title}
                </Text>
            </View>
            
            <TouchableOpacity 
                onPress={() => setActiveTab("EDIT")}
                className={`w-10 h-10 rounded-full items-center justify-center border ${
                  activeTab === "EDIT" ? "bg-indigo-500 border-indigo-400" : "bg-white/5 border-white/10"
                }`}
            >
                 <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <View className="px-6 mb-6">
            <BlurView intensity={20} tint="dark" className="flex-row p-1 rounded-2xl border border-white/10 overflow-hidden">
              {(["CALENDAR", "STATISTICS", "EDIT"] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === tab ? "bg-white/10 shadow-sm" : "bg-transparent"}`}
                >
                  <Text className={`text-[10px] font-black uppercase tracking-widest ${activeTab === tab ? "text-indigo-300" : "text-gray-500"}`}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </BlurView>
          </View>

          <View className="flex-1">
            {activeTab === "CALENDAR" && <CalendarTab habit={selectedHabit} />}
            {activeTab === "STATISTICS" && <StatisticsTab habit={selectedHabit} />}
            {activeTab === "EDIT" && <EditTab habit={selectedHabit} />}
          </View>

        </View>
      </LinearGradient>
    </View>
  );
};

export default HabitDetailScreen;