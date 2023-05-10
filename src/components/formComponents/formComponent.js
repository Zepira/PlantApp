import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton, IconButton, Button, Dialog, Portal } from 'react-native-paper';
import { colors } from '../../theme/colors';


export const FormComponent = ({ variant, data, updateFormValue }) => {
	const [value, setValue] = useState();
	const [dialogVisible, setSialogVisible] = useState(false);
	const [dialogText, setDialogText] = useState('');


	return (
		<View style={{ flex: 1 }}>
			<RadioButton.Group onValueChange={newValue => { setValue(newValue); updateFormValue(newValue); }} value={value} style={{ flex: 1, }}>
				{data.map((option) => <View key={option.optionMapping} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<Text>{option.optionText}</Text>
						{option.optionDetail !== '' && <IconButton icon="information-outline" onPress={() => {
							setDialogText(option.optionDetail);
							setSialogVisible(true);
						}} />}

					</View>
					<RadioButton value={option.optionMapping} color={colors.plantKeeperMidGreen} status={option.optionMapping === value ? 'checked' : 'unchecked'} />

				</View>)}
			</RadioButton.Group>
			<Portal>
				<Dialog visible={dialogVisible} onDismiss={() => setSialogVisible(false)}>

					<Dialog.Content>
						<Text variant="body">{dialogText}</Text>
					</Dialog.Content>
					<Dialog.Actions style={{ color: 'black' }}>
						<Button style={{ color: 'black' }} onPress={() => setSialogVisible(false)}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>

	);

};


