import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function scheduleDailyNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Optional: clear previous schedules
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "Daily water consumption meters...",
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleWeeklyNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Weekly Reminder",
      body: "Weekly water consumption meters...",
    },
    trigger: {
      weekday: 1,  // monday
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleMonthlyNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Monthly Reminder",
      body: "Monthly water consumption meters...",
    },
    trigger: {
      day: 1,  // first day of the month
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}
