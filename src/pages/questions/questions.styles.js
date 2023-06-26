import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../../theme';


export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../assets/background.jpg'),
})`
  flex: 1;
  justify-content: center;
`;

export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    backgroundColor: rgba(0,0,0,0.6);
   
`;


export const AccountContainer = styled.View`
    flex:1;
    backgroundColor: rgba(255,255,255,0.85);
  
    align-items: center;
  
`;

export const FieldsContainer = styled.View`
    width: 100%;
    margin: 20px;
`;

export const PrimaryButton = styled(TouchableOpacity)`
    backgroundColor: ${theme.colors.darkGreen};
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
    borderColor: ${theme.colors.darkGreen}; 
    borderWidth: 3px;
    borderRadius: 14px;
    height: 48px;
    marginBottom: 15px;
  `;

export const InputField = styled(TextInput).attrs({
  selectionColor: theme.colors.darkGreen,
  activeUnderlineColor: theme.colors.darkGreen,
  underlineColor: theme.colors.darkGreen,
  textColor: 'black',
  autoCapitalize: 'none'
})`
    backgroundColor: white;
  
    height: 48px;
  
   
    marginBottom: 20px;

  `;
