import React, { useCallback, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { format } from 'date-fns';
import HabitItem from '@/components/ui/HabitItem';
import CalendarStrip from '@/components/ui/CalendarStrip';
import ProgressRing from '@/components/ui/ProgressRing';
import { useHabitStore } from '@/store/useHabitStore';
import { useCategoryStore } from '@/store/useCategoryStore';

const HomeScreen = () => {
  const { 
    habits, 
    fetchHabits, 
    toggleHabitStatus, 
    isLoading: isHabitLoading, 
    selectedDate 
  } = useHabitStore();

  const { 
    categories, 
    defaultCategories, 
    fetchCategories 
  } = useCategoryStore();

  const allCategories = useMemo(() => [...categories, ...defaultCategories], [categories, defaultCategories]);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
      fetchCategories();
    }, [])
  );

  // Progress Calculation
  const progressPercentage = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedCount = habits.filter(h => h.isComplete).length;
    return Math.round((completedCount / habits.length) * 100);
  }, [habits]);

 
  const getHabitStyle = (categoryId: string) => {
    const foundCategory =  allCategories.find(cat => cat.id === categoryId);
    
    if (foundCategory) {
      return { 
        icon: foundCategory.icon, 
        color: foundCategory.color 
      };
    }
    
    return { icon: 'leaf', color: '#818CF8' };
  };

  return (
    <View className="flex-1 bg-[#121212]">
      
      {/* Calendar Strip */}
      <View className="px-4 h-[100px] justify-center z-10">
        <CalendarStrip />
      </View>

      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl 
            refreshing={isHabitLoading} 
            onRefresh={() => { fetchHabits(); fetchCategories(); }} 
            tintColor="#0891B2" 
          />
        }
      >
        {/* Date Header */}
        <View className="pt-2 pb-1">
          <Text className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            {format(selectedDate, "EEEE, d MMMM")}
          </Text>
        </View>

        {/* Progress Ring */}
        <View className="items-center mt-4 mb-6">
          <ProgressRing percentage={progressPercentage} size={160} />
        </View>

        {/* Habits List */}
        <View className="flex-1">
          {isHabitLoading && habits.length === 0 ? (
            <ActivityIndicator size="large" color="#818CF8" className="mt-10" />
          ) : habits.length === 0 ? (
            <View className="items-center mt-10 opacity-50">
              <Ionicons name="list" size={48} color="gray" />
              <Text className="text-gray-400 mt-2">No habits for today</Text>
              <Text className="text-gray-600 text-xs">Tap + to add one</Text>
            </View>
          ) : (
            habits.map((habit) => {
              const { icon, color } = getHabitStyle(habit.category);
              
              return (
                <HabitItem 
                  key={habit.id}
                  title={habit.title}
                  goal={habit.frequency || "Daily"}
                  icon={icon as any}   
                  color={color} 
                  completed={habit.isComplete}
                  onToggle={() => toggleHabitStatus(habit.id, habit.isComplete)}
                />
              );
            })
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#818CF8] rounded-2xl items-center justify-center shadow-lg z-50"
        onPress={() => router.push('/create-habit/step1')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    
    </View>
  );
};

export default HomeScreen;