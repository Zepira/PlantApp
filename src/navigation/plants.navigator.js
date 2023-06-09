import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PlantsDetail } from '../pages/plants/plantDetail';
import { PlantsScreen } from '../screens/plants/plants.screen';
import { VarietiesScreen } from '../pages/plants/varieties';

const PlantsStack = createStackNavigator();

export const PlantsNavigator = () => {
	return (
		<PlantsStack.Navigator screenOptions={{
			headerShown: false,

		}}>

			<PlantsStack.Screen name="Plants" component={PlantsScreen} />
			<PlantsStack.Screen name="PlantDetail" component={PlantsDetail} />
			<PlantsStack.Screen name="Varieties" component={VarietiesScreen} />
		</PlantsStack.Navigator>
	);
};