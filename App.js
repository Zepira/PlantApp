import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { theme } from './src/theme';
import { AppNavigator } from './src/navigation/app.navigator';




export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="auto" />


      </ThemeProvider>
    </>
  );
}


