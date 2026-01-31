import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';

const ProgressEvaluation = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();

  const handleSelect = (type: 'yes_no' | 'timer' | 'count') => {
    setStepData({ type });
    router.push('/create-habit/step3'); 
  };

  return (
    <View className="flex-1 bg-[#121212] p-6 justify-center">
      
      <Text className="text-[#0891B2] text-xl font-bold text-center mb-10">
        How do you want to evaluate your progress?
      </Text>
      
      <TouchableOpacity 
        onPress={() => handleSelect('yes_no')} 
        activeOpacity={0.8}
        className="bg-[#0891B2] p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
      >
        <View className="items-center mr-4">
          <Text className="text-white font-bold text-lg mb-1">WITH A YES OR NO</Text>
          <Text className="text-white text-xs">Simple check: Did I do it? (e.g., Wake up early)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => handleSelect('count')} 
        activeOpacity={0.8}
        className="bg-[#0891B2] p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
      >
        <View className="items-center mr-4">
          <Text className="text-white font-bold text-lg mb-1">WITH A NUMERIC VALUE</Text>
          <Text className="text-white text-xs">Track units (e.g., 2000ml water, 10 pages)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => handleSelect('timer')} 
        activeOpacity={0.8}
        className="bg-[#0891B2] p-4 rounded-2xl mb-4 flex-row justify-center items-center shadow-lg"
      >
        <View className="items-center mr-4">
          <Text className="text-white font-bold text-lg mb-1">WITH A TIMER</Text>
          <Text className="text-white text-xs">Track duration (e.g., Meditate for 30 mins)</Text>
        </View>
      </TouchableOpacity>

      <View className="mt-auto flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-400 font-bold text-base">BACK</Text>
        </TouchableOpacity>

        <View className="flex-row space-x-2">
          <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 m-1 h-2 rounded-full bg-[#0891B2]" />
          <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
        </View>

        <View style={{ width: 40 }} /> 
      </View>

    </View>
  );
}

export default ProgressEvaluation;