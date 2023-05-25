import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "../../theme";
import { SafeAreaWrapper } from "../../components/safeAreaWrapper/safeAreaWrapper";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../../theme/colors";
import { FormComponent } from "../../components/formComponents/formComponent";
import { validatePathConfig } from "@react-navigation/native";
import { addDoc, arrayUnion, doc, setDoc, updateDoc, collection } from "firebase/firestore";
import { AppContext } from "../../services/appContext";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { GARDEN_TYPE } from "../../utils/constants";


export const AddGardenScreen = ({ navigation }) => {

    const { db } = useContext(AppContext);
    const { user } = useContext(AuthenticationContext);

    const newGardenQuestions = [
        {
            index: 0,
            questionText: 'How much sun does this spot get?',
            databaseValue: 'lighting',
            questionSubText: '',
            questionType: 'radioGroup',
            options: [{
                optionText: 'Dark',
                optionMapping: 1,
                optionDetail: '0 hours of sunlight, such as a windowless room'
            }, {
                optionText: 'Shade',
                optionMapping: 2,
                optionDetail: 'Far away from a window, or with a lot of sunlight blocked'
            },
            {
                optionText: 'Part sun, part shade',
                optionMapping: 3,
                optionDetail: 'Dappled sun throught the day'
            },
            {
                optionText: 'Full sun',
                optionMapping: 4,
                optionDetail: 'At least 8h of full sun'
            }]
        },
        {
            index: 1,
            questionText: 'What would you like to call your garden?',
            databaseValue: 'gardenName',
            questionSubText: '',
            questionType: 'textInput',
            fieldValue: ''

        },
        {
            index: 2,
            questionText: 'What type of garden is it?',
            databaseValue: 'gardenType',
            questionSubText: '',
            questionType: 'select',
            options: GARDEN_TYPE
        },

        {
            index: 3,
            questionText: 'What is the length of the garden bed? (cm)',
            databaseValue: 'gardenBedLength',
            questionSubText: '',
            questionType: 'textInput',
            value: ''

        },
        {
            index: 4,
            questionText: 'What is the width of the garden bed? (cm)',
            databaseValue: 'gardenBedWidth',
            questionSubText: '',
            questionType: 'textInput'

        },
        {
            index: 5,
            questionText: 'Does it have automated watering set up?',
            databaseValue: 'automatedWatering',
            questionSubText: '',
            questionType: 'radioGroup',
            options: [{
                optionText: 'Yes',
                optionMapping: true,
            },
            {
                optionText: 'No',
                optionMapping: false,
            }],
        },
    ];

    const onFormComplete = (completedData) => {
        completedData.user = user.uid;
        //updateDoc(doc(db, 'users', `${user.uid}`), { userGardens: arrayUnion(completedData) }, { merge: true });
        addDoc(collection(db, 'userGardens'), completedData);
        navigation.navigate('HomeScreen', { setHomeToggle: 'myGarden' });
    };

    return (
        <SafeAreaWrapper>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                <Avatar.Icon icon="close" size={40} color={colors.plantKeeperMidGreen} style={{ backgroundColor: colors.transparent }} />
            </TouchableOpacity>
            <Text variant="h1">Add a garden</Text>
            <FormComponent data={newGardenQuestions} onCompleteForm={(completedData) => onFormComplete(completedData)} />

        </SafeAreaWrapper>
    );
}