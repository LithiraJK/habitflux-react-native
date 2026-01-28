import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/ui/GlassCard';

const HabitItem = ({ title, goal, icon, color, completed }: any) => (
  <View className="mb-4">
    <GlassCard>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View 
            className="p-3 rounded-2xl mr-4" 
            style={{ backgroundColor: `${color}20` }}
          >
            <FontAwesome5 name={icon} size={20} color={color} />
          </View>
          <View>
            <Text className="text-white font-bold text-lg">{title}</Text>
            <Text className="text-gray-400 text-xs">Goal: {goal}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
            completed ? 'bg-green-500 border-green-500' : 'border-gray-700'
          }`}
        >
          {completed ? (
            <Ionicons name="checkmark" size={20} color="white" />
          ) : (
            <Text className="text-gray-500 font-bold">0</Text>
          )}
        </TouchableOpacity>
      </View>
    </GlassCard>
  </View>
);

export default HabitItem;