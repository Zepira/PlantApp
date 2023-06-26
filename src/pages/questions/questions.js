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



export const QuestionScreen = ({ data, onCompleteForm }) => {

	const [percentageFormComplete, setPercentageFormComplete] = useState(0.1);
	const [formProgress, setFormProgress] = useState(0);
	//const { onCompleteEntryQuestions, user } = useContext(AuthenticationContext);
	//const { db } = useContext(AppContext);
	const [userResponse, setUserResponse] = useState({});

	useEffect(() => {
		const questionaireLength = data ? data.length : 0;
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

	const updateFormValue = (value) => {
		setUserResponse({ ...userResponse, [data[formProgress].databaseValue]: value });
	};


	return (
		<AccountBackground >

			<AccountContainer style={{ paddingTop: 40 }}>
				{/* <Text variant="title" style={{ paddingHorizontal: 50, textAlign: 'center' }} >Welcome to PlantKeeper</Text> */}

				{/* <View style={{ flex: 1 }}> */}
				{/* <Text variant="label" style={{ textAlign: 'center', paddingHorizontal: 50, marginTop: 20 }}>We need to check a few things before we get started!</Text> */}

				{data &&
					<FormComponent data={data} onCompleteForm={(completedData) => onCompleteForm(completedData)} />
				}
				{/* </View> */}



			</AccountContainer>
		</AccountBackground >

	);
};