import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync(t) {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert(`${t("notificationsErrorToken")}`);
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push Notification Token: ", token);  // Log token here
  } else {
    alert(`${t("notificationsErrorPushNotifications")}`);
  }
  return token;
}

export async function scheduleDailyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "This is your daily notification.",
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleWeeklyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Weekly Reminder",
      body: "This is your weekly notification.",
    },
    trigger: {
      weekday: 1,  // Monday
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleMonthlyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Monthly Reminder",
      body: "This is your monthly notification.",
    },
    trigger: {
      day: 1,  // First day of the month
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}