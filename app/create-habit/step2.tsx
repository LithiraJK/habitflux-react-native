import { Colors } from "@/constants/theme";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const ProgressEvaluation = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();

  const handleSelect = (type: "yes_no" | "timer" | "count") => {
    setStepData({ type });
    router.push("/create-habit/step3");
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e1b4b", "#0f172a"]}
      className="flex-1"
    >
      <View className="flex-1 p-6 justify-center">
        <Text
          className="text-xl font-bold text-center mb-10 mt-10"
          style={{ color: Colors.dark.primary }}
        >
          How do you want to evaluate your progress?
        </Text>

        {/* --- WITH A YES OR NO --- */}
        <TouchableOpacity
          onPress={() => handleSelect("yes_no")}
          activeOpacity={0.8}
          className="mb-4 rounded-[28px] overflow-hidden border border-white/10"
        >
          <BlurView
            intensity={20}
            tint="dark"
            className="p-5 flex-row items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-indigo-500/20 items-center justify-center mr-4 border border-indigo-500/20">
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#818cf8"
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-1 tracking-tight">
                WITH A YES OR NO
              </Text>
              <Text className="text-gray-400 text-xs leading-4">
                Simple check: Did I do it? (e.g., Wake up early)
              </Text>
            </View>
          </BlurView>
        </TouchableOpacity>

        {/* --- WITH A NUMERIC VALUE --- */}
        <TouchableOpacity
          onPress={() => handleSelect("count")}
          activeOpacity={0.8}
          className="mb-4 rounded-[28px] overflow-hidden border border-white/10"
        >
          <BlurView
            intensity={20}
            tint="dark"
            className="p-5 flex-row items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-indigo-500/20 items-center justify-center mr-4 border border-indigo-500/20">
              <Ionicons name="calculator-outline" size={24} color="#818cf8" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-1 tracking-tight">
                WITH A NUMERIC VALUE
              </Text>
              <Text className="text-gray-400 text-xs leading-4">
                Track units (e.g., 2000ml water, 10 pages)
              </Text>
            </View>
          </BlurView>
        </TouchableOpacity>

        {/* --- WITH A TIMER --- */}
        <TouchableOpacity
          onPress={() => handleSelect("timer")}
          activeOpacity={0.8}
          className="mb-4 rounded-[28px] overflow-hidden border border-white/10"
        >
          <BlurView
            intensity={20}
            tint="dark"
            className="p-5 flex-row items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-indigo-500/20 items-center justify-center mr-4 border border-indigo-500/20">
              <Ionicons name="stopwatch-outline" size={24} color="#818cf8" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg mb-1 tracking-tight">
                WITH A TIMER
              </Text>
              <Text className="text-gray-400 text-xs leading-4">
                Track duration (e.g., Meditate for 30 mins)
              </Text>
            </View>
          </BlurView>
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
    </LinearGradient>
  );
};

export default ProgressEvaluation;
