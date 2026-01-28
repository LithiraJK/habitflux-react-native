import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitItem from '@/components/ui/HabitItem';
import CalendarStrip from '@/components/ui/CalendarStrip';
import { useHabitStore } from '@/store/useHabitStore';
import { format } from 'date-fns';
import ProgressRing from '@/components/ui/ProgressRing';

const HomeScreen = () => {
  const selectedDate = useHabitStore((state) => state.selectedDate);

  return (
    <View className="flex-1 bg-[#121212] px-4">
      <View className="h-[100px] justify-center">
        <CalendarStrip />
      </View>

      <View className="pt-2 pb-1">
        <Text className="text-gray-400 text-xs font-medium uppercase tracking-widest">
          {format(selectedDate, "EEEE, d MMMM")}
        </Text>
      </View>

      <View className="items-center mt-2">
        <ProgressRing percentage={50} size={160} />
      </View>

      <View className="flex-1 mt-4">
        <HabitItem title="Cardio" goal="1" icon="running" color="#34C759" completed={true} />
        <HabitItem title="Vitamins" goal="1" icon="pills" color="#FF9500" completed={false} />
        <HabitItem title="Drink Water" goal="3L" icon="tint" color="#0A84FF" completed={false} />
      </View>

      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#818CF8] rounded-2xl items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;