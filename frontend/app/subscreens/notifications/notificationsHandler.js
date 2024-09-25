import * as Notifications from 'expo-notifications';
/*import * as Permissions from 'expo-permissions';*/
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

export async function sendEmailNotification(token, email) {
  //! Waiting for API on the backend
  // try {
  //   const response = await fetch("https://your-backend-url/send-email", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       subject: "Email Notifications Activated",
  //       message: "You have activated email notifications for your account.",
  //     }),
  //   });
  //   return response;
  // } catch (error) {
  //   console.error("Error sending email notification: ", error);
  //   return { ok: false };
  // }
  console.log("Sending email notification to: ", email, "Token: ", token);
  
}

//TODO: Implement logic for showing different messages every day.
export async function scheduleDailyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${t("notificationsMessageDailyTitle")}`,
      body: `${t("notificationsMessageDailyText")}`,
    },
    trigger: {
      hour: 10,
      minute: 0,
      repeats: true,
    },
  });
}

//TODO: Implement logic for showing different messages in order with previous week water consumption.
export async function scheduleWeeklyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${t("notificationsMessageWeeklyTitleLowerConsumption")}`,
      body: `${t("notificationsMessageWeeklyTextLowerConsumption")}`,
    },
    trigger: {
      weekday: 1,  // Monday
      hour: 10,
      minute: 0,
      repeats: true,
    },
  });
}

//TODO: Implement logic for showing different messages in order with previous month water consumption.
export async function scheduleMonthlyNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${t("notificationsMessageMonthlyTitleLowerConsumption")}`,
      body: `${t("notificationsMessageMonthlyTextLowerConsumption")}`,
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