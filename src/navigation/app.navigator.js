import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/home/home';
import { Text, View } from 'react-native';
import { SafeAreaWrapper } from '../components/safeAreaWrapper/safeAreaWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/colours';
import { HomeNavigator } from "./home.navigator";

const TAB_ICON = {
    Home: 'home',
    Settings: 'md-settings',
    Search: 'search',
    Plant: 'leaf'
};

const Tab = createBottomTabNavigator();

//See https://reactnavigation.org/docs/tab-based-navigation for changing icon on focus
const screenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name]
    return {
        tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
        tabBarActiveTintColor: colors.menuDarkGreen,
        tabBarInactiveTintColor: colors.fadedGreen,
        tabBarShowLabel: false,
        headerShown: false, //set on individual pages if required
        tabBarStyle: { backgroundColor: colors.menuLightGreen }
    }
}

const Settings = () => {
    return (
        <SafeAreaWrapper>
            <View style={{ backgroundColor: 'red' }}>
                <Text>Settings</Text>
            </View>
        </SafeAreaWrapper>
    )
}

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={screenOptions}>
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="Plant" component={Settings} />
                <Tab.Screen name="Search" component={Settings} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}