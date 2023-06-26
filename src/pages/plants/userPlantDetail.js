import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';


export const UserPlantDetail = ({ route, navigation }) => {
	const { plant } = route.params;

	//fix variety display











	return (

		<ImageBackground source={{ uri: plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>
				<Text>USER PLANT DETAIL</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
						<Avatar.Icon icon="close" size={30} color='white' style={{ backgroundColor: theme.colors.transparentWhite40 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('EditUserPlant', { plant })} style={{}}>
						<Avatar.Icon icon="cog" size={30} color='gray' style={{ backgroundColor: theme.colors.transparentWhite60 }} />
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 270, marginHorizontal: 10, flexDirection: 'row', justifyContend: 'flex-end' }}>
					<View style={{ flex: 1 }}>
						<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{plant.plantName}</Text>
						<Text variant="h2" style={{ marginBottom: 10 }}>{plant.scientificName}</Text>

					</View>




				</View>
				<Button style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 }} onPress={() => navigation.navigate('Varieties', plant)} mode='outlined' >See varieties</Button>
				<View style={{ marginHorizontal: 10 }}>
					{/* {plant.varietyName && <Text variant="h2" style={{ marginBottom: 10 }}>Variety: {plant.varietyName}</Text>}
					<Text variant="body">{plant.description}</Text>
					{plant.varietyName !== null && <Text>{selectedVariety.description}</Text>} */}
				</View>



			</SafeAreaWrapper>
		</ImageBackground>


	);
};