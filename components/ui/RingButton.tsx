import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const RingButton = ({
  completed,
  disabled = false,
  onToggle,
}: {
  completed: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) => {
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onToggle}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <View
        className="items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={disabled ? "#1F2937" : completed ? "#22C55E40" : "#374151"}
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={
              disabled ? "transparent" : completed ? "#22C55E" : "transparent"
            }
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        <View className="absolute w-9 h-9 rounded-full items-center justify-center bg-transparent">
          {disabled ? (
            <Ionicons name="lock-closed" size={16} color="#4B5563" />
          ) : completed ? (
            <Ionicons name="checkmark" size={24} color="#22C55E" />
          ) : (
            <Text className="text-gray-500 font-bold text-lg">0</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RingButton;
