import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/home/home';
import { Text, View } from 'react-native';
import { SafeAreaWrapper } from '../components/safeAreaWrapper/safeAreaWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colours } from '../theme/colours';
import { HomeNavigator } from "./home.navigator";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CameraScreen } from "../pages/camera/camera.screen";

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
        tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
        tabBarActiveTintColor: colours.menuDarkGreen,
        tabBarInactiveTintColor: colours.fadedGreen,
        tabBarShowLabel: false,
        headerShown: false, //set on individual pages if required
        tabBarStyle: { backgroundColor: colours.menuLightGreen }
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
    const { user, onLogin, isAuthenticated } = useContext(AuthenticationContext);


    useEffect(() => {
        onLogin();
        console.log(user);
    }, []);


    return (

        <Tab.Navigator
            screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Plant" component={Settings} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>

    );
}