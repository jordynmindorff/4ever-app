import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
	return (
		<View style={styles.container}>
			<Text>Settings Page</Text>
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

export default Settings;
