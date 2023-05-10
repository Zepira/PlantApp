import { StatusBar } from 'expo-status-bar';
import { paperTheme } from './src/theme';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { initializeApp } from '@firebase/app';
import { Navigation } from './src/navigation';
import {
	useFonts as useQuicksand,
	Quicksand_300Light,
	Quicksand_400Regular,
	Quicksand_500Medium,
	Quicksand_600SemiBold,
	Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { useState } from 'react';
import { AppContextProvider } from './src/services/appContext';





//Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCc7JqshzpZK_HBV8CHLE9fJWYaqQOhGyc',
	authDomain: 'plantapp-ca700.firebaseapp.com',
	projectId: 'plantapp-ca700',
	storageBucket: 'plantapp-ca700.appspot.com',
	messagingSenderId: '396365671019',
	appId: '1:396365671019:web:863fb4890a0e79e71b9f2e',
	measurementId: 'G-GFJ2ZFXZTY'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     //return signInWithEmailAndPassword(auth, email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });




export default function App() {
	const [quicksandLoaded] = useQuicksand({
		Quicksand_300Light,
		Quicksand_400Regular,
		Quicksand_500Medium,
		Quicksand_600SemiBold,
		Quicksand_700Bold,
	});
	const [user, setUser] = useState(null);


	if (!quicksandLoaded) {
		return null;
	}

	onAuthStateChanged(auth, (usr) => {
		// if (usr) {
		//   setUser(usr);
		// }
	});


	return (
		<>
			<PaperProvider theme={paperTheme}>
				<AppContextProvider auth={auth} db={db} storage={storage}>
					<AuthenticationContextProvider auth={auth} db={db} storage={storage}>
						<Navigation theme={paperTheme} />
					</AuthenticationContextProvider>
				</AppContextProvider>
				<StatusBar style="light" />
			</PaperProvider>
		</>
	);
}


