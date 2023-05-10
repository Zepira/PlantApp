import React, { useContext, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/safeAreaWrapper/safeAreaWrapper";
import { Avatar, Text } from "react-native-paper";
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Pressable, View } from "react-native";
import { AppContext } from "../../services/appContext";
import { PlantList } from "../../components/plants/plants";


export const PlantsScreen = ({ navigation }) => {

    const { plantData } = useContext(AppContext);


    const PlantComponent = ({ data, index }) =>
        <Pressable key={index} style={{ flexDirection: 'row', paddingTop: 10, width: '100%' }} onPress={() => navigation.navigate("PlantDetail", data)}>
            <Avatar.Image size={50} source={require('../../../assets/vegetable-garden.jpg')} />

            <Text>{data.plantName}</Text>
        </Pressable>


    return (<SafeAreaWrapper>
        <Text>Plants</Text>

        <PlantList data={plantData} navigation={navigation} />

    </SafeAreaWrapper>);
}