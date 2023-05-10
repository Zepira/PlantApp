
import React, { useState, useContext, createContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AppContext } from '../appContext';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ auth, children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [hasCompletedEntryQuestions, setHasCompletedEntryQuestions] = useState(false);
	const { db } = useContext(AppContext);


	// useEffect(() => {
	//     const docRef = query(collection(db, "users"));
	//     getDocs(docRef)
	//         .then((something) => something.forEach((doc) => {
	//             // doc.data() is never undefined for query doc snapshots
	//             //console.log(doc.id, " => ", doc.data())
	//         }));
	//     //onLogOut();

	// }, [db]);

	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			getDoc(doc(db, 'users', usr.uid))
				.then(dbUser => {
					setUser(dbUser);
				}
				);
		}


	});




	const onLogin = (email, password) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((u) => {
				setUser(u.user);
				setIsLoading(false);
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
				console.log(e);
			});
	};

	const onLogOut = () => {
		setIsLoading(true);
		signOut(auth).then(() => {
			setUser(null);
			setError(null);
		})
			.catch((e) => console.log(e));




	};

	const onCompleteEntryQuestions = () => {
		console.log('value');
		setHasCompletedEntryQuestions(!hasCompletedEntryQuestions);
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				hasCompletedEntryQuestions: true, //need to get/ set this on user
				onCompleteEntryQuestions, //same as above
				isLoading,
				error,
				onLogin,
				onSignUp,
				onLogOut,
			}}>
			{children}
		</AuthenticationContext.Provider>
	);
};
