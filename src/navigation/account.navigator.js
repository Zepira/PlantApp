import React, { useContext, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/home/home';
import { Text, View } from 'react-native';
import { SafeAreaWrapper } from '../components/safeAreaWrapper/safeAreaWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colours } from '../theme/colours';
import { HomeNavigator } from "./home.navigator";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../pages/account/accountScreen";


const AccountStack = createStackNavigator();


export const AccountNavigator = () => {
    const { user, onLogin, isAuthenticated } = useContext(AuthenticationContext);




    return (
        <AccountStack.Navigator screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalTransition
        }}>
            <AccountStack.Screen name="Account" component={AccountScreen} />
        </AccountStack.Navigator>
    );
}