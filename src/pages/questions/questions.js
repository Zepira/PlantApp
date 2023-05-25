import React, { useContext, useEffect, useState } from 'react';
import { Text } from '../../theme';
import { View } from 'react-native';
import { AccountBackground, AccountContainer, PrimaryButton } from './questions.styles';
import { FormComponent } from '../../components/formComponents/formComponent';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { doc, setDoc } from 'firebase/firestore';
import { AppContext } from '../../services/appContext';



export const QuestionScreen = () => {

	const [percentageFormComplete, setPercentageFormComplete] = useState(0.1);
	const [formProgress, setFormProgress] = useState(0);
	const { onCompleteEntryQuestions, user } = useContext(AuthenticationContext);
	const { db } = useContext(AppContext);
	const [userResponse, setUserResponse] = useState({});

	useEffect(() => {
		const questionaireLength = questionaireData.length;
		const progress = (formProgress + 1) / (questionaireLength);
		setPercentageFormComplete(progress);


	}, [formProgress, setPercentageFormComplete, percentageFormComplete]);


	// useEffect(() => {
	//     const imageRef = ref(storage, plant.images[0]);
	//     getDownloadURL(imageRef)
	//         .then((url) => {
	//             setImageUrl(url);
	//             plant.imageUrl = url;
	//         })
	//         .catch((e) => console.log('Errors while downloading => ', e));
	// }, [setImageUrl]);




	// const progressForm = (direction) => {

	// 	if (direction === 'forward') {

	// 		if (formProgress < questionaireData.length - 1) {
	// 			setFormProgress(formProgress + 1);
	// 		} else {
	// 			setDoc(doc(db, 'users', user.uid), userResponse, { merge: true });
	// 			onCompleteEntryQuestions();
	// 		}
	// 	}
	// 	else {
	// 		setFormProgress(formProgress - 1);
	// 	}
	// };

	// const updateFormValue = (value) => {
	// 	setUserResponse({ ...userResponse, [questionaireData[formProgress].databaseValue]: value });
	// };

	const questionaireData = [
		{
			index: 0,
			questionText: 'How much help do you need?',
			databaseValue: 'support',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Teach me everything!',
				optionMapping: 1,
				optionDetail: 'yo dad'
			}, {
				optionText: 'I need a little help',
				optionMapping: 2,
				optionDetail: 'wassup'
			}, {
				optionText: 'Take me to the app!',
				optionMapping: 3,
				optionDetail: 'If you are new to gardening, we recommend this option.You’ll receive notifications for planting, harvesting, watering etc as well as helpful garden tips and seasonal suggestions'
			}]
		},
		{
			index: 1,
			questionText: 'How much space do you have?',
			databaseValue: 'space',
			questionSubText: 'You can get started with any amount of space, but this will help us optimise your garden for space',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Balcony',
				optionMapping: 1,
				optionDetail: ''
			}, {
				optionText: 'Small garden',
				optionMapping: 2,
				optionDetail: ''
			},
			{
				optionText: 'Backyard',
				optionMapping: 3,
				optionDetail: ''
			},
			{
				optionText: 'Acreage',
				optionMapping: 4,
				optionDetail: ''
			}]
		},
		{
			index: 2,
			questionText: 'Do you have an existing garden?',
			databaseValue: 'existingGarden',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'no',
				optionMapping: 1,
				optionDetail: ''
			}, {
				optionText: 'yes',
				optionMapping: 2,
				optionDetail: ''
			}]
		},
		{
			index: 3,
			questionText: 'How do you want to start?',
			databaseValue: 'startingPlan',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Start small & easy',
				optionMapping: 1,
				optionDetail: 'Start small is the recommended option. Permaculture is all about observing and making small changes. This is the low risk, low maintenance option. We won’t stop you growing anything, but recommendations will be tailored to this choice.'
			}, {
				optionText: 'I want to grow EVERYTHING!!!',
				optionMapping: 2,
				optionDetail: 'Grow everything means we’ll do our best to teach you to grow most of what you eat, but the results will likely match how much gardening experience you have. But there’s no faster way to learn than by doing, so don’t let that stop you!'
			},
			{
				optionText: 'Somewhere in the middle',
				optionMapping: 3,
				optionDetail: ''
			}]
		}
	];

	return (
		<AccountBackground >

			<AccountContainer style={{ paddingTop: 40 }}>
				<Text variant="title" style={{ paddingHorizontal: 50, textAlign: 'center' }} >Welcome to PlantKeeper</Text>

				<View key={questionaireData[formProgress].index} style={{ alignItems: 'center' }}>
					<Text variant="label" style={{ textAlign: 'center', paddingHorizontal: 50, marginTop: 20 }}>We need to check a few things before we get started!</Text>


					<FormComponent variant={questionaireData[formProgress].questionType} data={questionaireData[formProgress].options} updateFormValue={updateFormValue} />
				</View>



			</AccountContainer>
		</AccountBackground >

	);
};