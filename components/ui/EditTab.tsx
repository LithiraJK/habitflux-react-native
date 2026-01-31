import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Habit, deleteHabit } from '@/services/habitService';

interface EditTabProps {
    habit: Habit;
}

const EditTab = ({ habit }: EditTabProps) => {
    
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(habit.reminders && habit.reminders.length > 0);

    const getFrequencyLabel = () => {
        if (!habit.frequency) return "Every day";
        if (habit.frequency.type === 'daily') {
            return habit.frequency.interval === 1 ? "Every day" : `Every ${habit.frequency.interval} days`;
        }
        if (habit.frequency.type === 'weekly') return "Weekly";
        return "Custom";
    };

    const EditRow = ({ 
        icon, 
        label, 
        value, 
        color = "white", 
        isSwitch = false, 
        onPress 
    }: { 
        icon: keyof typeof Ionicons.glyphMap;
        label: string; 
        value?: string; 
        color?: string; 
        isSwitch?: boolean;
        onPress?: () => void;
    }) => (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={isSwitch} 
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-4 border-b border-gray-800"
        >
            <View className="flex-row items-center">
                <Ionicons name={icon} size={22} color="#8B5CF6" />
                <Text className="text-gray-300 ml-4 text-base">{label}</Text>
            </View>

            {isSwitch ? (
                <Switch 
                    trackColor={{ false: "#333", true: "#8B5CF6" }} 
                    thumbColor={isNotificationEnabled ? "#ffffff" : "#f4f3f4"}
                    onValueChange={setIsNotificationEnabled} 
                    value={isNotificationEnabled} 
                />
            ) : (
                <View className="flex-row items-center">
                    {value ? (
                         <Text className="text-base mr-2 font-bold max-w-[150px]" numberOfLines={1} style={{ color }}>
                            {value}
                        </Text>
                    ) : (
                        <Text className="text-gray-600 text-sm mr-2">Set</Text>
                    )}
                    <Ionicons name="chevron-forward" size={18} color="gray" />
                </View>
            )}
        </TouchableOpacity>
    );

    // Handler for deleting the habit
    const handleDelete = () => {
        Alert.alert(
            "Delete Habit",
            "Are you sure you want to delete this habit? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            if (habit.id) {
                                await deleteHabit(habit.id);
                                router.replace('/(dashboard)/(tabs)/home');
                            }
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete habit");
                        }
                    } 
                }
            ]
        );
    };

    return (
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
             
             <View className="mt-4">
                <EditRow 
                    icon="pencil-outline" 
                    label="Habit name" 
                    value={habit.title} 
                    color="white" 
                />
                
                <EditRow 
                    icon="shapes-outline" 
                    label="Category" 
                    value={habit.category || "General"} 
                    color="#22C55E" 
                />
                
                <EditRow 
                    icon="information-circle-outline" 
                    label="Description" 
                    value={habit.description || ""} 
                    color="gray"
                />
                
                <EditRow 
                    icon="notifications-outline" 
                    label="Time and reminders" 
                    isSwitch={true} 
                />
                
                <EditRow 
                    icon="flag-outline" 
                    label="Priority" 
                    value={habit.priority || "Normal"} 
                    color="#8B5CF6" 
                />
                
                <EditRow 
                    icon="calendar-outline" 
                    label="Frequency" 
                    value={getFrequencyLabel()} 
                    color="gray" 
                />
                
                <EditRow 
                    icon="calendar-number-outline" 
                    label="Start date" 
                    value={habit.startDate ? habit.startDate.split('T')[0] : "Today"} 
                    color="#8B5CF6" 
                />
                
                <EditRow 
                    icon="calendar-sharp" 
                    label="End date" 
                    value={habit.endDate ? habit.endDate.split('T')[0] : "-"} 
                    color="gray" 
                />
             </View>

             <View className="mt-8 mb-10 space-y-2">
                
                <TouchableOpacity className="flex-row items-center py-4 active:opacity-50">
                    <Ionicons name="archive-outline" size={22} color="#8B5CF6" />
                    <Text className="text-white ml-4 text-base">Archive</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center py-4 active:opacity-50">
                    <Ionicons name="refresh-outline" size={22} color="#8B5CF6" />
                    <Text className="text-white ml-4 text-base">Restart habit progress</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={handleDelete}
                    className="flex-row items-center py-4 active:opacity-50"
                >
                    <Ionicons name="trash-outline" size={22} color="#EF4444" />
                    <Text className="text-[#EF4444] ml-4 text-base font-medium">Delete habit</Text>
                </TouchableOpacity>

             </View>
        </ScrollView>
    );
};

export default EditTab;