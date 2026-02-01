import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';

import { HabitCard } from '@/components/ui/HabitCard';
import { useHabitStore } from '@/store/useHabitStore';

const Habits = () => {
  const router = useRouter();

  const { habits, fetchHabits, isLoading } = useHabitStore();

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-1 px-4">

        {/* Habits List */}
        {isLoading && habits.length === 0 ? (
       
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#8B5CF6" />
          </View>
        ) : habits.length === 0 ? (
        
          <View className="flex-1 justify-center items-center opacity-50">
            <Ionicons name="clipboard-outline" size={64} color="gray" />
            <Text className="text-gray-400 mt-4 text-lg">No habits found</Text>
            <Text className="text-gray-600">Create your first habit to get started</Text>
          </View>
        ) : (
        
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => <HabitCard habit={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

      </View>

      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-16 h-16 bg-[#8B5CF6] rounded-2xl items-center justify-center shadow-lg z-50"
        onPress={() => router.push('/create-habit/step1' as any)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default Habits;