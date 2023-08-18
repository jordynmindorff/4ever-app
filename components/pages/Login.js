import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useState, useContext } from 'react';
import AuthContext from '../../context/authentication/authContext.js';

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const authContext = useContext(AuthContext);
	const { login } = authContext;

	const handleLogin = async () => {
		try {
			if (!username || !password) {
				Alert.alert('Missing Required Fields');
			} else {
				await login(username, password);
			}
		} catch (error) {
			console.log(error);
			// Alert.alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Username'
				leftIcon={<Icon type='ionicons' name='person-outline' />}
				value={username}
				onChangeText={setUsername}
			/>
			<Input
				placeholder='Password'
				leftIcon={<Icon type='ionicons' name='lock-outline' />}
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>

			<Button title='Login' onPress={handleLogin} />
			<Button
				style={styles.btn}
				type='clear'
				title='New to 4ever? Signup Instead'
				onPress={() => navigation.navigate('Signup')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn: {
		marginTop: 10,
	},
});

export default Login;
