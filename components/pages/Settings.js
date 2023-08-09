import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { Button } from '@rneui/themed';
import AuthContext from '../../context/authentication/authContext.js';

const Settings = () => {
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	return (
		<View style={styles.container}>
			<Button title='Logout' onPress={logout} />
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
