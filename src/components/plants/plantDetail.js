import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground, Image, Pressable, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { SafeAreaWrapper } from '../safeAreaWrapper/safeAreaWrapper';
import { colours } from '../../theme/colours';
import { Text } from '../../components/theme/text.component';




export const PlantsDetail = ({ route, navigation }) => {
    const data = route.params;
    console.log(data.images[0]);
    const asdasd = "../../../assets/calendula.jpg";
    return (

        <ImageBackground source={require(asdasd)} style={{ height: 300, resizeMode: "cover", width: "100%", flex: 1, backgroundColor: colours.plantaBackgroundGrey }} >
            <SafeAreaWrapper style={{ backgroundColor: 'transparent', flex: 1 }}>

                <TouchableOpacity onPress={() => navigation.navigate("Plants")} style={{ position: 'absolute', top: 0, right: 10, }}>
                    <Avatar.Icon icon="close" size={24} color='white' style={{ backgroundColor: colours.menuLightGreen }} />
                </TouchableOpacity>
                <View style={{ marginTop: 270, marginHorizontal: 10 }}>
                    <Text variant="title">{data.plantName}</Text>
                </View>


            </SafeAreaWrapper>
        </ImageBackground>


    );
}