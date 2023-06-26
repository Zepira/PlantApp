import React, { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { NavigationContainer } from '@react-navigation/native';
import { QuestionaireNavigator } from './questionaire.navigator';



export const Navigation = () => {
	const { isAuthenticated, hasCompletedEntryQuestions } = useContext(AuthenticationContext);

	const questionaireData = [
		{
			index: 0,
			questionText: 'How much help do you need?',
			databaseValue: 'support',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Teach me everything!',
				optionMapping: 1,
				optionDetail: 'yo dad'
			}, {
				optionText: 'I need a little help',
				optionMapping: 2,
				optionDetail: 'wassup'
			}, {
				optionText: 'Take me to the app!',
				optionMapping: 3,
				optionDetail: 'If you are new to gardening, we recommend this option.You’ll receive notifications for planting, harvesting, watering etc as well as helpful garden tips and seasonal suggestions'
			}]
		},
		{
			index: 1,
			questionText: 'How much space do you have?',
			databaseValue: 'space',
			questionSubText: 'You can get started with any amount of space, but this will help us optimise your garden for space',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Balcony',
				optionMapping: 1,
				optionDetail: ''
			}, {
				optionText: 'Small garden',
				optionMapping: 2,
				optionDetail: ''
			},
			{
				optionText: 'Backyard',
				optionMapping: 3,
				optionDetail: ''
			},
			{
				optionText: 'Acreage',
				optionMapping: 4,
				optionDetail: ''
			}]
		},
		{
			index: 2,
			questionText: 'Do you have an existing garden?',
			databaseValue: 'existingGarden',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'no',
				optionMapping: 1,
				optionDetail: ''
			}, {
				optionText: 'yes',
				optionMapping: 2,
				optionDetail: ''
			}]
		},
		{
			index: 3,
			questionText: 'How do you want to start?',
			databaseValue: 'startingPlan',
			questionSubText: 'This will help us determine how many tips, reminders and suggestions you want to get (you can change this any time)',
			questionType: 'radioGroup',
			options: [{
				optionText: 'Start small & easy',
				optionMapping: 1,
				optionDetail: 'Start small is the recommended option. Permaculture is all about observing and making small changes. This is the low risk, low maintenance option. We won’t stop you growing anything, but recommendations will be tailored to this choice.'
			}, {
				optionText: 'I want to grow EVERYTHING!!!',
				optionMapping: 2,
				optionDetail: 'Grow everything means we’ll do our best to teach you to grow most of what you eat, but the results will likely match how much gardening experience you have. But there’s no faster way to learn than by doing, so don’t let that stop you!'
			},
			{
				optionText: 'Somewhere in the middle',
				optionMapping: 3,
				optionDetail: ''
			}]
		}
	];

	useEffect(() => {

	}, [hasCompletedEntryQuestions]);

	return (<NavigationContainer>
		{isAuthenticated ? <>
			{hasCompletedEntryQuestions ?
				<AppNavigator /> :
				<QuestionaireNavigator data={questionaireData} />
			}
		</> :
			<AccountNavigator />
		}
	</NavigationContainer>);

};