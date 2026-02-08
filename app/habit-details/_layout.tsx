import { useHabitStore } from "@/store/useHabitStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
  Slot,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import React, { useMemo } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HabitDetailsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { habits } = useHabitStore();

  const habit = useMemo(
    () => habits.find((h) => String(h.id) === String(id)),
    [habits, id],
  );

  if (!habit) return null;

  const activeTab = pathname.includes("stats")
    ? "STATS"
    : pathname.includes("edit")
      ? "EDIT"
      : "CALENDAR";

  return (
    <View className="flex-1" style={{ backgroundColor: "#0f172a" }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="flex-1"
      >
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          {/* Header */}
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
              <Text
                className="text-2xl font-black text-white"
                numberOfLines={1}
              >
                {habit.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: "/habit-details/edit", params: { id } })
              }
              className={`w-10 h-10 rounded-full items-center justify-center border ${activeTab === "EDIT" ? "bg-indigo-500 border-indigo-400" : "bg-white/5 border-white/10"}`}
            >
              <Ionicons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Tab Switcher */}
          <View className="px-6 mb-6">
            <BlurView
              intensity={20}
              tint="dark"
              className="flex-row p-1 rounded-2xl border border-white/10 overflow-hidden"
            >
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/habit-details", params: { id } })
                }
                className={`flex-1 py-3 rounded-xl items-center ${activeTab === "CALENDAR" ? "bg-white/10" : ""}`}
              >
                <Text
                  className={`text-[10px] font-black uppercase ${activeTab === "CALENDAR" ? "text-indigo-300" : "text-gray-500"}`}
                >
                  CALENDAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/habit-details/stats",
                    params: { id },
                  })
                }
                className={`flex-1 py-3 rounded-xl items-center ${activeTab === "STATS" ? "bg-white/10" : ""}`}
              >
                <Text
                  className={`text-[10px] font-black uppercase ${activeTab === "STATS" ? "text-indigo-300" : "text-gray-500"}`}
                >
                  STATISTICS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/habit-details/edit",
                    params: { id },
                  })
                }
                className={`flex-1 py-3 rounded-xl items-center ${activeTab === "EDIT" ? "bg-white/10" : ""}`}
              >
                <Text
                  className={`text-[10px] font-black uppercase ${activeTab === "EDIT" ? "text-indigo-300" : "text-gray-500"}`}
                >
                  EDIT
                </Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          {/* Child Pages Load Here */}
          <Slot />
        </View>
      </LinearGradient>
    </View>
  );
}
