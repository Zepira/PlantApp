import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Avatar, Button, Dialog, IconButton, Portal, ProgressBar } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { colors } from '../../theme/colors';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppContext } from '../../services/appContext';
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { QuestionaireNavigator } from '../../navigation/questionaire.navigator';
import { QuestionScreen } from '../questions/questions';
import { GROWING_STAGES } from '../../utils/constants';
import { useFocusEffect } from '@react-navigation/native';


export const PlantsDetail = ({ route, navigation }) => {
	const { plant, selectedVarietyIndex } = route.params;
	const [isFavourite, setIsFavourite] = useState(false);
	const [isGardenSelectorVisible, setIsGardenSelectorVisible] = useState(false);
	const [isVarietySelectorVisible, setIsVarietySelectorVisible] = useState(false);
	const [showNotSowingMonth, setShowNotSowingMonth] = useState(false);
	const [isSowableNow, setIsSowableNow] = useState(false);
	const [gardens, setGardens] = useState(null);
	const [gardenOptions, setGardenOptions] = useState([]);
	const [selectedVariety, setSelectedVariety] = useState(null);
	const { user, userData, updateUserData } = useContext(AuthenticationContext);
	const { db } = useContext(AppContext);


	useFocusEffect(
		useCallback(() => {

			if (userData.plantFavourites?.includes(plant.id))
				setIsFavourite(true);
			const gardensQuery = query(collection(db, 'userGardens'), where('user', '==', user.uid));
			getDocs(gardensQuery).then((querySnapshot) => {
				const docs = querySnapshot.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));
				const options = querySnapshot.docs.map((f) => ({ ...{ optionText: f.data().gardenName, optionMapping: f.id, optionImage: f.data().gardenImage } }));

				setGardens(docs);
				setGardenOptions(options);
			}
			);
		}, [])

	);

	useEffect(() => {
		if (selectedVarietyIndex !== undefined) {
			setSelectedVariety(plant.varieties[selectedVarietyIndex]);
		}
	}, [selectedVarietyIndex, setSelectedVariety, selectedVariety]);


	const toggleFavourite = () => {

		if (!userData.plantFavourites) {
			userData.plantFavourites = [];
		}
		const updatedFavourites = userData.plantFavourites;
		const index = userData.plantFavourites.indexOf(plant.id);

		if (index === -1) {
			updatedFavourites.push(plant.id);
		} else {
			updatedFavourites.splice(index, 1);
		}
		updateDoc(doc(db, 'users', user.uid), {
			plantFavourites: updatedFavourites
		}).then(() => {
			updateUserData();
			setIsFavourite(!isFavourite);
			plant.userFavourite = updatedFavourites;
		}
		);
	};

	const addPlant = () => {
		if (!isSowableNow) {
			setShowNotSowingMonth(true);
		} else {
			setIsGardenSelectorVisible(true);
		}

	};

	const addPlantToGarden = (formData) => {
		// const index = userData.userGardens.indexOf(garden);
		// let updatedGardens = userData.userGardens;
		// if (!updatedGardens[index].plants) {
		// 	updatedGardens[index].plants = [];
		// }
		// updatedGardens[index].plants.push(`plants/${data.id}`);


		const date = new Date();
		console.log('formData', formData);

		const newUserPlant = {
			plantId: plant.id,
			gardenId: formData.gardenId ? formData.gardenId : null,
			growthStage: formData.growthStage,
			userId: user.uid,
			dateSown: date,
			plantName: plant.plantName,
			images: selectedVariety !== null ? selectedVariety.images : plant.images,
			variety: selectedVariety !== null ? selectedVariety.varietyName : null,
			count: formData.plantCount
		};

		console.log('newPlant', newUserPlant);

		addDoc(collection(db, 'userPlants'), newUserPlant);
		setIsGardenSelectorVisible(false);

	};


	const calculateGrowingCalendar = () => {

		let monthArray = [];
		let sowingDates = plant.sowingDates.find(x => x.climateZone === userData.climateZone).sowingDates;




		Array.from({ length: 12 }, (_, k) => {
			let isMidMonth = false;
			let isEndMonth = false;
			let isStartMonth = false;

			sowingDates.forEach((sowingDate) => {

				const date = new Date();
				const sowingMonth = sowingDate.toDate().getMonth();

				if (date.getMonth() === sowingMonth && !isSowableNow) {
					setIsSowableNow(true);
				}

				if (k === sowingMonth) {
					isMidMonth = true;
				}
			});




			monthArray.push({
				monthKey: k,
				isStartMonth: isStartMonth,
				isEndMonth: isEndMonth,
				isMidMonth: isMidMonth
			});
		});




		let updatedMonthAray = monthArray;
		monthArray.forEach((month, index,) => {

			if (monthArray[index].isMidMonth) {

				if (index === 11) {
					updatedMonthAray[index].isEndMonth = true;
				} if (index !== 11 && !monthArray[index + 1].isMidMonth) {
					updatedMonthAray[index].isEndMonth = true;
				}
				if (index === 0) {
					updatedMonthAray[index].isStartMonth = true;
				}
				if (index !== 0 && !monthArray[index - 1].isMidMonth) {
					updatedMonthAray[index].isStartMonth = true;
				}

			}

		});


		return updatedMonthAray;

	};

	const addPlantQuestions = [
		{
			index: 0,
			questionText: `Where do you want to plant ${plant.plantName}?`,
			databaseValue: 'gardenId',
			questionSubText: '',
			questionType: 'select',
			options: gardenOptions
		},
		{
			index: 1,
			questionText: 'What are you planting?',
			databaseValue: 'growthStage',
			questionSubText: '',
			questionType: 'select',
			options: GROWING_STAGES

		},
		{
			index: 2,
			questionText: 'How many of this plant/ variety are you planting?',
			databaseValue: 'plantCount',
			questionSubText: '',
			questionType: 'number',
			options: ''
		},

		// {
		// 	index: 3,
		// 	questionText: 'What is the length of the garden bed? (cm)',
		// 	databaseValue: 'gardenBedLength',
		// 	questionSubText: '',
		// 	questionType: 'textInput',
		// 	value: ''

		// },
		// {
		// 	index: 4,
		// 	questionText: 'What is the width of the garden bed? (cm)',
		// 	databaseValue: 'gardenBedWidth',
		// 	questionSubText: '',
		// 	questionType: 'textInput'

		// },
		// {
		// 	index: 5,
		// 	questionText: 'Does it have automated watering set up?',
		// 	databaseValue: 'automatedWatering',
		// 	questionSubText: '',
		// 	questionType: 'radioGroup',
		// 	options: [{
		// 		optionText: 'Yes',
		// 		optionMapping: true,
		// 	},
		// 	{
		// 		optionText: 'No',
		// 		optionMapping: false,
		// 	}],
		// },
	];

	return (
		<>
			<ImageBackground source={{ uri: selectedVariety !== null ? selectedVariety.images[0] : plant.images[0] }} style={{ height: 300, resizeMode: 'cover', width: '100%', flex: 1, backgroundColor: theme.colors.plantaBackgroundGrey }} >
				<SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

					<TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
						<Avatar.Icon icon="close" size={30} color='white' style={{ backgroundColor: theme.colors.transparentWhite40 }} />
					</TouchableOpacity>
					<ScrollView>
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
							{selectedVariety && <Text variant="h2" style={{ marginBottom: 10 }}>Variety: {selectedVariety.varietyName}</Text>}
							<Text variant="body">{plant.description}</Text>
							{selectedVariety !== null && <Text>{selectedVariety.description}</Text>}
						</View>

						<View style={{ marginTop: 10 }}>
							<View style={{ flexDirection: 'row', paddingHorizontal: 7 }}>
								{Array.from({ length: 12 }, (_, k) => {
									const date = new Date();
									const isCurrentMonth = date.getMonth() === k;
									date.setMonth(k);
									const monthName = date.toLocaleString('en-AU', { month: 'short' });
									return (
										<View key={k} style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 2 }}>
											{isCurrentMonth && <Avatar.Icon icon="triangle" size={15} color='black' style={{ backgroundColor: theme.colors.transparentWhite40, transform: 'rotate(180deg)', alignSelf: 'center', marginBottom: -5 }} />
											}
											<Text style={{ fontSize: 12, alignSelf: 'center' }}>{monthName}</Text>
										</View>
									);
								}
								)}
							</View>
							<View style={{ flexDirection: 'row', backgroundColor: colors.transparent, padding: 5, borderRadius: 20, borderColor: colors.plantKeeperCaption, borderWidth: 1 }}>

								{calculateGrowingCalendar().map((month) => {
									const isGrowingMonth = month.isStartMonth | month.isEndMonth | month.isMidMonth;

									return <View key={month.monthKey} style={{ backgroundColor: isGrowingMonth ? colors.plantKeeperCaption : colors.transparent, flex: 1, height: 20, borderBottomLeftRadius: month.isStartMonth ? 20 : 0, borderTopLeftRadius: month.isStartMonth ? 20 : 0, borderTopRightRadius: month.isEndMonth ? 20 : 0, borderBottomRightRadius: month.isEndMonth ? 20 : 0 }}>

									</View>;
								}
								)}
							</View>
						</View>

					</ScrollView>



					{/* Not sowing month alert */}
					<Portal>
						<Dialog visible={showNotSowingMonth} onDismiss={() => setShowNotSowingMonth(false)}>
							<Dialog.Title>Out of season</Dialog.Title>
							<Dialog.Content>
								<Text >{`It's not the right time of year for ${plant.plantName}. You can plant it inside and translplant at a later date, or take your changes outside`}</Text>
							</Dialog.Content>
							<View style={{ flexDirection: 'row' }}>
								<Dialog.Actions>
									<Button onPress={() => setShowNotSowingMonth(false)}>Nevermind</Button>
								</Dialog.Actions>
								<Dialog.Actions>
									<Button onPress={() => { setShowNotSowingMonth(false); setIsGardenSelectorVisible(true); }}>Plant it anyway</Button>
								</Dialog.Actions>
							</View>
						</Dialog>
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


			</ImageBackground >
			{/* Choose garden popup */}
			<Modal presentationStyle="fullScreen" visible={isGardenSelectorVisible} statusBarTranslucent={true} onDismiss={() => setIsGardenSelectorVisible(false)} contentContainerStyle={{ backgroundColor: 'white' }} style={{ margin: 0 }}>
				<View style={{ flex: 1, height: '100%' }}><Button onPress={() => setIsGardenSelectorVisible(false)}>press me</Button>
					<QuestionScreen data={addPlantQuestions} onCompleteForm={(completedData) => addPlantToGarden(completedData)} /></View>
			</Modal>


		</>


	);
};