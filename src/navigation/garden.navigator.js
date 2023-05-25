import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddGardenScreen } from '../pages/garden/addGarden.screen';


const GardenStack = createStackNavigator();

export const GardenNavigator = () => {
	return (
		<GardenStack.Navigator screenOptions={{
			headerShown: false,

		}}>
			<GardenStack.Screen name="AddGarden" component={AddGardenScreen} />
		</GardenStack.Navigator>
	);
};