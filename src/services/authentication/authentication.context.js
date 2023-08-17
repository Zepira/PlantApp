
import React, { useState, useContext, createContext, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, getDocs, addDoc, collection } from 'firebase/firestore';
import { AppContext } from '../appContext';
import { NotificationContext } from '../contextService/notifications/notification.context';
import { GARDEN_TYPE } from '../../utils/constants';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ auth, children }) => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
	const { db } = useContext(AppContext);
	const { schedulePushNotification } = useContext(NotificationContext);


	// useEffect(() => {
	//     const docRef = query(collection(db, "users"));
	//     getDocs(docRef)
	//         .then((something) => something.forEach((doc) => {
	//             // doc.data() is never undefined for query doc snapshots
	//             //console.log(doc.id, " => ", doc.data())
	//         }));
	//     //onLogOut();

	// }, [db]);

	// onAuthStateChanged(auth, (usr) => {
	// 	if (usr) {
	// 		getDoc(doc(db, 'users', usr.uid))
	// 			.then(dbUser => {
	// 				console.log('getUser', dbUser.data);
	// 				setUser(dbUser);
	// 			}
	// 			);
	// 	}
	// });

	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User

		} else {
			// User is signed out
			// ...
		}
	});


	useEffect(() => {
		if (user?.uid && !userData) {
			console.log('getUserdata', user?.uid, userData);
			getDoc(doc(db, 'users', user.uid))
				.then(dbUser => {
					const dbUserData = dbUser.data();
					setUserData(dbUserData);
				}
				)
				.catch(er => console.log('error getting user data', er));
		}
	}, [userData, user, setUserData]);






	const onLogin = (email, password) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((u) => {
				setUser(u.user);
				setIsLoading(false);
				schedulePushNotification({
					title: 'Welcome to the App!',
					body: 'Here is the notification body',
					data: { data: 'goes here' },
				});
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e.code.replace('auth/', '').replace('-', ' '));
			});
	};

	const onSignUp = (email, password) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((u) => {
				setUser(u.user);
				setDoc(doc(db, 'users', u.user.uid), {
					email: email,
					password: password
				})
					.then(
						setIsLoading(false)
					);

			})
			.catch((e) => {
				// setIsLoading(false);
				// if (e.code.contains("auth/")) {
				//     setError(e.code.replace("auth/", "").replace("-", " "));
				// }
				// setError(e);
				console.log('error 102', e);
			});
	};

	const onLogOut = () => {
		setIsLoading(true);
		signOut(auth).then(() => {
			setUser(null);
			setUserData(null);
			setError(null);
		})
			.catch((e) => console.log('onLogout error', e));




	};

	const onCompleteEntryQuestions = () => {
		setIsFirstTimeUser(!isFirstTimeUser);
		addDoc(collection(db, 'userGardens'), {
			gardenName: GARDEN_TYPE[6].gardenName,
			user: user?.uid,
			gardenType: GARDEN_TYPE[6].optionMapping,
			wateringFrequency: GARDEN_TYPE[6].wateringFrequency,
			fertilisingFrequency: GARDEN_TYPE[6].fertilisingFrequency,
			weedingFrequency: GARDEN_TYPE[6].weedingFrequency
		});
	};

	const updateUserData = () => {
		if (user?.uid) {
			console.log('getUserdata', user?.uid, userData);
			getDoc(doc(db, 'users', user.uid))
				.then(dbUser => {
					const dbUserData = dbUser.data();
					setUserData(dbUserData);
				}
				)
				.catch(er => console.log('error getting user data', er));
		}
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				isFirstTimeUser: true, //need to get/ set this on user
				onCompleteEntryQuestions, //same as above
				isLoading,
				error,
				onLogin,
				onSignUp,
				onLogOut,
				userData,
				user,
				updateUserData
			}}>
			{children}
		</AuthenticationContext.Provider>
	);
};
