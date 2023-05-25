import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { SafeAreaWrapper } from '../safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { GARDEN_TYPE } from '../../utils/constants';
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import { AppContext } from '../../services/appContext';
import { Plant } from '../plants/plants';



export const GardenDetail = ({ route, navigation }) => {
	const { garden } = route.params;
	const { db, setIsLoading } = useContext(AppContext);
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		const getPlantData = async () => {
			let plantIdList = [];
			let plantList = [];
			const q = query(collection(db, 'userPlants'), where('gardenId', '==', garden.id));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((plantDoc) =>
				plantIdList.push(plantDoc.data().plantId)
			);


			for (const plantId of plantIdList) {
				const plantDoc = await getDoc(doc(db, 'plants', plantId));
				plantList.push(plantDoc.data());
			}

			return plantList;

		};



		getPlantData().then((allPlants) => setPlants(allPlants));

	}, []);

	return (

		<ImageBackground source={{ uri: garden.gardenImage }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

				<TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { setHomeToggle: 'myGarden' })} style={{}}>
					<Avatar.Icon icon="close" size={30} color='gray' style={{ backgroundColor: theme.colors.transparentWhite60 }} />
				</TouchableOpacity>
				<View style={{ marginTop: 270, marginHorizontal: 10 }}>
					<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{garden.gardenName}</Text>
					<Text variant="h2" style={{ marginBottom: 10 }}>{GARDEN_TYPE[garden.gardenType - 1].optionText}</Text>
				</View>
				{plants && plants.map((plant, index) => <Plant key={index} plant={plant} />)}


			</SafeAreaWrapper>
		</ImageBackground>
	);
};