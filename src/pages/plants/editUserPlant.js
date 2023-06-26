import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { Avatar, Button, Dialog, Portal } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../services/appContext';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../theme/colors';
import { FieldComponent } from '../../components/formComponents/fieldComponent';



export const EditUserPlant = ({ route, navigation }) => {
	const { plant } = route.params;
	const [updatedPlant, setUpdatedPlant] = useState(plant);
	const { db } = useContext(AppContext);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const updateDb = () => {
		const updatedUserPlant = { plantName: updatedPlant.plantName };
		updateDoc(doc(db, 'userPlants', plant.id), updatedUserPlant).then(() => {
			navigation.navigate('UserPlantDetail', { plant: updatedPlant });
		});

	};

	const deleteUserPlant = () => {
		deleteDoc(doc(db, 'userPlants', plant.id)).then(() => {
			navigation.pop(2);
		});
		setShowDeleteConfirmation(false);
	};



	const updateField = (updatedValue, fieldName) => {

		let asdasd = updatedPlant;
		asdasd[fieldName] = updatedValue;
		setUpdatedPlant(asdasd);
	};


	return (


		<SafeAreaWrapper>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<TouchableOpacity onPress={() => updateDb()} style={{}}>
					<Avatar.Icon icon="close" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: theme.colors.transparent }} />
				</TouchableOpacity>

			</View>
			<View style={{ marginHorizontal: 10 }}>
				<FieldComponent fieldName='Custom Plant Name' fieldValue={plant.plantName} fieldType='Text' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'plantName')} />


			</View>

			<ScrollView>

			</ScrollView>

			<Button mode='contained' style={{ marginBottom: 20, backgroundColor: colors.redDelete }} onPress={() => setShowDeleteConfirmation(true)}>Delete</Button>
			<Portal>
				<Dialog visible={showDeleteConfirmation} onDismiss={() => setShowDeleteConfirmation(false)}>
					<Dialog.Title>Alert</Dialog.Title>
					<Dialog.Content>
						<Text >Are you sure you want to delete?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => deleteUserPlant()}>Yes</Button>
						<Button onPress={() => setShowDeleteConfirmation(false)}>No</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>


		</SafeAreaWrapper>

	);
};

