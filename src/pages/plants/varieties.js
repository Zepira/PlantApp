import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, theme } from '../../theme';
import { Avatar } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';


export const VarietiesScreen = ({ route, navigation }) => {
    const plant = route.params;

    return (<SafeAreaWrapper>
        {plant.varieties && plant.varieties.map((variety, index) =>
            <Pressable key={index}
                onPress={() => navigation.navigate('PlantDetail', { plant: plant, selectedVarietyIndex: index })}
            >
                <View style={{ flex: 0, flexDirection: 'row' }}>
                    <Avatar.Image size={60} source={{ uri: variety.images[0] }} style={{ backgroundColor: theme.colors.plantaDarkGreen }} />
                    <Text>
                        {variety.varietyName}
                    </Text>
                </View>
            </Pressable>)}
    </SafeAreaWrapper>);

};