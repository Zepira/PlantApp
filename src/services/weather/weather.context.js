
import React, { useState, createContext, useEffect, useContext } from 'react';
import { GetWeather } from './weather.service';
import { NotificationContext } from '../contextService/notifications/notification.context';
//import * as Location from 'expo-location';


export const WeatherContext = createContext();


export const WeatherContextProvider = ({ children }) => {
	const [weather, setWeather] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const { schedulePushNotification } = useContext(NotificationContext);

	useEffect(() => {
		//let location = await Location.getCurrentPositionAsync({});
		//console.log(location);
		if (process.env.NODE_ENV === 'development') {
			setWeather(mockWeather);
			setIsLoading(false);
		}
		else if (!weather.length) {
			GetWeather()
				.then((result) => {
					console.log('WATCH OUT!!', result);
					schedulePushNotification({
						title: 'Weather API Hit!!!',
						body: 'Lets not spend too much',
						data: { data: 'goes here' },
					});
					if (result.cod === 200) {
						setWeather(result);
						setIsLoading(false);
					} else {
						setWeather([]);
						setIsLoading(false);
						setError(err);
					}
				})
				.catch((err) => {
					setWeather([]);
					setIsLoading(false);
					setError(err);
				});
		}
	}, []);


	return (
		<WeatherContext.Provider
			value={{ weather, isLoading, error }}>
			{children}
		</WeatherContext.Provider>
	);
};

const mockWeather = {
	'coord': { 'lon': 145.2619, 'lat': -37.9108 },
	'weather': [
		{
			'id': 802,
			'main': 'Clouds',
			'description': 'scattered clouds',
			'icon': '03d'
		}
	],
	'base': 'stations',
	'main': {
		'temp': 21.1,
		'feels_like': 21.02,
		'temp_min': 19.27,
		'temp_max': 23.42,
		'pressure': 1015,
		'humidity': 67
	},
	'visibility': 10000,
	'wind': { 'speed': 3.58, 'deg': 109, 'gust': 6.71 },
	'clouds': { 'all': 30 },
	'dt': 1681357220,
	'sys': {
		'type': 2,
		'id': 228832,
		'country': 'AU',
		'sunrise': 1681332170,
		'sunset': 1681372565
	},
	'timezone': 36000,
	'id': 7839797,
	'name': 'Knox',
	'cod': 200
};