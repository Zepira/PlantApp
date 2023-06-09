import React, { useContext, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../services/authentication/authentication.context';




export const CameraScreen = () => {

	const [type, setType] = useState(CameraType.back);
	const [permission] = Camera.useCameraPermissions();
	const cameraRef = useRef();
	const { user } = useContext(AuthenticationContext);

	// useEffect(() => {
	// 	(async () => {
	// 		const { status } = await Camera.requestCameraPermissionsAsync();
	// 	});
	// }, []);

	if (!permission) { return <View />; }

	if (!permission.granted) {
		return <Text>No permission</Text>;

	}

	function toggleCameraType() {
		setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	const snap = async () => {
		if (cameraRef) {
			const photo = await cameraRef.current.takePictureAsync();
			AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
		}
	};



	return (<SafeAreaWrapper >
		<TouchableOpacity onPress={snap}>
			<Camera type={type} style={{ width: '100%', height: '100%' }} ref={(camera) => (cameraRef.current = camera)}>
				<View>
					<TouchableOpacity onPress={toggleCameraType}>
						<Text >Flip Camera</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</TouchableOpacity>
	</SafeAreaWrapper>);
};