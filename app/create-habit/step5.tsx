import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert, Modal, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; 

import { addHabit } from '@/services/habitService';
import { useHabitCreateStore } from '@/store/useHabitCreatestore';
import { useLoader } from '@/hooks/useLoader';

type ReminderType = 'none' | 'notification' | 'alarm';
type ReminderSchedule = 'always' | 'specific_days' | 'days_before';

interface ReminderItem {
  time: Date;
  type: ReminderType;
  schedule: ReminderSchedule;
}

const Reminders = () => {
  const router = useRouter();
  const { habitData, resetForm } = useHabitCreateStore();
  const { showLoader, hideLoader } = useLoader();

  const [startDate, setStartDate] = useState(new Date());
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);
  
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 30);
  const [endDate, setEndDate] = useState(defaultEndDate);
  
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  
  const [tempTime, setTempTime] = useState(new Date());
  const [tempType, setTempType] = useState<ReminderType>('notification');
  const [tempSchedule, setTempSchedule] = useState<ReminderSchedule>('always');
  const [showTimePicker, setShowTimePicker] = useState(false);


  const durationInDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [startDate, endDate]);

  const getDisplayDate = (date: Date) => date.toISOString().split('T')[0];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        const newEnd = new Date(selectedDate);
        newEnd.setDate(newEnd.getDate() + 30);
        setEndDate(newEnd);
      }
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const openNewReminderModal = () => {
    setTempTime(new Date());
    setTempType('notification');
    setTempSchedule('always');
    setShowReminderModal(true);
  };

  const handleAddReminder = () => {
    const newReminder: ReminderItem = {
      time: tempTime,
      type: tempType,
      schedule: tempSchedule
    };
    setReminders([...reminders, newReminder]);
    setShowReminderModal(false);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) setTempTime(selectedDate);
  };

  
  const handleSave = async () => {
    try {
      showLoader();

      const formattedReminders = reminders
        .filter(r => r.type !== 'none')
        .map(r => ({
           time: r.time.toISOString(),
           type: r.type,
           schedule: r.schedule
        }));

      const finalHabitData = {
        ...habitData,
        startDate: startDate.toISOString(),
        endDate: isEndDateEnabled ? endDate.toISOString() : null,
        priority: priority,
        reminders: formattedReminders, 
        
        category: habitData.category || 'General',
        type: habitData.type || 'yes_no',
        dailyTarget: habitData.dailyTarget || 1,
      };

      await addHabit(finalHabitData);

      Alert.alert("Success", "Habit created successfully!", [
        { 
          text: "OK", 
          onPress: () => {
            resetForm();
            if (router.canDismiss()) router.dismissAll();
            router.replace('/(drawer)/(tabs)/home'); 
          }
        }
      ]);

    } catch (error: any) {
      console.error("Error saving habit:", error);
      Alert.alert("Error", "Failed to create habit.");
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-6">
      <Text className="text-[#0891B2] text-xl font-bold text-center mt-10 mb-12">
        When do you want to do it?
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          
          {/* 1. Start Date */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={24} color="#0891B2" />
                <Text className="text-gray-300 text-base ml-4">Start date</Text>
            </View>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} className="bg-[#083344] px-4 py-2 rounded-lg">
                <Text className="text-[#0891B2] font-bold">{getDisplayDate(startDate)}</Text>
            </TouchableOpacity>
          </View>
          {showStartPicker && (
            <DateTimePicker value={startDate} mode="date" display="default" onChange={onStartDateChange} minimumDate={new Date()} />
          )}

          {/* 2. End Date */}
          <View className="mb-8">
             <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Ionicons name="calendar" size={24} color="#0891B2" />
                    <Text className="text-gray-300 text-base ml-4">End date</Text>
                </View>
                <Switch 
                    trackColor={{ false: "#3e3e3e", true: "#0891B2" }} 
                    thumbColor={isEndDateEnabled ? "#ffffff" : "#f4f3f4"} 
                    onValueChange={setIsEndDateEnabled} value={isEndDateEnabled} 
                />
             </View>
             {isEndDateEnabled && (
                <View className="flex-row justify-between items-center mt-6 ml-10">
                    <TouchableOpacity onPress={() => setShowEndPicker(true)} className="bg-[#083344] px-4 py-2 rounded-lg">
                        <Text className="text-[#0891B2] font-bold">{getDisplayDate(endDate)}</Text>
                    </TouchableOpacity>
                    <View className="flex-row items-end">
                        <Text className="text-white text-lg font-bold border-b border-gray-600 px-2 pb-1 min-w-[40px] text-center">{durationInDays}</Text>
                        <Text className="text-gray-400 text-base ml-2 mb-1">days.</Text>
                    </View>
                </View>
             )}
             {showEndPicker && (
                <DateTimePicker value={endDate} mode="date" display="default" onChange={onEndDateChange} minimumDate={startDate} />
             )}
          </View>

          {/* 3. Time and Reminders (Opens Modal) */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={24} color="#0891B2" />
                <Text className="text-gray-300 text-base ml-4">Time and reminders</Text>
            </View>
            <TouchableOpacity 
                onPress={openNewReminderModal}
                className="bg-[#083344] w-8 h-8 rounded-full items-center justify-center"
            >
                <Text className="text-[#0891B2] font-bold">{reminders.length}</Text>
            </TouchableOpacity>
          </View>

          {/* 4. Priority */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
                <Ionicons name="flag-outline" size={24} color="#0891B2" />
                <Text className="text-gray-300 text-base ml-4">Priority</Text>
            </View>
            <TouchableOpacity 
                onPress={() => setPriority(p => p === 'Medium' ? 'High' : p === 'High' ? 'Low' : 'Medium')}
                className="bg-[#083344] px-4 py-2 rounded-lg"
            >
                <Text className="text-[#0891B2] font-bold">{priority}</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      {/* --- Footer Navigation --- */}
      <View className="mt-auto flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-400 font-bold text-base">BACK</Text>
        </TouchableOpacity>
        <View className="flex-row space-x-2">
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#083344]" />
            <View className="w-2 h-2 rounded-full bg-[#0891B2]" />
        </View>
        <TouchableOpacity onPress={handleSave}>
           <Text className="text-[#0891B2] font-bold text-base">SAVE</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showReminderModal}
        onRequestClose={() => setShowReminderModal(false)}
      >
        <View className="flex-1 justify-end bg-black/80">
            <View className="bg-[#1C1C1E] rounded-t-3xl p-6 pb-10">
                <Text className="text-gray-400 text-center mb-6 text-base">New reminder</Text>
                
                <TouchableOpacity onPress={() => setShowTimePicker(true)} className="items-center mb-8">
                    <Text className="text-white text-5xl font-bold">{formatTime(tempTime)}</Text>
                    <Text className="text-[#8B5CF6] text-sm mt-1">Reminder time</Text>
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker value={tempTime} mode="time" display="spinner" onChange={onTimeChange} />
                )}

                {/* Reminder Type Selection */}
                <Text className="text-[#8B5CF6] mb-3 text-sm font-medium">Reminder type</Text>
                <View className="flex-row justify-between bg-[#121212] p-1 rounded-xl mb-6">
                    {(['none', 'notification', 'alarm'] as ReminderType[]).map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => setTempType(type)}
                            className={`flex-1 items-center py-3 rounded-lg ${tempType === type ? 'bg-[#2C2C2E]' : ''}`}
                        >
                            <Ionicons 
                                name={type === 'none' ? 'notifications-off-outline' : type === 'notification' ? 'notifications-outline' : 'alarm-outline'} 
                                size={20} 
                                color={tempType === type ? '#8B5CF6' : 'gray'} 
                            />
                            <Text className={`text-xs mt-1 ${tempType === type ? 'text-[#8B5CF6]' : 'text-gray-500'}`}>
                                {type === 'none' ? "Don't remind" : type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Reminder Schedule */}
                <Text className="text-[#8B5CF6] mb-3 text-sm font-medium">Reminder schedule</Text>
                <View className="space-y-4 mb-8">
                    {[
                        { id: 'always', label: 'Always enabled' },
                        { id: 'specific_days', label: 'Specific days of the week' },
                        { id: 'days_before', label: 'Days before' }
                    ].map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            onPress={() => setTempSchedule(item.id as ReminderSchedule)}
                            className="flex-row items-center"
                        >
                            <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${tempSchedule === item.id ? 'border-[#8B5CF6]' : 'border-gray-500'}`}>
                                {tempSchedule === item.id && <View className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />}
                            </View>
                            <Text className="text-white text-base">{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row justify-between">
                    <TouchableOpacity onPress={() => setShowReminderModal(false)} className="flex-1 mr-4 py-3 items-center">
                        <Text className="text-white font-bold">CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddReminder} className="flex-1 bg-[#2C2C2E] py-3 rounded-xl items-center">
                        <Text className="text-[#8B5CF6] font-bold">CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

    </View>
  );
}

export default Reminders;