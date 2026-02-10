import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Reminders = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { habits } = useHabitStore();

  const habitsWithReminders = habits.filter(h => h.reminders && h.reminders.length > 0);

  return (
    <View className="flex-1" style={{ backgroundColor: "#0f172a" }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0f172a", "#1e1b4b", "#0f172a"]} className="flex-1">
        
        {/* SafeArea Padding */}
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          
          {/* Header Section */}
          <View className="px-6 py-4 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/10"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-1 px-4">
                <Text className="text-indigo-400 text-[10px] uppercase tracking-[3px] font-black">
                    Settings
                </Text>
                <Text className="text-2xl font-black text-white">Reminders</Text>
            </View>
          </View>

          <ScrollView 
            className="flex-1 px-6" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-1">
                Active Notifications
            </Text>

            {habitsWithReminders.length > 0 ? (
              habitsWithReminders.map((habit) => (
                <View key={habit.id} className="mb-4 rounded-[28px] overflow-hidden border border-white/10">
                  <BlurView intensity={20} tint="dark" className="p-5 flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View 
                        className="w-10 h-10 rounded-2xl items-center justify-center mr-4"
                        style={{ backgroundColor: `${habit.color || '#818cf8'}20` }}
                      >
                        <Ionicons name="notifications" size={20} color={habit.color || "#818cf8"} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold text-base" numberOfLines={1}>
                            {habit.title}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                            Daily at {habit.reminders?.[0]?.time || "N/A"}
                        </Text>
                      </View>
                    </View>

                    <Switch
                      trackColor={{ false: "#1e293b", true: "#4f46e5" }}
                      thumbColor="#ffffff"
                      value={true}
                    />
                  </BlurView>
                </View>
              ))
            ) : (
              <View className="items-center justify-center mt-20">
                <View className="w-20 h-20 rounded-full bg-white/5 items-center justify-center border border-white/5 mb-4">
                   <Ionicons name="notifications-off-outline" size={40} color="#334155" />
                </View>
                <Text className="text-gray-500 font-medium text-center">
                    No reminders set yet.{"\n"}Enable reminders in Habit settings.
                </Text>
              </View>
            )}

            {/* Global Settings Section */}
            <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-6 mb-4 ml-1">
                Global Settings
            </Text>
            <View className="rounded-[32px] overflow-hidden border border-white/10">
                <BlurView intensity={20} tint="dark" className="p-2">
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5">
                        <View className="flex-row items-center">
                            <Ionicons name="volume-medium-outline" size={20} color="#94a3b8" />
                            <Text className="text-gray-300 ml-3 font-medium">Notification Sound</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#334155" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center">
                            <Ionicons name="hammer-outline" size={20} color="#94a3b8" />
                            <Text className="text-gray-300 ml-3 font-medium">Troubleshoot Notifications</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#334155" />
                    </TouchableOpacity>
                </BlurView>
            </View>

          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Reminders;