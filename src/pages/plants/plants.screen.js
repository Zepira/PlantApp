import React, { useContext, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/safeAreaWrapper/safeAreaWrapper";
import { Avatar, Text } from "react-native-paper";
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Pressable, View } from "react-native";


export const PlantsScreen = ({ navigation }) => {

    const { db } = useContext(AuthenticationContext);
    const [plantData, setPlantData] = useState(null);


    //https://firebase.google.com/docs/reference/js/v8/firebase.firestore.FirestoreDataConverter
    useEffect(() => {
        const docRef = query(collection(db, "plants"));
        getDocs(docRef)
            .then((something) => {
                const docs = something.docs.map((f) => f.data())
                console.log(docs);
                setPlantData(docs)
            }
            );

    }, [db]);

    const PlantComponent = ({ data, index }) =>
        <Pressable key={index} style={{ flexDirection: 'row', paddingTop: 10, width: '100%' }} onPress={() => navigation.navigate("PlantDetail", data)}>
            <Avatar.Image size={50} source={require('../../../assets/vegetable-garden.jpg')} />

            <Text>{data.plantName}</Text>
        </Pressable>


    return (<SafeAreaWrapper>
        <Text>Plants</Text>
        {plantData && plantData.map((plant, index) => <PlantComponent data={plant} index={index} />)}

    </SafeAreaWrapper>);
}