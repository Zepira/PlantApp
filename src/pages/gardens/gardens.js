import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, Card, IconButton, RadioButton } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { theme, Text } from '../../theme';
import { AppContext } from '../../services/appContext';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { GARDEN_TYPE } from '../../utils/constants';
import { doc, query, collection, getDoc, getDocs, where } from 'firebase/firestore';


export const GardenList = ({ navigation }) => {

	const { db } = useContext(AppContext);
	const { user } = useContext(AuthenticationContext);
	const [gardenData, setGardenData] = useState();

	useEffect(() => {
		const gardensQuery = query(collection(db, 'userGardens'), where('user', '==', user.uid));
		getDocs(gardensQuery).then((querySnapshot) => {
			const docs = querySnapshot.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
			setGardenData(docs);
		}
		);
	}, []);


	return (
		<View style={{ marginTop: 20 }}>
			<Card style={{ marginTop: 30, marginHorizontal: 20, backgroundColor: 'white', }} mode="contained">
				<Card.Title titleStyle={{ fontSize: 20, color: theme.colors.plantKeeperDarkestGreen }} title='Gardens' />
				<Card.Content >
					{gardenData && gardenData.map((garden, index) =>
						<View key={index}>
							<Tasks garden={garden} navigation={navigation} />
						</View>
					)}


				</Card.Content>


			</Card>
		</View>
	);
};

const Tasks = ({ garden, navigation }) => {
	let gardenType = GARDEN_TYPE[garden.gardenType - 1];



	if (!garden.gardenImage) {
		garden.gardenImage = gardenType.defaultImage;
	}

	return (

		<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}
			onPress={() => navigation.navigate('GardenDetail', { garden })}>
			<Avatar.Image size={60} source={{ uri: garden.gardenImage }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: theme.colors.plantkeeperDarkGreen }}>{garden.gardenName}</Text>
				<Text variant="caption"> {gardenType ? gardenType.optionText : ''}</Text>
			</View>
			<View style={{ flex: 0 }}>
				<IconButton
					icon="arrow-right"
					value="first"
					iconColor={theme.colors.plantkeeperDarkGreen}
					size={20}
				/>
			</View>

		</TouchableOpacity>
	);
};


