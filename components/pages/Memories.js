import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useContext } from 'react';
import AuthContext from '../../context/authentication/authContext.js';

import * as SecureStore from 'expo-secure-store';

const getValueFor = async (key) => {
	return await SecureStore.getItemAsync(key);
};

const Memories = () => {
	const authContext = useContext(AuthContext);
	const { profile } = authContext;

	useEffect(() => {
		const data = async () => {
			const token = await getValueFor('authToken');
			console.log(token);
		};

		data();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Welcome home, {profile.username}!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Memories;
