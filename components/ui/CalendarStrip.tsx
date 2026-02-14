import { useHabitStore } from "@/store/useHabitStore";
import { generateInfiniteDates } from "@/utils/dateHelpers";
import { isSameDay } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ITEM_WIDTH = 68;

const CalendarStrip = () => {
  const dates = useMemo(() => generateInfiniteDates(), []);
  const flatListRef = useRef<FlatList>(null);
  const [isReady, setIsReady] = useState(false);

  const { selectedDate, setSelectedDate } = useHabitStore();

  const todayIndex = useMemo(
    () => dates.findIndex((date) => isSameDay(date.fullDate, new Date())),
    [dates],
  );

  useEffect(() => {
    if (todayIndex !== -1 && flatListRef.current) {
      // Use requestAnimationFrame for smoother, immediate positioning
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: false,
          viewPosition: 0.5,
        });
        setIsReady(true);
      });
    }
  }, [todayIndex]);

  const renderDateItem = useCallback(
    ({ item }: { item: any }) => {
      const isSelected = isSameDay(item.fullDate, selectedDate);

      return (
        <TouchableOpacity
          onPress={() => setSelectedDate(item.fullDate)}
          activeOpacity={0.7}
          className="mx-1"
        >
          {isSelected ? (
            <LinearGradient
              colors={["#6366f1", "#4f46e5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-[60px] h-20 rounded-2xl overflow-hidden items-center justify-center shadow-lg shadow-indigo-500/40"
            >
              <Text className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider mb-1">
                {item.dayName}
              </Text>
              <Text className="text-white text-xl font-black">
                {item.dateNum}
              </Text>
            </LinearGradient>
          ) : (
            <View className="w-[60px] h-20 rounded-2xl items-center justify-center bg-white/5 border border-white/10">
              <Text className="text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">
                {item.dayName}
              </Text>
              <Text className="text-gray-300 text-xl font-bold">
                {item.dateNum}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [selectedDate, setSelectedDate],
  );

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={todayIndex !== -1 ? todayIndex : 180}
      keyExtractor={(item, index) => `date-${index}`}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
      onScrollToIndexFailed={(info) => {
        requestAnimationFrame(() => {
          flatListRef.current?.scrollToIndex({
            index: info.index,
            animated: false,
            viewPosition: 0.5,
          });
        });
      }}
      initialNumToRender={7}
      maxToRenderPerBatch={5}
      windowSize={11}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={30}
      contentContainerStyle={{
        paddingHorizontal: 10,
        opacity: isReady ? 1 : 0,
      }}
      renderItem={renderDateItem}
    />
  );
};

export default CalendarStrip;
