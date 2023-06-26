import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, IconButton } from 'react-native-paper';
import { WeatherContext, WeatherContextProvider } from '../../services/weather/weather.context';
import { colors } from '../../theme/colors';
import { TasksList } from '../../pages/tasks/tasks';
import { Spacer, Text } from '../../theme';
import { GardenList } from '../../pages/gardens/gardens';
import Background from '../../../assets/background.jpg';


export const Home = ({ route, navigation }) => {

	const [homeToggle, setHomeToggle] = useState('tasks');
	const [addPressed, setAddPressed] = useState(false);
	const data = route.params;



	useEffect(() => {
		if (data?.setHomeToggle === 'myGarden') {
			setHomeToggle('myGarden');
		}
	}, [route]);


	return (
		<WeatherContextProvider>
			<ScrollView style={{ flex: 1, backgroundColor: colors.plantaBackgroundGrey }}>

				<Spacer position="bottom" size="xl" style={{ backgroundColor: 'white' }}>
					<HeaderBar />
					{/* <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30, backgroundColor: colors.plantKeeperMidGreen, borderRadius: 40, paddingHorizontal: 30, paddingVertical: 20, }}>
						<Text variant="body" style={{ fontSize: 14, color: 'white', marginBottom: 10 }}>Welcome to permaculture plantkeeper.
							Based on the information you’ve provided we have suggestions on the best place to start!
						</Text>
						<Text variant="body" style={{ fontSize: 14, color: 'white' }}>
							For a long term, low maintenance garden the best place to start is with perennials! These are plants that produce all year round and once they are established, usually require minimum watering, weeding, fertilising and pruning. But don’t worry we’ll help you keep on top of any tasks!</Text>
					</View> */}
					<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

						<View style={{ backgroundColor: colors.plantKeeperLightGreen, borderRadius: 40, flex: 0, flexDirection: 'row', }}>
							<Button style={{ backgroundColor: homeToggle === 'tasks' ? colors.plantKeeperMidGreen : colors.plantKeeperLightGreen }} textColor={homeToggle === 'tasks' ? 'white' : colors.plantKeeperCaption} onPress={() => setHomeToggle('tasks')}>Tasks</Button>
							<Button style={{ backgroundColor: homeToggle === 'myGarden' ? colors.plantKeeperMidGreen : colors.plantKeeperLightGreen }} textColor={homeToggle === 'myGarden' ? 'white' : colors.plantKeeperCaption} onPress={() => setHomeToggle('myGarden')}>My Garden</Button>
						</View>
					</View>
					{homeToggle === 'tasks' && <TasksList navigation={navigation} />}
					{homeToggle === 'myGarden' && <GardenList navigation={navigation} />}
				</Spacer>

			</ScrollView>
			{/* TODO - animate! */}
			<View style={{ position: 'absolute', marginTop: -50, bottom: 0, right: 0 }}>
				{addPressed &&
					<View>
						<IconButton onPress={() => navigation.navigate('Plant')} style={{ position: 'absolute', right: 65, bottom: 65 }} icon="leaf" iconColor={colors.plantKeeperLightGreen} mode="contained" containerColor={colors.plantKeeperMidGreen} size={15} />
						<IconButton onPress={() => navigation.navigate('Garden', { screen: 'AddGarden' })} style={{ position: 'absolute', right: 80, bottom: 30 }} icon="bucket" iconColor={colors.plantKeeperLightGreen} mode="contained" containerColor={colors.plantKeeperMidGreen} size={15} />
					</View>
				}
				<IconButton style={{ position: 'absolute', right: 15, bottom: 15 }} icon="plus" iconColor={colors.plantKeeperLightGreen} mode="contained" containerColor={colors.plantKeeperMidGreen} size={40} onPress={() => setAddPressed(!addPressed)} />
			</View>
		</WeatherContextProvider>
	);
};

const HeaderBar = () => {
	const { weather, isLoading } = useContext(WeatherContext);
	var today = new Date();
	return (
		<View style={{ height: 150, flex: 1 }}>
			<ImageBackground source={Background} style={{ flex: 1 }} >
				<View style={{ backgroundColor: colors.transparentBlack40, flex: 1 }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 5, width: '100%' }}>
						{isLoading ? <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -40, marginLeft: -10 }} animating={true} color='red' />
							: <>

								<View style={{ padding: 15 }}>
									<Text variant="h2" style={{ color: 'white' }}>{weather.name}</Text>
									<Text variant="body" style={{ color: 'white' }}>{today.toLocaleDateString('en-AU')}</Text>
									<Text variant="body" style={{ color: 'white' }}>{Math.round(weather.main.temp)}&deg;</Text>
								</View>
								<View style={{ padding: 15 }}>
									<Text variant="body" style={{ color: 'white' }}>{weather.weather[0].main}</Text>
									<Text variant="body" style={{ color: 'white' }} >H: {Math.round(weather.main.temp_max)}&deg; L: {Math.round(weather.main.temp_min)}&deg;</Text>
								</View></>}

					</View>
				</View>
			</ImageBackground>
		</View>);
};






