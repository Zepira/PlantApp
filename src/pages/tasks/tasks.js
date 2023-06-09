/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, Card, RadioButton } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { theme, Text } from '../../theme';
import { AppContext } from '../../services/appContext';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { doc, query, collection, getDocs, where, updateDoc } from 'firebase/firestore';


export const TasksList = ({ navigation }) => {

	// const theme = useTheme();
	const { db } = useContext(AppContext);
	const { user } = useContext(AuthenticationContext);
	const [tasksUpdated, setTasksUpdated] = useState(false);
	// const [gardensToHarvest, setGardensToHarvest] = useState([]);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		let gardensToWater = [];
		let gardensToFertilise = [];
		let gardensToWeed = [];

		const getUserGardens = async () => {
			const gardensQuery = await getDocs(query(collection(db, 'userGardens'), where('user', '==', user.uid)));
			return gardensQuery.docs;
		};

		const getuserPlantsByGardenId = async (gardenId) => {
			const plantsQuery = await getDocs(query(collection(db, 'userPlants'), where('gardenId', '==', gardenId)));
			return plantsQuery.docs;
		};

		getUserGardens().then((userGardens) => {

			let userGardensList = userGardens;

			userGardens.forEach((garden) => {
				const gardenData = garden.data();
				const date = new Date();

				if (!gardenData.automatedWatering) {

					const daysSinceLastWatered = gardenData.lastWateredDate ? Math.floor((date - gardenData.lastWateredDate.toDate()) / (1000 * 60 * 60 * 24)) : null;

					if (gardenData.wateringFrequency && (daysSinceLastWatered === null || daysSinceLastWatered > gardenData.wateringFrequency)) {
						gardensToWater.push(
							{
								'gardenName': gardenData.gardenName,
								'gardenImage': require('../../../assets/vegetable-garden.jpg'),
								'plants': ['Parsley', 'Rosemary', 'Carrots', 'Strawberries', 'Potato'
								],
								'id': garden.id,
								'checked': false
							}
						);
					}
				}

				const daysSinceLastFertilised = gardenData.lastFertilisedDate ? Math.floor((date - gardenData.lastFertilisedDate.toDate()) / (1000 * 60 * 60 * 24)) : null;
				const daysSinceLastWeeded = gardenData.lastWeededDate ? Math.floor((date - gardenData.lastWeededDate.toDate()) / (1000 * 60 * 60 * 24)) : null;

				if (gardenData.fertilisingFrequency && (daysSinceLastFertilised === null || daysSinceLastFertilised > gardenData.fertilisingFrequency)) {
					gardensToFertilise.push(
						{
							'gardenName': gardenData.gardenName,
							'gardenImage': require('../../../assets/vegetable-garden.jpg'),
							'plants': ['Parsley', 'Rosemary', 'Carrots', 'Strawberries', 'Potato'
							],
							'id': garden.id,
							'checked': false
						}
					);
				}
				if (gardenData.weedingFrequency && (daysSinceLastWeeded === null || daysSinceLastWeeded > gardenData.weedingFrequency)) {
					gardensToWeed.push(
						{
							'gardenName': gardenData.gardenName,
							'gardenImage': require('../../../assets/vegetable-garden.jpg'),
							'plants': ['Parsley', 'Rosemary', 'Carrots', 'Strawberries', 'Potato'
							],
							'id': garden.id,
							'checked': false
						}
					);
				}
			});

			return userGardensList;
		}).then((result) => {
			//loop through gardens to get plants
			let plantsToHarvest = [];
			let gardensToHarvest = [];

			result.forEach(garden => {

				getuserPlantsByGardenId(garden.id).then((userPlants) => {

					userPlants.forEach((plant) => {

						const plantData = plant.data();

						if (plantData.readyToHarvest) {


							plantsToHarvest.push(plantData.plantName);
						}
					});
				}).then(() => {

					gardensToHarvest.push(
						{
							'gardenName': garden.data().gardenName,
							'gardenImage': require('../../../assets/vegetable-garden.jpg'),
							'plants': plantsToHarvest,
							'id': garden.id,
							'checked': false
						}
					);
				}).then(() => {
					setTasks([
						{
							'taskName': 'Water',
							'gardens': gardensToWater
						},
						{
							'taskName': 'Fertilise',
							'gardens': gardensToFertilise
						},
						{
							'taskName': 'Weed',
							'gardens': gardensToWeed
						},
						{
							'taskName': 'Harvest',
							'gardens': gardensToHarvest
						}
					]);
				});

			});

		});

	}, [tasksUpdated]);

	const completeTask = (gardenTask, taskName) => {
		//TODO add harvest function
		switch (taskName) {
			case 'Water':
				updateDoc(doc(db, 'userGardens', gardenTask.id), {
					lastWateredDate: new Date(),
				});
				break;
			case 'Fertilise':
				updateDoc(doc(db, 'userGardens', gardenTask.id), {
					lastFertilisedDate: new Date(),
				});
				break;
			case 'Weed':
				updateDoc(doc(db, 'userGardens', gardenTask.id), {
					lastWeededDate: new Date(),
				});
				break;
		}
		setTasksUpdated(!tasksUpdated);
	};


	return (
		<View style={{ marginTop: 20 }}>
			{tasks.map((task, index) => <Card style={{ marginTop: 30, marginHorizontal: 20, backgroundColor: 'white', }} mode="contained" key={index}>
				<Card.Title titleStyle={{ fontSize: 20, color: theme.colors.plantKeeperDarkestGreen }} title={task.taskName} />
				<Card.Content >
					{task.gardens.map((gardenTask, index) =>
						<View key={index}>
							<Tasks gardenTask={gardenTask} navigation={navigation} completeTask={() => completeTask(gardenTask, task.taskName)} />
						</View>
					)}

					<Text variant="body" style={{ fontSize: 10, color: 'grey', marginTop: 10, alignSelf: 'center' }}>Complete the tasks above or tap for instructions</Text>
				</Card.Content>


			</Card>)}
		</View>
	);
};

const Tasks = ({ gardenTask, navigation, completeTask }) => {
	const [checked, setChecked] = useState('');


	return (
		<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, }}
			onPress={() => navigation.navigate('TaskDetail', params = {})}>
			<Avatar.Image size={60} source={gardenTask.gardenImage} style={{ backgroundColor: colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: colors.plantkeeperDarkGreen }}>{gardenTask.gardenName}</Text>
				<Text variant="caption">{gardenTask.plants.join([separator = ', '])}</Text>
			</View>
			<View style={{ flex: 0 }}>
				<RadioButton.Android
					value={gardenTask.gardenName}
					status={checked === gardenTask.gardenName ? 'checked' : 'unchecked'}
					onPress={() => { checked === gardenTask.gardenName ? setChecked('') : setChecked(gardenTask.gardenName); completeTask(gardenTask.id); }}
					color={colors.plantaLightGreen}
				/>
			</View>

		</TouchableOpacity>);
};