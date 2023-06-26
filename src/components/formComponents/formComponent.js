import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { RadioButton, IconButton, Button, Dialog, Portal, ProgressBar, TextInput, Avatar } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { PrimaryButton, SecondaryButton } from './formComponent.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '../../theme/components/text.component';


export const FormComponent = ({ data, onCompleteForm }) => {
	const [value, setValue] = useState();
	const [text, setText] = useState('');
	const [formProgressDirection, setFormProgressDirection] = useState();

	const [dialogVisible, setSialogVisible] = useState(false);
	const [dialogText, setDialogText] = useState('');
	const [percentageFormComplete, setPercentageFormComplete] = useState(0.1);
	const [formProgress, setFormProgress] = useState(0);
	const [formResponse, setFormResponse] = useState({});
	const textRef = useRef('');
	const questionaireLength = data.length;

	console.log(data[0]);

	// const textToRef = (text) => {
	// 	textRef.current = text;
	// };


	useEffect(() => {

		const progress = (formProgress + 1) / (questionaireLength);
		setPercentageFormComplete(progress);






		// console.log(formProgress, data.length);
		// if (formProgress === data.length - 1) {
		// 	console.log('last q?', text);
		// 	if (data[formProgress].questionType === 'textInput') {
		// 		console.log('last text q', text);
		// 		updateFormValue(text);
		// 	}
		// 	onCompleteForm(formResponse);
		// } else {
		// 	//setText(formResponse[data[formProgress + 1].databaseValue]);
		// 	setFormProgress(formProgress + 1);
		// }
		console.log(formResponse);
		setText('');

	}, [formProgress, setPercentageFormComplete, percentageFormComplete]);

	const progressForm = (direction) => {
		console.log('alana', direction, formProgress === questionaireLength - 1);
		if (direction === 'forward') {
			if (data[formProgress].questionType === 'textInput') {
				console.log('check on last q', text);
				updateFormValue(text);
			}

			if (formProgress === questionaireLength - 1) {
				onCompleteForm(formResponse);
			} else {
				setFormProgress(formProgress + 1);
			}
		}
		else {
			setFormProgress(formProgress - 1);
		}
	};

	const updateFormValue = (updatedValue) => {
		setFormResponse({ ...formResponse, [data[formProgress].databaseValue]: updatedValue });
	};



	// const TextInputComponent = () => {
	// 	return (
	// 		<TextInput
	// 			value={textRef}
	// 			onChangeText={(text) => { textToRef(text); }}
	// 		/>);
	// };


	return (
		<View style={{ alignItems: 'center', width: '100%', height: '100%', padding: 20, }}>
			<View style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>

				<Text variant="h1" style={{ textAlign: 'center' }}>{data[formProgress].questionText}</Text>
				<Text variant="label" style={{ textAlign: 'center', marginVertical: 20 }}>{data[formProgress].questionSubText}</Text>


				{data[formProgress].questionType === 'radioGroup' && <RadioButton.Group onValueChange={newValue => { setValue(newValue); updateFormValue(newValue); }} value={value} style={{ flex: 1, }}>
					{data[formProgress].options.map((option) => <View key={option.optionMapping} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
							<Text>{option.optionText}</Text>
							{option.optionDetail !== '' && <IconButton icon="information-outline" onPress={() => {
								setDialogText(option.optionDetail);
								setSialogVisible(true);
							}} />}


						</View>
						<RadioButton.Item value={option.optionMapping} color={colors.plantKeeperMidGreen} status={option.optionMapping === value ? 'checked' : 'unchecked'} />

					</View>)}
				</RadioButton.Group>}
				{data[formProgress].questionType === 'textInput' && <TextInput
					value={text}
					onChangeText={text => setText(text)}
				/>}

				{/* For Select/ List Questions */}
				{data[formProgress].questionType === 'select' && <ScrollView>
					{data[formProgress].options.map((option) => <SelectListComponent key={option.optionText} option={option} updateFormValue={updateFormValue} />)}
				</ScrollView>}

				<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
					{/* TODO Add back button, fix issues */}
					{formProgress > 0 && < PrimaryButton onPress={() => progressForm('backwards')} style={{ flex: 1, marginRight: 10 }}>
						<Text variant="button" style={{ color: 'white' }}>Back</Text>
					</PrimaryButton>}
					<PrimaryButton onPress={() => progressForm('forward')} style={{ flex: 1 }} >
						<Text variant="button" style={{ color: 'white' }}>Next</Text>
					</PrimaryButton>


				</View>
				<ProgressBar progress={percentageFormComplete} color={colors.plantkeeperDarkGreen} style={{ borderRadius: 20, marginBottom: 30 }} />

			</View>
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
		</View >

	);

};

const SelectListComponent = ({ option, updateFormValue }) => {
	const [isSelected, setIsSelected] = useState(false);


	return (<Pressable onPress={() => { setIsSelected(!isSelected); updateFormValue(option.optionMapping); }} >
		<View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', marginBottom: 20, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: isSelected ? 'black' : 'white' }}
		>
			<Avatar.Image size={60} source={{ uri: option.optionImage }} style={{ backgroundColor: colors.plantaDarkGreen }} />

			<View style={{ flex: 1, justifyContent: 'center', marginLeft: 15 }}>
				<Text variant="body" style={{ color: colors.plantkeeperDarkGreen }}>{option.optionText}</Text>
			</View>
			<View style={{ flex: 0 }}>
			</View>

		</View>

	</Pressable>);

};






