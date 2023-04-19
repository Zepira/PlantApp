import React, { useContext, useRef, useState } from "react";
import { AccountBackground, AccountCover, AccountContainer, PrimaryButton, SecondaryButton, InputField, FieldsContainer } from "./account.styles";
import { Text } from "../../components/theme/text.component";
import { theme } from "../../theme";
import { TouchableOpacity, View, TextInput } from "react-native";
import { Pressable } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import LottieView from 'lottie-react-native';



export const AccountScreen = () => {
    const [hasExistingAccount, setHasExistingAccount] = useState(true);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const { onLogin, error } = useContext(AuthenticationContext);
    const animation = useRef(null);

    const submit = () => {
        if (hasExistingAccount) {
            onLogin(emailAddress, password);
        }
    }

    return (
        <AccountBackground >

            <AccountCover />
            <View style={{ position: 'absolute', top: '8%' }}>
                <LottieView
                    autoPlay
                    style={{ height: 140 }}
                    key="animation"
                    source={require('../../../assets/plant-item.json')}
                />
            </View>
            <AccountContainer>
                <Text variant="title" style={{ paddingHorizontal: 50, textAlign: 'center' }} >{hasExistingAccount ? "Welcome to PlantKeeper" : "Create an acount"}</Text>
                <FieldsContainer>
                    <InputField
                        label="Email"
                        value={emailAddress}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        onChangeText={(u) => setEmailAddress(u)}
                    />
                    <InputField
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        onChangeText={(p) => setPassword(p)}
                    />
                    {error &&
                        <View style={{ marginBottom: -15, marginTop: -15, paddingLeft: 15 }}>
                            <Text variant="error">{error}
                            </Text>
                        </View>
                    }
                    <PrimaryButton title="Sign In" onPress={() => submit(emailAddress, password)}>
                        <Text variant="button" style={{ color: 'white' }}>{hasExistingAccount ? "Sign In" : "Sign Up"}</Text>
                    </PrimaryButton>
                    <SecondaryButton onPress={() => setHasExistingAccount(!hasExistingAccount)}>
                        <Text variant="button" style={{ color: `${theme.colours.darkGreen}` }}>{hasExistingAccount ? "Create an account" : "I already have an account"}</Text>
                    </SecondaryButton>
                    {hasExistingAccount && <Pressable style={{ alignItems: 'center' }}>
                        <Text variant="label" >Forgot your password?</Text>
                    </Pressable>}
                </FieldsContainer>
            </AccountContainer>
        </AccountBackground>
    );

}