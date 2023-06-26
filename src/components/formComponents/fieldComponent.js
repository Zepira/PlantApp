import React, { useState } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import { Avatar, Modal, Portal, Switch, TextInput } from 'react-native-paper';
import { Text, theme } from '../../theme';
import { colors } from '../../theme/colors';


export const FieldComponent = ({ fieldName, fieldValue, fieldType, updateField, selectList }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(fieldValue);
    const [isEditMode, setIsEditMode] = useState(false);
    const [fieldInputValue, setFieldInputValue] = useState(fieldValue ? fieldValue.toString() : '');
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [selectValue, setSelectValue] = useState(fieldValue);

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 5 }}>
            <Text>{fieldName}: </Text>
            {fieldType === 'Boolean' ?
                <Switch value={isSwitchOn} onValueChange={() => { setIsSwitchOn(!isSwitchOn); updateField(!isSwitchOn); }} /> :
                <>
                    {(isEditMode && fieldType === 'Text') &&
                        <>
                            <TextInput value={fieldInputValue} onChange={val => setFieldInputValue(val.nativeEvent.text)}></TextInput>
                            <TouchableOpacity onPress={() => { setIsEditMode(false); updateField(fieldType === 'Number' ? Number(fieldInputValue) : fieldInputValue); }} >
                                <Avatar.Icon icon="floppy" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: theme.colors.transparent }} />
                            </TouchableOpacity>
                        </>
                    }
                    {(isEditMode && fieldType === 'Select') &&
                        <>
                            <Text style={{ flex: 0 }}>{selectList[selectValue].optionText}</Text>

                        </>
                    }
                    {!isEditMode &&
                        <>
                            {fieldType === 'Select' ?
                                <Text style={{ flex: 0 }}>{selectList[selectValue].optionText}</Text>
                                : <Text style={{ flex: 0 }}>{fieldInputValue ? fieldInputValue : fieldValue}</Text>
                            }
                            <TouchableOpacity onPress={() => {
                                setIsEditMode(true);
                                if (fieldType === 'Select') {
                                    setShowSelectModal(true);
                                }
                            }} >
                                <Avatar.Icon icon="lead-pencil" size={30} color={colors.plantKeeperDarkestGreen} style={{ backgroundColor: theme.colors.transparent }} />
                            </TouchableOpacity>
                        </>

                    }
                </>
            }
            {/* Select popup */}
            <Portal>
                <Modal visible={showSelectModal} onDismiss={() => { setShowSelectModal(false); setIsEditMode(false); }} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
                    <Text>Which garden do you want to plant in?</Text>
                    {selectList && selectList.map((selectOption, index) => <Pressable key={index} onPress={() => { updateField(selectOption.optionMapping); setShowSelectModal(false); setSelectValue(selectOption.optionMapping); }}>
                        <Text>
                            {selectOption.optionText}
                        </Text>
                    </Pressable>)}

                </Modal>
            </Portal>

        </View>);
};