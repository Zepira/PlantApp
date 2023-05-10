import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { QuestionScreen } from '../pages/questions/questions';

const QuestionaireStack = createStackNavigator();

export const QuestionaireNavigator = () => {
	return (
		<QuestionaireStack.Navigator screenOptions={{
			headerShown: false,

		}}>
			<QuestionaireStack.Screen name="Welcome to Plantkeeper" component={QuestionScreen} />
		</QuestionaireStack.Navigator>
	);
};