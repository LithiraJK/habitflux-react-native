import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NotificationService = {
  // request Permission (real device only)
  async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) return false;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === "granted";
  },

  parseTime(timeStr: string): Date {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  },

  // Schedule a daily notification
  async scheduleDailyReminder(title: string, timeStr: string): Promise<string> {
    try {
      console.log("Scheduling reminder - Title:", title, "Time:", timeStr);

      const scheduledDate = this.parseTime(timeStr);
      console.log(
        "Parsed time - Hour:",
        scheduledDate.getHours(),
        "Minute:",
        scheduledDate.getMinutes(),
      );

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "HabitFlux Reminder! 🎯",
          body: `It's time to work on: ${title}`,
          sound: true,
        },
        trigger: {
          type: SchedulableTriggerInputTypes.CALENDAR,
          hour: scheduledDate.getHours(),
          minute: scheduledDate.getMinutes(),
          repeats: true,
        },
      });

      console.log(
        "Notification scheduled successfully with ID:",
        notificationId,
      );
      return notificationId;
    } catch (error) {
      console.error("Error in scheduleDailyReminder:", error);
      throw new Error(`Failed to schedule notification: ${error}`);
    }
  },

  // Cancel a notification
  async cancel(id: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(id);
  },
};
