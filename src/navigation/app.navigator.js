import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { HomeNavigator } from './home.navigator';
import { CameraScreen } from '../pages/camera/camera.screen';
import { GardenNavigator, PlantsNavigator } from './plants.navigator';
import { SettingPage } from '../pages/settings/settings.screen';
import { Text } from '../theme';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const TAB_ICON = {
	Home: 'home',
	Settings: 'md-settings',
	Search: 'search',
	Plant: 'leaf',
	Camera: 'camera'
};

const Tab = createBottomTabNavigator();

//See https://reactnavigation.org/docs/tab-based-navigation for changing icon on focus
const screenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color, focused }) => <View style={{ backgroundColor: focused ? colors.transparentWhite40 : colors.transparent, padding: 9, borderRadius: 100 }}><Ionicons name={iconName} size={size} color={color} /></View>,
		tabBarActiveTintColor: colors.plantKeeperDarkestGreen,
		tabBarInactiveTintColor: colors.plantKeeperLightGreen,
		tabBarItemStyle: {
			borderRadius: 100,
		},


		tabBarShowLabel: false,
		headerShown: false, //set on individual pages if required
		tabBarStyle: { backgroundColor: colors.plantkeeperDarkGreen, height: 90 }
	};
};



export const AppNavigator = () => {


	return (
		<View style={{ flex: 1 }}>
			<Tab.Navigator
				screenOptions={screenOptions} >
				<Tab.Screen name="Home" component={HomeNavigator} />
				<Tab.Screen name="Plant" component={PlantsNavigator} />
				<Tab.Screen name="Camera" component={CameraScreen} />
				<Tab.Screen name="Settings" component={SettingPage} />

			</Tab.Navigator>

		</View>

	);
};