import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home } from '../pages/home/home';

import { TasksDetail } from '../components/tasks/taskDetail';
import { PlantsNavigator } from './plants.navigator';

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
	return (
		<HomeStack.Navigator screenOptions={{
			headerShown: false,
			...TransitionPresets.ModalSlideFromBottomIOS
		}}>
			<HomeStack.Screen name="HomeScreen" component={Home} />
			<HomeStack.Screen name="TaskDetail" component={TasksDetail} />
			<HomeStack.Screen name="Plant" component={PlantsNavigator} />
		</HomeStack.Navigator>
	);
};