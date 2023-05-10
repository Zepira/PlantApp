import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Avatar, Card, RadioButton } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { theme, Text } from '../../theme';


export const TasksList = ({ navigation }) => {

	// const theme = useTheme();


	return (
		<View style={{ marginTop: 20 }}>
			{tasksData.map((task, index) => <Card style={{ marginTop: 30, marginHorizontal: 20, backgroundColor: 'white', }} mode="contained" key={index}>
				<Card.Title titleStyle={{ fontSize: 20, color: theme.colors.plantKeeperDarkestGreen }} title={task.taskName} />
				<Card.Content >
					{task.gardens.map((gardenTask, index) =>
						<View key={index}>
							<Tasks gardenTasks={gardenTask} navigation={navigation} />
						</View>
					)}

					<Text variant="body" style={{ fontSize: 10, color: 'grey', marginTop: 10, alignSelf: 'center' }}>Complete the tasks above or tap for instructions</Text>
				</Card.Content>


			</Card>)}
		</View>
	);
};

const Tasks = ({ gardenTasks, navigation }) => {
	const [checked, setChecked] = useState('');

	return (
		<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, }}
			onPress={() => navigation.navigate('TaskDetail', params = {})}>
			<Avatar.Image size={60} source={gardenTasks.gardenImage} style={{ backgroundColor: colors.plantaDarkGreen }} />
			<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
				<Text variant="body" style={{ color: colors.plantkeeperDarkGreen }}>{gardenTasks.gardenName}</Text>
				<Text variant="caption">{gardenTasks.plants.join([separator = ', '])}</Text>
			</View>
			<View style={{ flex: 0 }}>
				<RadioButton.Android
					value="first"
					status={checked === 'first' ? 'checked' : 'unchecked'}
					onPress={() => { checked === 'first' ? setChecked('') : setChecked('first'); }}
					color={colors.plantaLightGreen}
				/>
			</View>

		</TouchableOpacity>);
};



const tasksData = [
	{
		'taskName': 'Water',
		'gardens': [{
			'gardenName': 'Veggie Patch',
			'gardenImage': require('../../../assets/vegetable-garden.jpg'),
			'plants': ['Parsley', 'Rosemary', 'Carrots', 'Strawberries', 'Potato'
			],
			'completed': false
		},
		{
			'gardenName': 'Balcony Pots',
			'gardenImage': require('../../../assets/pot-garden.jpg'),
			'plants': ['Calendula',
				'Mint'
			],
			'completed': false
		}]
	},
	{
		'taskName': 'Fertilise',
		'gardens': [{
			'gardenName': 'Veggie Patch',
			'gardenImage': require('../../../assets/vegetable-garden.jpg'),
			'plants': [
				'Parsley', 'Rosemary', 'Carrots',
			],
			'completed': false
		},
		{
			'gardenName': 'Balcony Pots',
			'gardenImage': require('../../../assets/pot-garden.jpg'),
			'plants': [
				'Calendula',
				'Mint',
			],
			'completed': false
		}]
	},
	{
		'taskName': 'Harvest',
		'gardens': [{
			'gardenName': 'Veggie Patch',
			'gardenImage': require('../../../assets/vegetable-garden.jpg'),
			'plants': [
				'Parsley', 'Rosemary', 'Carrots',
			],
			'completed': false
		},
		{
			'gardenName': 'Balcony Pots',
			'gardenImage': require('../../../assets/pot-garden.jpg'),
			'plants': [
				'Calendula',
				'Mint',
			],
			'completed': false
		}]
	}
];
