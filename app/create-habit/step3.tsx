import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';

const DefineHabit = () => {
  const router = useRouter();
  const { habitData, setStepData } = useHabitCreateStore();

  const [title, setTitle] = useState(habitData.title || '');
  const [description, setDescription] = useState(habitData.description || '');

  const handleNext = () => {
    if (!title.trim()) return;

    setStepData({ title, description });

    router.push('/create-habit/step4');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#121212]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        
        <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-12">
          Define your habit
        </Text>

        <View className="mb-8">
          <Text className="text-[#0891B2] text-xs font-bold mb-2 ml-1 relative -top-3 left-4 bg-[#121212] self-start px-1">
            Habit
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Meditate in the morning."
            placeholderTextColor="#6B7280"
            className="bg-transparent border border-[#0891B2] text-white text-lg p-4 rounded-2xl"
            autoFocus
          />
        </View>

    
        <View className="mb-8">
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description (optional)"
            placeholderTextColor="#6B7280"
            className="bg-[#1C1C1E] text-white text-base p-4 rounded-2xl border border-gray-800 h-32"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-gray-400 font-bold text-base">BACK</Text>
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#0891B2]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
          </View>

          <TouchableOpacity 
            onPress={handleNext}
            disabled={!title.trim()}
          >
            <Text className={`font-bold text-base ${title.trim() ? 'text-[#0891B2]' : 'text-gray-600'}`}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default DefineHabit;