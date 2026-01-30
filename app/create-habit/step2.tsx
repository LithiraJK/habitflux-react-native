import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';

const ProgressEvaluation = () => {
  const router = useRouter();
  const { setStepData } = useHabitCreateStore();

  const handleSelect = (type: 'yes_no' | 'timer') => {
    
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
        className="bg-[#083344] p-6 rounded-2xl mb-6 flex-row justify-between items-center border border-[#0891B2] shadow-lg"
      >
        <View>
          <Text className="text-white font-bold text-lg mb-1">WITH A YES OR NO</Text>
          <Text className="text-gray-400 text-xs">Record whether you succeed or not</Text>
        </View>
        <Ionicons name="checkmark-circle" size={32} color="#22C55E" />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => handleSelect('timer')} 
        activeOpacity={0.8}
        className="bg-[#083344] p-6 rounded-2xl flex-row justify-between items-center border border-[#0891B2] shadow-lg"
      >
        <View>
          <Text className="text-white font-bold text-lg mb-1">WITH A TIMER</Text>
          <Text className="text-gray-400 text-xs">Establish a time value as a daily goal</Text>
        </View>
        <Ionicons name="timer" size={32} color="#22C55E" />
      </TouchableOpacity>

      <View className="mt-auto flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-400 font-bold text-base">BACK</Text>
        </TouchableOpacity>

    
        <View className="flex-row space-x-2">
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#0891B2]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
          <View className="w-2 h-2 rounded-full bg-[#083344]" />
        </View>

    
        <View style={{ width: 40 }} /> 
      </View>

    </View>
  );
}

export default ProgressEvaluation;