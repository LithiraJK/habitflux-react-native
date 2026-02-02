import { Colors } from "@/constants/theme";
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
            stroke={
              disabled
                ? Colors.dark.disabled
                : completed
                  ? `${Colors.dark.success}40`
                  : Colors.dark.border
            }
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={
              disabled
                ? "transparent"
                : completed
                  ? Colors.dark.success
                  : "transparent"
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
            <Ionicons
              name="lock-closed"
              size={16}
              color={Colors.dark.disabledText}
            />
          ) : completed ? (
            <Ionicons name="checkmark" size={24} color={Colors.dark.success} />
          ) : (
            <Text
              style={{ color: Colors.dark.textTertiary }}
              className="font-bold text-lg"
            >
              0
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RingButton;
