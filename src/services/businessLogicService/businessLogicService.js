import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import { FieldPath, Firestore, collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { Alert, Modal } from 'react-native';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from '../../theme';


export const UserNotifications = (userData, db) => {

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    if (userData?.plantFavourites) {

        const q = query(collection(db, 'plants'), where(documentId(), 'in', userData.plantFavourites));
        getDocs(q).then((querySnapshot) => {

            //const docs = querySnapshot.docs.map((f) => ({ ...f.data(), ...{ id: f.id } }));

            querySnapshot.forEach((plant) => {
                const plantData = plant.data();

                let firstSowDate = null;

                const sowingDatesIndex = plantData.sowingDates.findIndex(x => x.climateZone === userData.climateZone);

                plantData.sowingDates[sowingDatesIndex].sowingDates.forEach((sowingDate) => {

                    if (!firstSowDate || sowingDate.toDate() < firstSowDate)
                        firstSowDate = sowingDate;
                });

                firstSowDate = firstSowDate.toDate();

                const today = new Date();
                if (firstSowDate < today)
                    firstSowDate.setFullYear(firstSowDate.getFullYear() + 1);

                const daysTillSow = Math.floor((firstSowDate - today) / (1000 * 60 * 60 * 24));

                setShowModal(true);
                setModalContent(`its nearly time to plant ${plant.plantName}, do you want to create a task for this?`);
                if (daysTillSow <= 14) {
                    //Time to prepare for sowing!
                }
            });
        });
    }

    const createTask = () => {


    };



    return (
        <View >
            <Modal

                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setShowModal(false);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 35,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Text >Hello World!</Text>
                        <Pressable
                            onPress={() => setShowModal(false)}
                        >
                            <Text >{'No, I\'m good'}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setShowModal(false)}
                        >
                            <Text >{'No, I\'m good'}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setShowModal(false)}
                        >
                            <Text >{'No, I\'m good'}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    );



};