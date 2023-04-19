import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { theme } from './src/theme';
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCc7JqshzpZK_HBV8CHLE9fJWYaqQOhGyc",
  authDomain: "plantapp-ca700.firebaseapp.com",
  projectId: "plantapp-ca700",
  storageBucket: "plantapp-ca700.appspot.com",
  messagingSenderId: "396365671019",
  appId: "1:396365671019:web:863fb4890a0e79e71b9f2e",
  measurementId: "G-GFJ2ZFXZTY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




export default function App() {
  const [quicksandLoaded] = useQuicksand({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!quicksandLoaded) {
    return null;
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider auth={auth}>
          <Navigation />
        </AuthenticationContextProvider>
        <StatusBar style="auto" />


      </ThemeProvider>
    </>
  );
}


