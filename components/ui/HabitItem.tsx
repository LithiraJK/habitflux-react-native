import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/ui/GlassCard';

interface HabitItemProps {
  title: string;
  goal?: string; 
  icon?: string;
  color?: string;
  completed: boolean;
  onToggle: () => void; 
}

const HabitItem = ({ title, goal, icon = "leaf", color = "#0891B2", completed, onToggle }: HabitItemProps) => (
  <View className="mb-4">
    <GlassCard>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {/* Icon Box */}
          <View 
            className="p-3 rounded-2xl mr-4" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Ionicons name={icon as any} size={20} color={color} />
          </View>
          
          <View>
            <Text className="text-white font-bold text-lg">{title}</Text>
            {goal && <Text className="text-gray-400 text-xs">Goal: {goal}</Text>}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={onToggle} 
          className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
            completed ? 'bg-green-500 border-green-500' : 'border-gray-700'
          }`}
        >
          {completed ? (
            <Ionicons name="checkmark" size={20} color="white" />
          ) : (
            <View /> 
          )}
        </TouchableOpacity>
      </View>
    </GlassCard>
  </View>
);

export default HabitItem;