import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';

const FREQUENCIES = [
  'Every day',
  'Specific days of the week',
  'Specific days of the month',
  'Specific days of the year',
  'Some days per period',
  'Repeat'
];

const Frequency = () => {
  const router = useRouter();
  const { habitData, setStepData } = useHabitCreateStore();
  
  const [selected, setSelected] = useState(habitData.frequency || 'Every day');

  const handleNext = () => {
    setStepData({ frequency: selected });
    
    router.push('/create-habit/step5');
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
        
        {/* Header Title */}
        <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-10">
          How often do you want to do it?
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {FREQUENCIES.map((freq) => (
            <TouchableOpacity
              key={freq}
              onPress={() => setSelected(freq)}
              className="flex-row items-center mb-8"
              activeOpacity={0.7}
            >
              <View 
                className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 
                  ${selected === freq ? 'border-[#0891B2]' : 'border-gray-500'}`}
              >
                {selected === freq && (
                  <View className="w-3 h-3 rounded-full bg-[#0891B2]" />
                )}
              </View>
              
              <Text className={`text-base font-medium ${selected === freq ? 'text-white' : 'text-gray-400'}`}>
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-gray-400 font-bold text-base">BACK</Text>
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#0891B2]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
          </View>

          <TouchableOpacity onPress={handleNext}>
            <Text className="text-[#0891B2] font-bold text-base">NEXT</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default Frequency;