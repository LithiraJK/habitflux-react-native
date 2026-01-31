import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { HabitStatus } from './HabitCard';

export const DayItem = ({ date, status }: { date: Date; status: HabitStatus }) => {
  const dayName = format(date, 'EEE');
  const dayNumber = format(date, 'd');

  let bgClass = 'bg-transparent border border-gray-700';
  let textClass = 'text-gray-400';

  switch (status) {
    case 'completed':
      bgClass = 'bg-[#22C55E] border-[#22C55E]';
      textClass = 'text-black font-bold';
      break;
    case 'failed':
      bgClass = 'bg-[#EF4444]/20 border-[#EF4444]';
      textClass = 'text-[#EF4444]';
      break;
    case 'pending':
      bgClass = 'border-[#F59E0B]';
      textClass = 'text-[#F59E0B]';
      break;
    case 'skipped':
        bgClass = 'bg-gray-700 border-gray-700';
        textClass = 'text-gray-400';
        break;
    default:
        bgClass = 'border-gray-800'; 
        textClass = 'text-gray-600';
  }

  return (
    <View className="items-center mr-3">
      <Text className="text-gray-500 text-[10px] mb-1">{dayName}</Text>
      <View className={`w-9 h-9 rounded-full items-center justify-center border ${bgClass}`}>
        <Text className={`text-xs ${textClass}`}>{dayNumber}</Text>
      </View>
    </View>
  );
};