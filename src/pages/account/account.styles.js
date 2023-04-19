import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { theme } from "../../theme";


export const AccountBackground = styled.ImageBackground.attrs({
    source: require("../../../assets/background.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    backgroundColor: rgba(0,0,0,0.6);
   
`;


export const AccountContainer = styled.View`
    position: absolute;
    bottom:0;
    backgroundColor: rgba(255,255,255,0.85);
    width: 100%;
    height: 75%;
    borderTopRightRadius: 45px;
    borderTopLeftRadius: 45px;
    align-items: center;
    paddingHorizontal: 35px;
    paddingTop:20px;
`;

export const FieldsContainer = styled.View`
    width: 100%;
    marginTop: 20px;
`;

export const PrimaryButton = styled(TouchableOpacity)`
    backgroundColor: ${theme.colours.darkGreen};
    alignItems: center;
    justifyContent: center;
    borderRadius: 14px;
    height: 48px;
    marginBottom: 20px;
    marginTop: 20px;
`;

export const SecondaryButton = styled(TouchableOpacity)`
    backgroundColor: transparent;
    alignItems: center;
    justifyContent: center;
    borderColor: ${theme.colours.darkGreen}; 
    borderWidth: 3px;
    borderRadius: 14px;
    height: 48px;
    marginBottom: 15px;
  `;

export const InputField = styled(TextInput).attrs({
    selectionColor: theme.colours.darkGreen,
    activeUnderlineColor: theme.colours.darkGreen,
    underlineColor: theme.colours.darkGreen,
    textColor: 'black',
    autoCapitalize: 'none'
})`
    backgroundColor: white;
  
    height: 48px;
  
   
    marginBottom: 20px;
    fontFamily:${theme.fonts.quicksandRegular};
  `
