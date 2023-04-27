import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Home } from "../pages/home/home";
import { Text, View } from 'react-native';
import { TasksDetail } from "../components/tasks/taskDetail";
import { PlantsScreen } from "../pages/plants/plants.screen";
import { PlantsDetail } from "../components/plants/plantDetail";

const PlantStack = createStackNavigator();

export const PlantNavigator = () => {
    return (
        <PlantStack.Navigator screenOptions={{
            headerShown: false,

        }}>
            <PlantStack.Screen name="Plants" component={PlantsScreen} />
            <PlantStack.Screen name="PlantDetail" component={PlantsDetail} />
        </PlantStack.Navigator>
    );
}