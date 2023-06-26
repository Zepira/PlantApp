import React, { useCallback, useContext, useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { GARDEN_TYPE } from '../../utils/constants';
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import { AppContext } from '../../services/appContext';
import { Plant } from '../plants/plants';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';



export const GardenDetail = ({ route, navigation }) => {
	const { garden } = route.params;
	const { db } = useContext(AppContext);
	const [plants, setPlants] = useState([]);
	let gardenImage = GARDEN_TYPE[garden.gardenType].defaultImage;

	if (garden.gardenImage) {

		gardenImage = garden.gardenImage;
	}

	useFocusEffect(
		useCallback(() => {
			const getPlantData = async () => {
				let fullPlantList = [];
				let plantList = [];
				const q = query(collection(db, 'userPlants'), where('gardenId', '==', garden.id));

				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((plantDoc) => {
					let plantData = plantDoc.data();
					plantData.id = plantDoc.id;

					fullPlantList.push(plantData,);

				}
				);

				for (let userPlant of fullPlantList) {

					const plantDoc = await getDoc(doc(db, 'plants', userPlant.plantId));

					//userPlant = { ...userPlant, ...plantDoc.data() };
					plantList.push({ ...plantDoc.data(), ...userPlant });

				}


				// for (const plantId of plantIdList) {
				// 	const plantDoc = await getDoc(doc(db, 'plants', plantId));
				// 	plantList.push(plantDoc.data());
				// }


				return plantList;

			};





			getPlantData().then((allPlants) => setPlants(allPlants));
		}, [])

	);



	return (

		<ImageBackground source={{ uri: gardenImage }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { setHomeToggle: 'myGarden' })} style={{}}>
						<Avatar.Icon icon="close" size={30} color='gray' style={{ backgroundColor: theme.colors.transparentWhite60 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('EditGarden', { garden })} style={{}}>
						<Avatar.Icon icon="cog" size={30} color='gray' style={{ backgroundColor: theme.colors.transparentWhite60 }} />
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 270, marginHorizontal: 10 }}>
					<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{garden.gardenName}</Text>
					<Text variant="h2" style={{ marginBottom: 10 }}>{GARDEN_TYPE[garden.gardenType].optionText}</Text>
				</View>
				<ScrollView>
					{plants && plants.map((plant, index) => <Plant key={index} plant={plant} showProgressIndicator={true} navigation={navigation} showUserPlants={true} />)}
				</ScrollView>


			</SafeAreaWrapper>
		</ImageBackground>
	);
};