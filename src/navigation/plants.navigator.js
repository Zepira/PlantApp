import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlantsDetail } from '../components/plants/plantDetail';
import { PlantsScreen } from '../pages/plants/plants.screen';

const PlantsStack = createStackNavigator();

export const PlantsNavigator = () => {
	return (
		<PlantsStack.Navigator screenOptions={{
			headerShown: false,

		}}>

			<PlantsStack.Screen name="Plants" component={PlantsScreen} />
			<PlantsStack.Screen name="PlantDetail" component={PlantsDetail} />
		</PlantsStack.Navigator>
	);
};