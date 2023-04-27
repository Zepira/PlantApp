import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SafeAreaWrapper } from '../components/safeAreaWrapper/safeAreaWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colours } from '../theme/colours';
import { HomeNavigator } from "./home.navigator";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CameraScreen } from "../pages/camera/camera.screen";
import { PlantNavigator } from "./plant.navigator";

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
    const iconName = TAB_ICON[route.name]
    return {
        tabBarIcon: ({ size, color, focused }) => <View style={{ backgroundColor: focused ? colours.transparentWhite40 : colours.transparent, padding: 9, borderRadius: 100 }}><Ionicons name={iconName} size={size} color={color} /></View>,
        tabBarActiveTintColor: colours.plantKeeperDarkestGreen,
        tabBarInactiveTintColor: colours.plantKeeperLightGreen,
        tabBarItemStyle: {
            borderRadius: 100,
        },


        tabBarShowLabel: false,
        headerShown: false, //set on individual pages if required
        tabBarStyle: { backgroundColor: colours.plantkeeperDarkGreen, height: 90 }
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

        <Tab.Navigator
            screenOptions={screenOptions} >
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Plant" component={PlantNavigator} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>

    );
}