
import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { GetUserNotification } from './notification.service';
import { EXPO_PROJECT_ID } from '../../../utils/constants';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const [pendingNotifications, setPendingNotifications] = useState([]);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});



		Notifications.removeNotificationSubscription(notificationListener.current);
		Notifications.removeNotificationSubscription(responseListener.current);

		Notifications.cancelAllScheduledNotificationsAsync();
		Notifications.getAllScheduledNotificationsAsync().then((notifications) => {
			setPendingNotifications(notifications);
		});




	}, []);

	useEffect(() => {
		const { notificationContent, notificationSchedule, notificationsToCancel } = GetUserNotification(pendingNotifications);
		schedulePushNotification(notificationContent, notificationSchedule);

		if (notificationsToCancel.length) {
			notificationsToCancel.forEach((notificationToCancel) => {
				Notifications.cancelScheduledNotificationAsync(notificationToCancel.identifier);
			});
		}
	}, [pendingNotifications]);


	return (
		<NotificationContext.Provider value={{ schedulePushNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};

async function schedulePushNotification(content, schedule) {
	let useSchedule = schedule;
	if (!schedule) {

		useSchedule = { seconds: 2, repeats: false };


	}
	await Notifications.scheduleNotificationAsync({
		content: content,
		trigger: useSchedule,
	});
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync({
			projectId: EXPO_PROJECT_ID,
		})).data;
		console.log(token);
	} else {
		//alert('Must use physical device for Push Notifications');
	}

	return token;
}


