
import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

export const GetUserNotification = (pendingNotifications) => {
    const notificationsToCancel = [];

    //dont forget to cancel scheduled notifications

    if (pendingNotifications.length) {
        pendingNotifications.forEach((notification) => {

            if (notification.content.categoryIdentifier === 'Morning Notification') {
                notificationsToCancel.push(notification);
            }
        });
    }

    const notificationContent = {
        title: 'This is scheduled for 1.40pm every day',
        body: 'Here is the notification body',
        categoryIdentifier: 'Morning Notification',
        data: { data: 'goes here' },
    };

    const notificationSchedule = { hour: 13, minute: 40, repeats: true };



    return { notificationContent, notificationSchedule, notificationsToCancel };
};


