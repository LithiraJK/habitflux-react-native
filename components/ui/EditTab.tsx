import { Habit, deleteHabit, updateHabit } from "@/services/habitService";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface EditTabProps {
  habit: Habit;
}

const EditTab = ({ habit }: EditTabProps) => {
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description || "");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">(
    habit.priority || "Medium",
  );
  const { categories, defaultCategories } = useCategoryStore();

  // Date States
  const [startDate, setStartDate] = useState(new Date(habit.startDate));
  const [endDate, setEndDate] = useState(
    habit.endDate ? new Date(habit.endDate) : null,
  );

  // Date Picker Visibility
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Toggle States
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    habit.reminders && habit.reminders.length > 0,
  );
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(!!habit.endDate);


  const handleSave = async () => {
    try {
      if (!habit.id) return;

      const updates = {
        title,
        description,
        priority,
        startDate: startDate.toISOString(),
        endDate: isEndDateEnabled && endDate ? endDate.toISOString() : null,
      };

      await updateHabit(habit.id, updates);

      Alert.alert("Success", "Habit updated successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update habit");
    }
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "General";

    // Custom categories ha Default categories dekenma hoyanna
    const allCategories = [...categories, ...defaultCategories];
    const foundCategory = allCategories.find((c) => c.id === categoryId);

    return foundCategory ? foundCategory.title : "General";
  };

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
                router.replace("/(drawer)/(tabs)/habits");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete habit");
            }
          },
        },
      ],
    );
  };

  const togglePriority = () => {
    const priorities: ("High" | "Medium" | "Low")[] = ["Low", "Medium", "High"];
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    setPriority(priorities[nextIndex]);
  };


  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };


  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="mt-4 pb-20">
        <View className="flex-row items-center py-4 border-b border-gray-800">
          <Ionicons name="pencil-outline" size={22} color="#8B5CF6" />
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Habit Name"
            placeholderTextColor="#666"
            className="flex-1 ml-4 text-white text-base font-bold"
          />
        </View>

        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-800">
          <View className="flex-row items-center">
            <Ionicons name="shapes-outline" size={22} color="#8B5CF6" />
            <Text className="text-gray-300 ml-4 text-base">Category</Text>
          </View>
          <Text className="text-[#22C55E] text-base font-bold">
            {getCategoryName(habit.category)}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center py-4 border-b border-gray-800">
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#8B5CF6"
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="#666"
            className="flex-1 ml-4 text-gray-300 text-base"
            multiline
          />
        </View>

        <TouchableOpacity
          onPress={togglePriority}
          className="flex-row items-center justify-between py-4 border-b border-gray-800"
        >
          <View className="flex-row items-center">
            <Ionicons name="flag-outline" size={22} color="#8B5CF6" />
            <Text className="text-gray-300 ml-4 text-base">Priority</Text>
          </View>
          <Text
            className={`text-base font-bold ${priority === "High" ? "text-red-500" : priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}
          >
            {priority}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          className="flex-row items-center justify-between py-4 border-b border-gray-800"
        >
          <View className="flex-row items-center">
            <Ionicons
              name="calendar-number-outline"
              size={22}
              color="#8B5CF6"
            />
            <Text className="text-gray-300 ml-4 text-base">Start date</Text>
          </View>
          <Text className="text-white text-base font-bold">
            {formatDate(startDate)}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}

        <View className="py-4 border-b border-gray-800">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="calendar-sharp" size={22} color="#8B5CF6" />
              <Text className="text-gray-300 ml-4 text-base">End date</Text>
            </View>
            <Switch
              trackColor={{ false: "#333", true: "#8B5CF6" }}
              thumbColor={isEndDateEnabled ? "#ffffff" : "#f4f3f4"}
              onValueChange={(val) => {
                setIsEndDateEnabled(val);
                if (val && !endDate) {
                  const d = new Date(startDate);
                  d.setDate(d.getDate() + 30);
                  setEndDate(d);
                }
              }}
              value={isEndDateEnabled}
            />
          </View>

          {isEndDateEnabled && endDate && (
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              className="flex-row justify-end mt-2"
            >
              <Text className="text-gray-400 text-sm mr-2">Ends on:</Text>
              <Text className="text-[#8B5CF6] text-base font-bold">
                {formatDate(endDate)}
              </Text>
            </TouchableOpacity>
          )}

          {showEndPicker && isEndDateEnabled && endDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onEndDateChange}
              minimumDate={startDate}
            />
          )}
        </View>

        <View className="mt-8 space-y-4">
          <TouchableOpacity
            onPress={handleSave}
            className="flex-row items-center justify-center py-4 bg-[#8B5CF6] rounded-xl active:opacity-80"
          >
            <Ionicons name="save-outline" size={22} color="white" />
            <Text className="text-white ml-2 text-base font-bold">
              Save Changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 active:opacity-50">
            <Ionicons name="refresh-outline" size={22} color="#8B5CF6" />
            <Text className="text-white ml-4 text-base">
              Restart habit progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="flex-row items-center py-4 active:opacity-50"
          >
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
            <Text className="text-[#EF4444] ml-4 text-base font-medium">
              Delete habit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditTab;
