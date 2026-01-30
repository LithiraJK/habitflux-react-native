import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const RingButton = ({ completed, onToggle }: { completed: boolean, onToggle: () => void }) => {
  const size = 48; 
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
      <View className="items-center justify-center" style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={completed ? "#22C55E40" : "#374151"} 
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={completed ? "#22C55E" : "transparent"} 
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            fill="transparent"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        
        <View className="absolute w-9 h-9 rounded-full items-center justify-center bg-transparent">
          {completed ? (
            
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