import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { theme, Text } from '../../theme';
import { AppContext } from '../../services/appContext';
import { query, collection, getDocs } from 'firebase/firestore';
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedProps,
	useDerivedValue,
} from 'react-native-reanimated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


import Svg, { Circle } from 'react-native-svg';
import { colors } from "../../theme/colors";



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

	const [growthProgress, setGrowthProgress] = useState(0);

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
		const date = new Date();
		const daysElapsed = Math.floor((date - plant.dateSown.toDate()) / (1000 * 60 * 60 * 24));
		const calc = (daysElapsed / plant.daysToSprout) * 100;

		console.log(date, plant.dateSown.toDate(), plant.daysToSprout, daysElapsed, calc);




		if (daysElapsed > plant.daysToSprout) {
			setGrowthProgress(100);
		} else {
			setGrowthProgress(calc);
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
			onPress={() => navigation.navigate('PlantDetail', plant)}>
			<Avatar.Image size={60} source={{ uri: plant.images[0] }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: theme.colors.plantkeeperDarkGreen }}>{plant.plantName}</Text>
				<Text variant="caption">{plant.plantType}</Text>
			</View>
			<View style={{ flex: 0 }}>
				<AnimatedCircularProgress
					size={50}
					width={10}
					backgroundWidth={5}
					fill={growthProgress}
					tintColor={colors.plantkeeperDarkGreen}
					backgroundColor={colors.transparentBlack40}
					arcSweepAngle={240}
					rotation={240}
					lineCap="round"
				/>
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