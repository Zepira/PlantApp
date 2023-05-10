import React from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../pages/account/accountScreen';


const AccountStack = createStackNavigator();


export const AccountNavigator = () => {




	return (
		<AccountStack.Navigator screenOptions={{
			headerShown: false,
			...TransitionPresets.ModalTransition
		}}>
			<AccountStack.Screen name="Account" component={AccountScreen} />
		</AccountStack.Navigator>
	);
};