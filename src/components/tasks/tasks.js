import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, RadioButton } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import { WeatherContext, WeatherContextProvider } from '../../services/weather/weather.context';
import { fetchWeather, WeatherService } from '../../services/weather/weather.service';
import { colours } from '../../theme/colours';


export const TasksList = ({ navigation }) => {

    return (
        <>
            {tasksData.map((task, index) => <Card style={{ marginTop: 20, marginHorizontal: 20, backgroundColor: 'white' }} mode="contained" key={index}>
                <Card.Title title={task.taskName} />
                <Card.Content>
                    {task.gardens.map((gardenTask, index) =>
                        <View key={index}>
                            <Tasks gardenTasks={gardenTask} navigation={navigation} />
                        </View>
                    )}

                    <Text style={{ fontSize: 10, color: 'grey', marginTop: 10, alignSelf: 'center' }}>Complete the tasks above or tap for instructions</Text>
                </Card.Content>


            </Card>)}
        </>
    );
};

const Tasks = ({ gardenTasks, navigation }) => {
    const [checked, setChecked] = useState('');

    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
            onPress={() => navigation.navigate("TaskDetail", params = {})}>
            <Avatar.Image size={50} source={gardenTasks.gardenImage} />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, flexDirection: 'column' }}>
                <Text variant="bodySmall">{gardenTasks.gardenName}</Text>
                <Text variant="bodySmall" style={{ color: colours.ashGray }}>{gardenTasks.plants.join([separator = ', '])}</Text>
            </View>
            <View style={{ flex: 0 }}>
                <RadioButton.Android
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => { checked === 'first' ? setChecked('') : setChecked('first') }}
                    color={colours.plantaLightGreen}
                />
            </View>

        </TouchableOpacity>);
};



const tasksData = [
    {
        "taskName": "Water",
        "gardens": [{
            "gardenName": "Veggie Patch",
            "gardenImage": require('../../../assets/vegetable-garden.jpg'),
            "plants": ["Parsley", "Rosemary", "Carrots", "Strawberries", "Potato"
            ],
            "completed": false
        },
        {
            "gardenName": "Balcony Pots",
            "gardenImage": require('../../../assets/pot-garden.jpg'),
            "plants": ["Calendula",
                "Mint"
            ],
            "completed": false
        }]
    },
    {
        "taskName": "Fertilise",
        "gardens": [{
            "gardenName": "Veggie Patch",
            "gardenImage": require('../../../assets/vegetable-garden.jpg'),
            "plants": [
                "Parsley", "Rosemary", "Carrots",
            ],
            "completed": false
        },
        {
            "gardenName": "Balcony Pots",
            "gardenImage": require('../../../assets/pot-garden.jpg'),
            "plants": [
                "Calendula",
                "Mint",
            ],
            "completed": false
        }]
    }
]
