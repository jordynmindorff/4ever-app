import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useState } from 'react';
import { FOREVER_BASE } from '@env';
import * as SecureStore from 'expo-secure-store';

const Login = ({ setSignedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const save = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const handleLogin = async () => {
		try {
			if (!username || !password) {
				Alert.alert('Missing Required Fields');
			} else {
				const req = await fetch(`${FOREVER_BASE}/v1/auth/login`, {
					method: 'POST',
					body: JSON.stringify({
						username,
						password,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const res = await req.json();
				console.log(res);

				if (res.success) {
					await save('authToken', res.data.token);
					setSignedIn(true);
				} else {
					Alert.alert(res.msg);
				}
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

export default Login;
