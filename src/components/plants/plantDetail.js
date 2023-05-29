import React, { useContext, useEffect, useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { Avatar, IconButton, Modal, Portal } from 'react-native-paper';
import { SafeAreaWrapper } from '../safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { colors } from '../../theme/colors';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppContext } from '../../services/appContext';
import { FieldValue, collection, addDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';




export const PlantsDetail = ({ route, navigation }) => {
	const data = route.params;
	const [isFavourite, setIsFavourite] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [gardens, setGardens] = useState(null);
	const { user, userData } = useContext(AuthenticationContext);
	const { db } = useContext(AppContext);


	useEffect(() => {
		if (data.userFavourite && data.userFavourite?.includes(user.uid))
			setIsFavourite(true);
		const gardensQuery = query(collection(db, 'userGardens'), where('user', '==', user.uid));
		getDocs(gardensQuery).then((querySnapshot) => {

			const docs = querySnapshot.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
			console.log('blah', docs);
			setGardens(docs);
		}
		);
	}, []);


	const toggleFavourite = () => {

		if (!data.userFavourite) {
			data.userFavourite = [];
		}
		const updatedFavourites = data.userFavourite;
		const index = data.userFavourite.indexOf(user.uid);

		if (index === -1) {
			updatedFavourites.push(user.uid);
		} else {
			updatedFavourites.splice(index, 1);
		}
		updateDoc(doc(db, 'plants', data.id), {
			userFavourite: updatedFavourites
		}).then(() => {
			setIsFavourite(!isFavourite);
			data.userFavourite = updatedFavourites;
		}
		);
	};

	const addPlant = () => {
		setIsModalVisible(true);

	};

	const addPlantToGarden = (garden) => {
		// const index = userData.userGardens.indexOf(garden);
		// let updatedGardens = userData.userGardens;
		// if (!updatedGardens[index].plants) {
		// 	updatedGardens[index].plants = [];
		// }
		// updatedGardens[index].plants.push(`plants/${data.id}`);


		const date = new Date();
		console.log('alana', date);
		addDoc(collection(db, 'userPlants'), {
			plantId: data.id,
			gardenId: garden.id,
			userId: user.uid,
			dateSown: date,
			growthStage: 0
		});
		setIsModalVisible(false);

		// addDoc(collection(db, 'userPlants'),{
		// 	userId:  doc(db, 'users/' + user.uid),
		// 	gardenId:   doc(db, 'userGardens/' + user.uid);`userGardens${garden.id}`
		// });




		// updateDoc(doc(db, 'userPlants', user.uid), {
		// 	userGardens: updatedGardens
		// }
		// ).then(
		// 	setIsModalVisible(false)
		// );

		// addDoc(doc(db, 'userPlants'),{
		// 	userId: `users${user.uid}`,
		// 	gardenId:  `userGardens${garden.id}`
		// }).then();


	};

	return (

		<ImageBackground source={{ uri: data.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
			<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

				<TouchableOpacity onPress={() => navigation.navigate('Plants')} style={{}}>
					<Avatar.Icon icon="close" size={30} color='white' style={{ backgroundColor: theme.colors.transparentWhite40 }} />
				</TouchableOpacity>
				<View style={{ marginTop: 270, marginHorizontal: 10, flexDirection: 'row', justifyContend: 'flex-end' }}>
					<View style={{ flex: 1 }}>
						<Text variant="title" style={{ color: theme.colors.plantkeeperDarkGreen }}>{data.plantName}</Text>
						<Text variant="h2" style={{ marginBottom: 10 }}>{data.scientificName}</Text>
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
				<View style={{ marginHorizontal: 10 }}>
					<Text variant="body">{data.description}</Text>
				</View>
				<Portal>
					<Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
						<Text>Which garden do you want to plant in?</Text>
						{gardens && gardens.map((garden, index) => <Pressable key={index} onPress={() => addPlantToGarden(garden)}>
							<Text>
								{garden.gardenName}
							</Text>
						</Pressable>)}

					</Modal>
				</Portal>

			</SafeAreaWrapper>
		</ImageBackground>


	);
};