import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useLoader } from "@/hooks/useLoader";
import { addHabit } from "@/services/habitService";
import { NotificationService } from "@/services/notificationService";
import { useHabitCreateStore } from "@/store/useHabitCreatestore";
import { showToast } from "@/utils/notifications";

type ReminderType = "none" | "notification" | "alarm";
type ReminderSchedule = "always" | "specific_days" | "days_before";

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

  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);

  const [tempTime, setTempTime] = useState(new Date());
  const [tempType, setTempType] = useState<ReminderType>("notification");
  const [tempSchedule, setTempSchedule] = useState<ReminderSchedule>("always");
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

  const getDisplayDate = (date: Date) => date.toISOString().split("T")[0];

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours.toString().padStart(2, "0")}:${displayMinutes} ${ampm}`;
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
    setTempType("notification");
    setTempSchedule("always");
    setShowReminderModal(true);
  };

  const handleAddReminder = () => {
    const newReminder: ReminderItem = {
      time: tempTime,
      type: tempType,
      schedule: tempSchedule,
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

      const notificationIds: string[] = [];

      // Only schedule notifications if reminders are added
      if (reminders.length > 0) {
        try {
          const hasPermission = await NotificationService.requestPermissions();

          if (hasPermission) {
            for (const r of reminders) {
              if (r.type === "notification") {
                const timeStr = formatTime(r.time);
                console.log("Scheduling notification for:", timeStr);
                const id = await NotificationService.scheduleDailyReminder(
                  habitData.title || "HabitFlux Reminder",
                  timeStr,
                );
                notificationIds.push(id);
                console.log("Notification scheduled with ID:", id);
              }
            }
            showToast(
              "success",
              "Reminders Set",
              `${notificationIds.length} reminder(s) scheduled!`,
            );
          } else {
            console.warn("Notification permissions not granted");
            showToast(
              "info",
              "Note",
              "Enable notifications in settings to receive reminders.",
            );
          }
        } catch (notificationError: any) {
          console.error("Notification scheduling error:", notificationError);
          showToast(
            "warning",
            "Habit will be saved but reminders couldn't be scheduled.",
          );
        }
      }

      const formattedReminders = reminders
        .filter((r) => r.type !== "none")
        .map((r) => ({
          time: formatTime(r.time),
          type: r.type,
          schedule: r.schedule,
        }));

      const finalHabitData = {
        ...habitData,
        startDate: startDate.toISOString(),
        endDate: isEndDateEnabled ? endDate.toISOString() : null,
        priority: priority,
        reminders: formattedReminders,
        notificationIds: notificationIds,
        category: habitData.category || "General",
        type: habitData.type || "yes_no",
        dailyTarget: habitData.dailyTarget || 1,
      };

      console.log("Saving habit data:", finalHabitData);
      await addHabit(finalHabitData);

      showToast("success", "Success", "Habit created successfully!");
      resetForm();
      if (router.canDismiss()) router.dismissAll();
      router.replace("/(drawer)/(tabs)/home");
    } catch (error: any) {
      console.error("Error saving habit:", error);
      console.error("Error details:", error.message);
      showToast("error", "Error", error.message || "Failed to create habit.");
    } finally {
      hideLoader();
    }
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e1b4b", "#0f172a"]}
      className="flex-1"
    >
      <View className="flex-1 p-6">
        <Text
          className={`font-bold text-center mt-10 mb-12`}
          style={{ color: Colors.dark.primary }}
        >
          When do you want to do it?
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Start Date Selection */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Colors.dark.primary}
              />
              <Text
                className="text-base ml-4"
                style={{ color: Colors.dark.primary }}
              >
                Start date
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: Colors.dark.disabled }}
            >
              <Text
                className="font-bold"
                style={{ color: Colors.dark.primary }}
              >
                {getDisplayDate(startDate)}
              </Text>
            </TouchableOpacity>
          </View>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
              minimumDate={new Date()}
            />
          )}

          {/* End Date Selection */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons
                  name="calendar"
                  size={24}
                  color={Colors.dark.primary}
                />
                <Text
                  className="text-base ml-4"
                  style={{ color: Colors.dark.textSecondary }}
                >
                  End date
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: Colors.dark.border,
                  true: Colors.dark.primary,
                }}
                thumbColor={
                  isEndDateEnabled
                    ? Colors.dark.text
                    : Colors.dark.textSecondary
                }
                onValueChange={setIsEndDateEnabled}
                value={isEndDateEnabled}
              />
            </View>
            {isEndDateEnabled && (
              <View className="flex-row justify-between items-center mt-6 ml-10">
                <TouchableOpacity
                  onPress={() => setShowEndPicker(true)}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: Colors.dark.disabled }}
                >
                  <Text
                    className="font-bold"
                    style={{ color: Colors.dark.primary }}
                  >
                    {getDisplayDate(endDate)}
                  </Text>
                </TouchableOpacity>
                <View className="flex-row items-end">
                  <Text
                    className="text-lg font-bold border-b px-2 pb-1 min-w-[40px] text-center"
                    style={{
                      color: Colors.dark.text,
                      borderBottomColor: Colors.dark.border,
                    }}
                  >
                    {durationInDays}
                  </Text>
                  <Text
                    className="text-base ml-2 mb-1"
                    style={{ color: Colors.dark.textSecondary }}
                  >
                    days.
                  </Text>
                </View>
              </View>
            )}
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
                minimumDate={startDate}
              />
            )}
          </View>

          {/* Reminders Modal Trigger */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.dark.primary}
              />
              <Text
                className="text-base ml-4"
                style={{ color: Colors.dark.textSecondary }}
              >
                Time and reminders
              </Text>
            </View>
            <TouchableOpacity
              onPress={openNewReminderModal}
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: Colors.dark.disabled }}
            >
              <Text
                className="font-bold"
                style={{ color: Colors.dark.primary }}
              >
                {reminders.length}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Priority Selection */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <Ionicons
                name="flag-outline"
                size={24}
                color={Colors.dark.primary}
              />
              <Text
                className="text-base ml-4"
                style={{ color: Colors.dark.textSecondary }}
              >
                Priority
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setPriority((p) =>
                  p === "Medium" ? "High" : p === "High" ? "Low" : "Medium",
                )
              }
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: Colors.dark.disabled }}
            >
              <Text
                className="font-bold"
                style={{ color: Colors.dark.primary }}
              >
                {priority}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <View className="mt-auto flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text
              className="font-bold text-base"
              style={{ color: Colors.dark.textSecondary }}
            >
              BACK
            </Text>
          </TouchableOpacity>
          <View className="flex-row space-x-2">
            {[1, 2, 3, 4, 5].map((dot) => (
              <View
                key={dot}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    dot === 5 ? Colors.dark.primary : Colors.dark.disabled,
                }}
              />
            ))}
          </View>
          <TouchableOpacity onPress={handleSave}>
            <Text
              className="font-bold text-base"
              style={{ color: Colors.dark.primary }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showReminderModal}
          onRequestClose={() => setShowReminderModal(false)}
        >
          <View className="flex-1 justify-end bg-black/80">
            <View
              className="rounded-t-3xl p-6 pb-10"
              style={{ backgroundColor: Colors.dark.cardBackground }}
            >
              <Text
                className="text-center mb-6 text-base"
                style={{ color: Colors.dark.textSecondary }}
              >
                New reminder
              </Text>

              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                className="items-center mb-8"
              >
                <Text
                  className="text-5xl font-bold"
                  style={{ color: Colors.dark.text }}
                >
                  {formatTime(tempTime)}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: Colors.dark.textSecondary }}
                >
                  Reminder time
                </Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={tempTime}
                  mode="time"
                  display="spinner"
                  onChange={onTimeChange}
                />
              )}

              <Text
                className="mb-3 text-sm font-medium"
                style={{ color: Colors.dark.textSecondary }}
              >
                Reminder type
              </Text>
              <View
                className="flex-row justify-between p-1 rounded-xl mb-6"
                style={{ backgroundColor: Colors.dark.background }}
              >
                {(["none", "notification", "alarm"] as ReminderType[]).map(
                  (type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setTempType(type)}
                      className="flex-1 items-center py-3 rounded-lg"
                      style={{
                        backgroundColor:
                          tempType === type
                            ? Colors.dark.border
                            : "transparent",
                      }}
                    >
                      <Ionicons
                        name={
                          type === "none"
                            ? "notifications-off-outline"
                            : type === "notification"
                              ? "notifications-outline"
                              : "alarm-outline"
                        }
                        size={20}
                        color={
                          tempType === type
                            ? Colors.dark.primary
                            : Colors.dark.textSecondary
                        }
                      />
                      <Text
                        className="text-xs mt-1"
                        style={{
                          color:
                            tempType === type
                              ? Colors.dark.primary
                              : Colors.dark.textSecondary,
                        }}
                      >
                        {type === "none"
                          ? "Don't remind"
                          : type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>

              <Text
                className="mb-3 text-sm font-medium"
                style={{ color: Colors.dark.textSecondary }}
              >
                Reminder schedule
              </Text>
              <View className="space-y-4 mb-8">
                {[
                  { id: "always", label: "Always enabled" },
                  { id: "specific_days", label: "Specific days of the week" },
                  { id: "days_before", label: "Days before" },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setTempSchedule(item.id as ReminderSchedule)}
                    className="flex-row items-center mb-3"
                  >
                    <View
                      className="w-5 h-5 rounded-full border-2 mr-3 items-center justify-center"
                      style={{
                        borderColor:
                          tempSchedule === item.id
                            ? Colors.dark.primary
                            : Colors.dark.textSecondary,
                      }}
                    >
                      {tempSchedule === item.id && (
                        <View
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: Colors.dark.primary }}
                        />
                      )}
                    </View>
                    <Text
                      className="text-base"
                      style={{ color: Colors.dark.text }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setShowReminderModal(false)}
                  className="flex-1 mr-4 py-3 items-center"
                >
                  <Text
                    className="font-bold"
                    style={{ color: Colors.dark.text }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddReminder}
                  className="flex-1 py-3 rounded-xl items-center"
                  style={{ backgroundColor: Colors.dark.border }}
                >
                  <Text
                    className="font-bold"
                    style={{ color: Colors.dark.primary }}
                  >
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default Reminders;
