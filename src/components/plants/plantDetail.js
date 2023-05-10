import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaWrapper } from '../safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';




export const PlantsDetail = ({ route, navigation }) => {
	const data = route.params;
	console.log('plantsDetail', data);
	return (

		<ImageBackground source={{ uri: data.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

				<TouchableOpacity onPress={() => navigation.navigate('Plants')} style={{}}>
					<Avatar.Icon icon="close" size={30} color='white' style={{ backgroundColor: theme.colors.transparentWhite40 }} />
				</TouchableOpacity>
				<View style={{ marginTop: 270, marginHorizontal: 10 }}>
					<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{data.plantName}</Text>
					<Text variant="h2" style={{ marginBottom: 10 }}>{data.scientificName}</Text>
					<Text variant="body">{data.description}</Text>
				</View>


			</SafeAreaWrapper>
		</ImageBackground>


	);
};