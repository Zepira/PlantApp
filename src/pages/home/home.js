import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, RadioButton } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { WeatherContext, WeatherContextProvider } from '../../services/weather/weather.context';
import { fetchWeather, WeatherService } from '../../services/weather/weather.service';
import { colors } from '../../theme/colours';
import { TasksList } from '../../components/tasks/tasks';


export const Home = ({ navigation }) => {

    return (
        <WeatherContextProvider>
            <ScrollView style={{ flex: 1, backgroundColor: colors.plantaBackgroundGrey }}>
                <HeaderBar />

                <TasksList navigation={navigation} />

            </ScrollView>
        </WeatherContextProvider>
    );
}

const HeaderBar = () => {
    const { weather, isLoading, error } = useContext(WeatherContext);

    return (
        <View style={{ height: 150, flex: 1 }}>
            <ImageBackground source={require('../../../assets/background.jpg')} style={{ flex: 1 }} >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 5, width: '100%' }}>
                    {isLoading ? <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -40, marginLeft: -10 }} animating={true} color='red' />
                        : <>

                            <View style={{ padding: 15 }}>
                                <Text style={{ color: 'white' }}>{weather.name}</Text>
                                <Text style={{ color: 'white' }}>13 April 2023</Text>
                                <Text style={{ color: 'white' }}>{Math.round(weather.main.temp)}&deg;</Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <Text style={{ color: 'white' }}>{weather.weather[0].main}</Text>
                                <Text style={{ color: 'white' }} >H: {Math.round(weather.main.temp_max)}&deg; L: {Math.round(weather.main.temp_min)}&deg;</Text>
                            </View></>}

                </View>
            </ImageBackground>
        </View>)
};






