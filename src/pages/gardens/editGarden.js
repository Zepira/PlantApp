import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Dialog, Portal } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { Text, theme } from '../../theme';
import { GARDEN_TYPE, LIGHTING } from '../../utils/constants';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AppContext } from '../../services/appContext';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../theme/colors';
import { FieldComponent } from '../../components/formComponents/fieldComponent';



export const EditGarden = ({ route, navigation }) => {
	const { garden } = route.params;
	const [updatedGarden, setUpdatedGarden] = useState(garden);
	const { db } = useContext(AppContext);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const updateDb = () => {
		updateDoc(doc(db, 'userGardens', garden.id), updatedGarden).then(() => {
			navigation.navigate('GardenDetail', { garden: updatedGarden });
		});

	};

	const deleteGarden = () => {
		deleteDoc(doc(db, 'userGardens', garden.id)).then(() => {
			navigation.navigate('HomeScreen', { setHomeToggle: 'myGarden' });
		});
		setShowDeleteConfirmation(false);
	};



	const updateField = (updatedValue, fieldName) => {

		let asdasd = updatedGarden;
		asdasd[fieldName] = updatedValue;
		setUpdatedGarden(asdasd);
	};


	return (


		<SafeAreaWrapper>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<TouchableOpacity onPress={() => updateDb()} style={{}}>
					<Avatar.Icon icon="close" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: theme.colors.transparent }} />
				</TouchableOpacity>

			</View>
			<View style={{ marginHorizontal: 10 }}>
				<FieldComponent fieldName='Garden Name' fieldValue={garden.gardenName} fieldType='Text' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'gardenName')} />
				<FieldComponent fieldName='Garden Type' fieldValue={garden.gardenType} fieldType='Select' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'gardenType')} selectList={GARDEN_TYPE} />
				<FieldComponent fieldName='Automated Watering' fieldValue={garden.automatedWatering} fieldType='Boolean' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'automatedWatering')} />
				<FieldComponent fieldName='Lighting' fieldValue={garden.lighting} fieldType='Select' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'lighting')} selectList={LIGHTING} />
				<FieldComponent fieldName='Fertilising Frequency' fieldValue={garden.fertilisingFrequency} fieldType='Number' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'fertilisingFrequency')} />
				<FieldComponent fieldName='Watering Frequency' fieldValue={garden.wateringFrequency} fieldType='Number' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'wateringFrequency')} />
				<FieldComponent fieldName='Weeding Frequency' fieldValue={garden.weedingFrequency} fieldType='Number' updateField={(updatedFieldValue) => updateField(updatedFieldValue, 'weedingFrequency')} />

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
						<Button onPress={() => deleteGarden()}>Yes</Button>
						<Button onPress={() => setShowDeleteConfirmation(false)}>No</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>


		</SafeAreaWrapper>

	);
};

