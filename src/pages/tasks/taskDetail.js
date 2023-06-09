import React from 'react';
import { View, Image, Pressable, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import BackroundImage from '../../../assets/background.jpg';


export const TasksDetail = ({ navigation }) => {
	return (<View style={{ flex: 1 }}>

		<Image source={BackroundImage} style={{ height: 200, marginBottom: -200, resizeMode: 'cover', width: '100%' }} />
		<SafeAreaWrapper style={{ backgroundColor: 'transparent' }}>
			<Pressable onPress={() => navigation.navigate('HomeScreen')}>
				<Avatar.Icon icon="close" size={24} />
			</Pressable>
			<Button icon="close" mode="contained" onPress={() => navigation.navigate('HomeScreen')} style={{ height: 24, width: 24 }} />
			<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
				<Avatar.Icon icon="close" size={24} color='white' style={{ backgroundColor: 'rgba(255,255,255, 0.5)' }} />
			</TouchableOpacity>


		</SafeAreaWrapper>


	</View>);
};