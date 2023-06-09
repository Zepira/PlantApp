import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { SafeAreaWrapper } from '../../components/safeAreaWrapper/safeAreaWrapper';

export const SettingPage = () => {

	const { onCompleteEntryQuestions, onLogOut } = useContext(AuthenticationContext);

	return (
		<SafeAreaWrapper>
			<Button style={{ backgroundColor: 'green' }} onPress={() => onCompleteEntryQuestions()}>Go to questions</Button>
			<Button style={{ backgroundColor: 'green' }} onPress={() => { onLogOut(), onCompleteEntryQuestions(); }}>Logout</Button>
		</SafeAreaWrapper>
	);
};