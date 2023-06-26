import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home } from '../screens/home/home';

import { TasksDetail } from '../pages/tasks/taskDetail';
import { PlantsNavigator } from './plants.navigator';
import { GardenNavigator } from './garden.navigator';
import { GardenDetail } from '../pages/gardens/gardenDetail';
import { UserPlantDetail } from '../pages/plants/userPlantDetail';
import { EditGarden } from '../pages/gardens/editGarden';
import { EditUserPlant } from '../pages/plants/editUserPlant';

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
			<HomeStack.Screen name="UserPlantDetail" component={UserPlantDetail} />
			<HomeStack.Screen name="EditUserPlant" component={EditUserPlant} />
			<HomeStack.Screen name="PlantDetail" component={UserPlantDetail} />

			<HomeStack.Screen name="Garden" component={GardenNavigator} />
			<HomeStack.Screen name="GardenDetail" component={GardenDetail} />
			<HomeStack.Screen name="EditGarden" component={EditGarden} />
		</HomeStack.Navigator>
	);
};