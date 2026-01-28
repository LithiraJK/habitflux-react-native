import React, { useRef } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { generateInfiniteDates } from '@/utils/dateHelpers';

const ITEM_WIDTH = 68; // (Width 60 + Margin 4*2)

const CalendarStrip = ({ onDateSelect }: any) => {
  const dates = generateInfiniteDates();
  const flatListRef = useRef<FlatList>(null);

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      horizontal
      initialScrollIndex={500} // Start from the middle for infinite effect
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onDateSelect(item.fullDate)}
          className={`items-center justify-center w-[60px] h-20 mx-1 rounded-2xl border ${
            item.isToday ? 'bg-[#818CF8] border-[#818CF8]' : 'bg-[#1C1C1E] border-gray-800'
          }`}
        >
          <Text className="text-gray-400 text-xs font-medium">{item.dayName}</Text>
          <Text className="text-white text-lg font-bold mt-1">{item.dateNum}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CalendarStrip;