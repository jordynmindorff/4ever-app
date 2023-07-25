import { View, Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import NavTabs from './components/layout/NavTabs';

const theme = createTheme({
	lightColors: {
		...Platform.select({
			default: lightColors.platform.android,
			ios: lightColors.platform.ios,
		}),
	},
});

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<ThemeProvider theme={theme}>
					<NavTabs />
				</ThemeProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
