import { Colors } from "@/constants/theme";
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
            style={{
              backgroundColor: isSelected
                ? Colors.dark.primary
                : Colors.dark.cardBackground,
              borderColor: isSelected
                ? Colors.dark.primary
                : Colors.dark.border,
            }}
            className="items-center justify-center w-[60px] h-20 mx-1 rounded-2xl border"
          >
            <Text
              style={{
                color: isSelected
                  ? Colors.dark.text
                  : Colors.dark.textSecondary,
              }}
              className="text-xs font-medium"
            >
              {item.dayName}
            </Text>
            <Text
              style={{
                color: isSelected ? Colors.dark.text : Colors.dark.textTertiary,
              }}
              className="text-lg font-bold mt-1"
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
