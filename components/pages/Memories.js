import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const getValueFor = async (key) => {
	await SecureStore.getItemAsync(key);
};

const Memories = () => {
	useEffect(() => {
		const data = async () => {
			const token = await getValueFor('authToken');
			console.log(token);
		};

		data();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Welcome home!</Text>
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
