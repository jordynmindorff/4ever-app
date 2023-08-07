import { View, Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthState from './context/authentication/AuthState.js';
import MemoryState from './context/memory/MemoryState.js';

import AuthBoundary from './components/AuthBoundary.js';

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
		<AuthState>
			<MemoryState>
				<NavigationContainer>
					<SafeAreaProvider>
						<ThemeProvider theme={theme}>
							<AuthBoundary />
						</ThemeProvider>
					</SafeAreaProvider>
				</NavigationContainer>
			</MemoryState>
		</AuthState>
	);
}
