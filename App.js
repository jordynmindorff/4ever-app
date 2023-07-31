import { View, Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import NavTabs from './components/layout/NavTabs';
import Login from './components/pages/Login';

const getValueFor = async (key) => {
	await SecureStore.getItemAsync(key);
};

const theme = createTheme({
	lightColors: {
		...Platform.select({
			default: lightColors.platform.android,
			ios: lightColors.platform.ios,
		}),
	},
});

export default function App() {
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		const check = async () => {
			const value = await getValueFor('authToken');

			if (value) {
				setSignedIn(true);
				console.log('Yup');
			}
		};

		check();
	}, []);

	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<ThemeProvider theme={theme}>
					{signedIn ? <NavTabs /> : <Login setSignedIn={setSignedIn} />}
				</ThemeProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
