import React, { useContext, useEffect, useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { Avatar, Button, IconButton, Modal, Portal } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { colors } from '../../theme/colors';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppContext } from '../../services/appContext';
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';

export const PlantsDetail = ({ route, navigation }) => {
	const { plant, selectedVariety } = route.params;
	console.log(selectedVariety, 'selectedVariety', plant.varieties[selectedVariety]);
	const [isFavourite, setIsFavourite] = useState(false);
	const [isGardenSelectorVisible, setIsGardenSelectorVisible] = useState(false);
	const [isVarietySelectorVisible, setIsVarietySelectorVisible] = useState(false);
	const [gardens, setGardens] = useState(null);
	const { user } = useContext(AuthenticationContext);
	const { db } = useContext(AppContext);

	useEffect(() => {
		if (plant.userFavourite && plant.userFavourite?.includes(user.uid))
			setIsFavourite(true);
		const gardensQuery = query(collection(db, 'userGardens'), where('user', '==', user.uid));
		getDocs(gardensQuery).then((querySnapshot) => {
			const docs = querySnapshot.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
			setGardens(docs);
		}
		);
	}, []);


	const toggleFavourite = () => {

		if (!plant.userFavourite) {
			plant.userFavourite = [];
		}
		const updatedFavourites = plant.userFavourite;
		const index = plant.userFavourite.indexOf(user.uid);

		if (index === -1) {
			updatedFavourites.push(user.uid);
		} else {
			updatedFavourites.splice(index, 1);
		}
		updateDoc(doc(db, 'plants', plant.id), {
			userFavourite: updatedFavourites
		}).then(() => {
			setIsFavourite(!isFavourite);
			plant.userFavourite = updatedFavourites;
		}
		);
	};

	const addPlant = () => {
		setIsGardenSelectorVisible(true);

	};

	const addPlantToGarden = (garden) => {
		// const index = userData.userGardens.indexOf(garden);
		// let updatedGardens = userData.userGardens;
		// if (!updatedGardens[index].plants) {
		// 	updatedGardens[index].plants = [];
		// }
		// updatedGardens[index].plants.push(`plants/${data.id}`);


		const date = new Date();

		const newUserPlant = {
			plantId: plant.id,
			gardenId: garden.id,
			userId: user.uid,
			dateSown: date,
			growthStage: 0,
			plantName: plant.plantName,
			image: selectedVariety !== undefined ? plant.varieties[selectedVariety].images[0] : plant.images[0],
			variety: selectedVariety !== undefined ? plant.varieties[selectedVariety].varietyName : null
		};

		console.log('newPlant', newUserPlant);

		addDoc(collection(db, 'userPlants'), newUserPlant);
		setIsGardenSelectorVisible(false);

		// addDoc(collection(db, 'userPlants'),{
		// 	userId:  doc(db, 'users/' + user.uid),
		// 	gardenId:   doc(db, 'userGardens/' + user.uid);`userGardens${garden.id}`
		// });




		// updateDoc(doc(db, 'userPlants', user.uid), {
		// 	userGardens: updatedGardens
		// }
		// ).then(
		// 	setIsGardenSelectorVisible(false)
		// );

		// addDoc(doc(db, 'userPlants'),{
		// 	userId: `users${user.uid}`,
		// 	gardenId:  `userGardens${garden.id}`
		// }).then();


	};

	return (

		<ImageBackground source={{ uri: plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

				<TouchableOpacity onPress={() => navigation.navigate('Plants')} style={{}}>
					<Avatar.Icon icon="close" size={30} color='white' style={{ backgroundColor: theme.colors.transparentWhite40 }} />
				</TouchableOpacity>
				<View style={{ marginTop: 270, marginHorizontal: 10, flexDirection: 'row', justifyContend: 'flex-end' }}>
					<View style={{ flex: 1 }}>
						<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{plant.plantName}</Text>
						<Text variant="h2" style={{ marginBottom: 10 }}>{plant.scientificName}</Text>
					</View>

					<IconButton
						icon="plus"
						containerColor={colors.plantKeeperLightGreen} iconColor={colors.plantKeeperDarkestGreen} size={30}
						onPress={addPlant}
					/>
					<IconButton
						icon={isFavourite ? 'heart' : 'heart-outline'}
						containerColor={colors.plantKeeperLightGreen} iconColor={colors.plantKeeperDarkestGreen} size={30}
						onPress={() => toggleFavourite()}
					/>


				</View>
				<Button style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 }} onPress={() => navigation.navigate('Varieties', plant)} mode='outlined' >See varieties</Button>
				<View style={{ marginHorizontal: 10 }}>
					<Text variant="body">{plant.description}</Text>
				</View>

				{/* Choose garden popup */}
				<Portal>
					<Modal visible={isGardenSelectorVisible} onDismiss={() => setIsGardenSelectorVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
						<Text>Which garden do you want to plant in?</Text>
						{gardens && gardens.map((garden, index) => <Pressable key={index} onPress={() => addPlantToGarden(garden)}>
							<Text>
								{garden.gardenName}
							</Text>
						</Pressable>)}

					</Modal>
				</Portal>

				{/* Choose variety popup */}
				<Portal>
					<Modal visible={isVarietySelectorVisible} onDismiss={() => setIsVarietySelectorVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
						{plant.varieties && plant.varieties.map((variety, index) => <Pressable key={index}
						// onPress={() => addPlantToGarden(garden)}
						>
							<View style={{ flex: 0, flexDirection: 'row' }}>
								<Avatar.Image size={60} source={{ uri: variety.images[0] }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
								<Text>
									{variety.varietyName}
								</Text>
							</View>
						</Pressable>)}

					</Modal>
				</Portal>

			</SafeAreaWrapper>
		</ImageBackground>


	);
};