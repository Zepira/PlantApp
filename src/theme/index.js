import { colors } from './colors';
import { space, lineHeights } from './spacing';
import { sizes } from './sizes';
import { Text } from './components/text.component';
import { Spacer } from './components/spacer.component';
import { fonts, fontWeights, fontSizes, fontConfig } from './fonts';
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';


export const theme = {
	colors,
	space,
	lineHeights,
	sizes,
	fonts,
	fontSizes,
	fontWeights,

};

export { Text, Spacer };

export const paperTheme = {
	...DefaultTheme,
	fonts: configureFonts({ config: fontConfig }),
	colors: colors,


};