import React, { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { NavigationContainer } from '@react-navigation/native';
import { QuestionaireNavigator } from './questionaire.navigator';



export const Navigation = () => {
	const { isAuthenticated, hasCompletedEntryQuestions } = useContext(AuthenticationContext);

	useEffect(() => {

	}, [hasCompletedEntryQuestions]);

	return (<NavigationContainer>
		{isAuthenticated ? <>
			{hasCompletedEntryQuestions ?
				<AppNavigator /> :
				<QuestionaireNavigator />
			}
		</> :
			<AccountNavigator />
		}
	</NavigationContainer>);

};