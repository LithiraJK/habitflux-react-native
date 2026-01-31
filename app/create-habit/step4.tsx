import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';


const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const FREQUENCIES = [
  'Every day',
  'Specific days of the week',
];

const Frequency = () => {
  const router = useRouter();
  const { habitData, setStepData } = useHabitCreateStore();

  const [selectedOption, setSelectedOption] = useState<string>(
    habitData.frequency?.type === 'weekly' ? 'Specific days of the week' : 'Every day'
  );

  const [selectedDays, setSelectedDays] = useState<number[]>(
    habitData.frequency?.daysOfWeek || []
  );

  const toggleDay = (index: number) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter(d => d !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const handleNext = () => {
    let frequencyObject: any = { type: 'daily', interval: 1 };

    if (selectedOption === 'Every day') {
        frequencyObject = { type: 'daily', interval: 1 };
    } 
    else if (selectedOption === 'Specific days of the week') {
        if (selectedDays.length === 0) {
            Alert.alert("Select Days", "Please select at least one day of the week.");
            return;
        }
        frequencyObject = { type: 'weekly', daysOfWeek: selectedDays };
    }

    setStepData({ frequency: frequencyObject });
    
    router.push('/create-habit/step5');
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
        
        <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-10">
          How often do you want to do it?
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {FREQUENCIES.map((freq) => (
            <View key={freq} className="mb-6">
                
                <TouchableOpacity
                    onPress={() => setSelectedOption(freq)}
                    className="flex-row items-center mb-2"
                    activeOpacity={0.7}
                >
                    <View 
                        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 
                        ${selectedOption === freq ? 'border-[#0891B2]' : 'border-gray-500'}`}
                    >
                        {selectedOption === freq && (
                        <View className="w-3 h-3 rounded-full bg-[#0891B2]" />
                        )}
                    </View>
                    
                    <Text className={`text-base font-medium ${selectedOption === freq ? 'text-white' : 'text-gray-400'}`}>
                        {freq}
                    </Text>
                </TouchableOpacity>

                {/* Day Selector */}
                {freq === 'Specific days of the week' && selectedOption === freq && (
                    <View className="flex-row justify-between ml-10 mt-2">
                        {DAYS_OF_WEEK.map((day, index) => {
                            const isSelected = selectedDays.includes(index);
                            return (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => toggleDay(index)}
                                    className={`w-9 h-9 rounded-full items-center justify-center border 
                                    ${isSelected ? 'bg-[#0891B2] border-[#0891B2]' : 'border-gray-600 bg-transparent'}`}
                                >
                                    <Text className={`font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

            </View>
          ))}
        </ScrollView>

        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-gray-400 font-bold text-base">BACK</Text>
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View className="flex-row space-x-2">
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#0891B2]" />
            <View className="w-2 m-1 h-2 rounded-full bg-[#083344]" />
          </View>

          <TouchableOpacity onPress={handleNext}>
            <Text className="text-[#0891B2] font-bold text-base">NEXT</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default Frequency;