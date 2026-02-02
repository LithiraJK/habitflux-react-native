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
      bgClass = 'bg-[#22C55E]/20 border-[#22C55E]';
      textClass = 'text-[#22C55E] font-bold';
      break;
    case 'failed':
      bgClass = 'bg-[#EF4444]/20 border-[#EF4444]';
      textClass = 'text-[#EF4444] font-bold';
      break;
    case 'pending':
      bgClass = 'border-[#F59E0B]';
      textClass = 'text-[#F59E0B] font-bold';
      break;
    case 'skipped':
        bgClass = 'bg-yellow-200/20 border-yellow-200';
        textClass = 'text-yellow-200 font-bold';
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