import { useHabitStore } from "@/store/useHabitStore";
import { generateInfiniteDates } from "@/utils/dateHelpers";
import { isSameDay } from "date-fns";
import React, { useEffect, useRef } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

const ITEM_WIDTH = 68;

const CalendarStrip = () => {
  const dates = generateInfiniteDates();
  const flatListRef = useRef<FlatList>(null);

  const { selectedDate, setSelectedDate } = useHabitStore();

  useEffect(() => {
   
    const todayIndex = dates.findIndex((date) =>
      isSameDay(date.fullDate, new Date()),
    );

    if (todayIndex !== -1) {
     
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: false,
          viewPosition: 0.7,
        });
      }, 100);
    }
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={500}
      keyExtractor={(item, index) => `date-${index}`}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        });
      }}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={21}
      removeClippedSubviews={true}
      renderItem={({ item }) => {
        const isSelected = isSameDay(item.fullDate, selectedDate);

        return (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.fullDate)}
            className={`items-center justify-center w-[60px] h-20 mx-1 rounded-2xl border ${
              isSelected
                ? "bg-[#818CF8] border-[#818CF8]"
                : "bg-[#1C1C1E] border-gray-800"
            }`}
          >
            <Text
              className={`${isSelected ? "text-white" : "text-gray-400"} text-xs font-medium`}
            >
              {item.dayName}
            </Text>
            <Text
              className={`${isSelected ? "text-white" : "text-gray-200"} text-lg font-bold mt-1`}
            >
              {item.dateNum}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CalendarStrip;
