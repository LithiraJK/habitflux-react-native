import GlassCard from "@/components/ui/GlassCard";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import RingButton from "./RingButton";

interface HabitItemProps {
  title: string;
  goal?: string;
  icon?: string;
  color?: string;
  completed: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

const HabitItem = ({
  title,
  goal,
  icon = "leaf",
  color = "#0891B2",
  completed,
  disabled = false,
  onToggle,
}: HabitItemProps) => (
  <View className="mb-4">
    <GlassCard>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 mr-4">
          <View
            className="p-3 rounded-2xl mr-4"
            style={{ backgroundColor: `${color}20` }}
          >
            <Ionicons name={icon as any} size={24} color={color} />
          </View>

          <View className="flex-1">
            <Text className="text-white font-bold text-lg truncate">
              {title}
            </Text>
            {goal && (
              <Text className="text-gray-300 text-xs font-medium mt-0.5">
                Goal: {goal}
              </Text>
            )}
          </View>
        </View>

        <RingButton
          completed={completed}
          disabled={disabled}
          onToggle={onToggle}
        />
      </View>
    </GlassCard>
  </View>
);

export default HabitItem;
