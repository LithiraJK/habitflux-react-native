import React, { useRef } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { generateInfiniteDates } from '@/utils/dateHelpers';
import { useHabitStore } from '@/store/useHabitStore';
import { isSameDay } from 'date-fns';

const ITEM_WIDTH = 68;

const CalendarStrip = () => {
  const dates = generateInfiniteDates();
  const flatListRef = useRef<FlatList>(null);

  const { selectedDate, setSelectedDate } = useHabitStore();

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={250}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      renderItem={({ item }) => {
        const isSelected = isSameDay(item.fullDate, selectedDate);

        return (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.fullDate)}
            className={`items-center justify-center w-[60px] h-20 mx-1 rounded-2xl border ${
              isSelected ? 'bg-[#818CF8] border-[#818CF8]' : 'bg-[#1C1C1E] border-gray-800'
            }`}
          >
            <Text className={`${isSelected ? 'text-white' : 'text-gray-400'} text-xs font-medium`}>
              {item.dayName}
            </Text>
            <Text className={`${isSelected ? 'text-white' : 'text-gray-200'} text-lg font-bold mt-1`}>
              {item.dateNum}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CalendarStrip;