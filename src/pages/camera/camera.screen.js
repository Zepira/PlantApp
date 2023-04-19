import React, { useState } from "react";
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';




export const CameraScreen = () => {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    // if (!permission) ...

    // if (!permission.granted) ...

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (<View >
        <Camera type={type}>
            <View>
                <TouchableOpacity onPress={toggleCameraType}>
                    <Text >Flip Camera</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    </View>)
}