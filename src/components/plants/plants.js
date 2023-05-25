import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { theme, Text } from '../../theme';
import { AppContext } from '../../services/appContext';
import { query, collection, getDocs } from 'firebase/firestore';


export const PlantList = ({ navigation }) => {

	const { storage, db } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [plantData, setPlantData] = useState();

	useEffect(() => {

		const docRef = query(collection(db, 'plants'));
		getDocs(docRef)
			.then((something) => {
				const docs = something.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
				setPlantData(docs);
				setIsLoading(false);
			}
			);

	}, []);


	return (
		<>
			{!isLoading && plantData.map((plantData, key) => {

				return (
					<View key={key}><Plant plant={plantData} storage={storage} navigation={navigation} /></View>);
			})
			}
		</>);
};

export const Plant = ({ plant, navigation }) => {



	// useEffect(() => {
	//     const imageRef = ref(storage, plant.images[0]);
	//     getDownloadURL(imageRef)
	//         .then((url) => {
	//             setImageUrl(url);
	//             plant.imageUrl = url;
	//         })
	//         .catch((e) => console.log('Errors while downloading => ', e));
	// }, [setImageUrl]);



	return (
		<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginHorizontal: 15 }}
			onPress={() => navigation.navigate('PlantDetail', plant)}>
			<Avatar.Image size={60} source={{ uri: plant.images[0] }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: theme.colors.plantkeeperDarkGreen }}>{plant.plantName}</Text>
				<Text variant="caption">{plant.plantType}</Text>
			</View>
			<View style={{ flex: 0 }}>
				<IconButton
					icon="arrow-right"
					value="first"
					iconColor={theme.colors.plantkeeperDarkGreen}
					size={20}
				/>
			</View>

		</TouchableOpacity>);
};