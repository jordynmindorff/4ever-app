import { StyleSheet, Text, View } from 'react-native';

const Memories = () => {
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
