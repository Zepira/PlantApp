import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { theme, Text } from '../../theme';
import { AppContext } from '../../services/appContext';
import { query, collection, getDocs } from 'firebase/firestore';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../theme/colors';

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

export const Plant = ({ plant, navigation, showProgressIndicator = false, showUserPlants = false }) => {


	const [growthProgress, setGrowthProgress] = useState(0);
	const [growthStage, setGrowthStage] = useState(0);

	// const something = plant.dateSown.toDate();
	// const asdasd = something.setDate(something + 5);
	// console.log(something.toDate(), plant.daysToSprout, asdasd);



	useEffect(() => {
		// var harvestDate = plant.dateSown.toDate();
		// harvestDate.setDate(harvestDate.getDate() + plant.daysToSprout);
		// console.log(plant.dateSown.toDate().toDateString(), plant.daysToSprout, harvestDate.toDateString());

		// const date = new Date();
		// const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

		// const asdasd = Math.round(Math.abs((harvestDate - date.getDate()) / oneDay));
		// const daysRemaining = (harvestDate - date) / (1000 * 60 * 60 * 24);

		// const calc = (daysRemaining / plant.daysToSprout) * 100;
		// console.log(daysRemaining, calc);


		//plant.dateSown
		//plant.daysToSprout
		if (showProgressIndicator) {
			const date = new Date();
			const daysSinceSowing = Math.floor((date - plant.dateSown.toDate()) / (1000 * 60 * 60 * 24));
			const sproutProgress = (daysSinceSowing / plant.daysToSprout) * 100;
			if (sproutProgress > 100) {
				const plantProgress = (daysSinceSowing / plant.sproutToHarvest) * 100;
				if (plantProgress > 100) {
					setGrowthStage(2);
				} else {
					setGrowthStage(1);
					setGrowthProgress(plantProgress);
				}
			} else {
				setGrowthProgress(sproutProgress);
			}
		}

	}, []);

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
			onPress={() => {
				if (!showUserPlants) {
					navigation.navigate('PlantDetail', { plant: plant });
				} else {
					navigation.navigate('UserPlantDetail', { plant: plant });
				}
			}}>
			<Avatar.Image size={60} source={{ uri: plant.images[0] }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: theme.colors.plantkeeperDarkGreen }}>{plant.plantName}</Text>
				<Text variant="caption">{plant.plantType}</Text>
			</View>

			<Text style={{ color: theme.colors.plantkeeperDarkGreen, alignSelf: 'center' }}>{plant.count}</Text>

			{showProgressIndicator && <GrowthProgressIndicator growthStage={growthStage} growthProgress={growthProgress} />}
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

const GrowthProgressIndicator = ({ growthStage, growthProgress }) =>
	<View >
		{growthStage === 0 && <Avatar.Icon icon="seed" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: colors.transparent, position: 'absolute', top: 10, left: 10 }} />}
		{growthStage === 1 && <Avatar.Icon icon="leaf" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: colors.transparent, position: 'absolute', top: 10, left: 10 }} />}
		{growthStage < 2 && <AnimatedCircularProgress
			size={50}
			width={10}
			backgroundWidth={5}
			fill={growthProgress}
			tintColor={colors.plantkeeperDarkGreen}
			backgroundColor={colors.transparentBlack40}
			arcSweepAngle={240}
			rotation={240}
			lineCap="round"
		/>}
		{growthStage === 2 && <Avatar.Icon icon="flower" size={50} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: colors.transparent }} />}
	</View>;

