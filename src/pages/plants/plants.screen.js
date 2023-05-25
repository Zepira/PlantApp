import React, { useContext, useEffect, useState } from "react";
import { SafeAreaWrapper, SafeAreaWrapperFullWidth } from "../../components/safeAreaWrapper/safeAreaWrapper";
import { Avatar, Chip, IconButton, Searchbar } from "react-native-paper";
import { getFirestore, collection, getDocs, doc, getDoc, query, setDoc } from "firebase/firestore";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Pressable, ScrollView, View } from "react-native";
import { AppContext } from "../../services/appContext";
import { PlantList } from "../../components/plants/plants";
import { Text } from "../../theme";
import { colors } from '../../theme/colors';



export const PlantsScreen = ({ navigation }) => {


    const [filters, setFilters] = useState([
        {
            filterName: 'Plant now',
            selected: true
        },
        {
            filterName: 'Edible',
            selected: false
        },
        {
            filterName: 'Flower',
            selected: false
        },
        {
            filterName: 'Begginer friendly',
            selected: false
        }
    ]);

    const updateFilters = (filter) => {
        filter.selected = !filter.selected;
        setFilters([...filters, filter]);
        //TODO - make the filters do somethjing
    };

    return (<SafeAreaWrapperFullWidth>
        <View style={{ marginHorizontal: 15 }}>
            <Text variant="h1" >Browse for Plants</Text>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Searchbar style={{ flex: 2, marginRight: 10 }} />
                <IconButton icon='filter' containerColor={colors.plantKeeperLightGreen} iconColor={colors.plantKeeperDarkestGreen} size={40} />

            </View>
        </View>

        <View style={{ height: 30, marginLeft: 15, marginTop: 10, marginBottom: 20 }}>
            <ScrollView horizontal >


                {filters.map((filter, index) =>
                    <Pressable key={index}
                        style={{
                            borderRadius: 40,
                            marginRight: 10,
                            backgroundColor: filter.selected ? colors.plantKeeperMidGreen : colors.transparent,
                            borderWidth: 2,
                            borderColor: colors.plantKeeperMidGreen,
                            justifyContent: 'center',
                            paddingHorizontal: 10

                        }}
                        onPress={() => updateFilters(filter)}
                    >
                        <Text style={{ color: filter.selected ? 'white' : colors.plantKeeperMidGreen, }}>
                            {filter.filterName}
                        </Text>
                    </Pressable>
                )}
            </ScrollView>
        </View>


        <PlantList navigation={navigation} />

    </SafeAreaWrapperFullWidth>);
}