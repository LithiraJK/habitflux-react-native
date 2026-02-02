import GlassCard from "@/components/ui/GlassCard";
import { Colors } from "@/constants/theme";
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
  color = Colors.dark.defaultCategory,
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
            <Text
              style={{ color: Colors.dark.text }}
              className="font-bold text-lg truncate"
            >
              {title}
            </Text>
            {goal && (
              <Text
                style={{ color: Colors.dark.textTertiary }}
                className="text-xs font-medium mt-0.5"
              >
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
