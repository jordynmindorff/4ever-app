import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useState, useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from '../../context/authentication/authContext.js';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [birthday, setDate] = useState(new Date());

	const authContext = useContext(AuthContext);
	const { signup } = authContext;

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const handleSignup = async () => {
		try {
			if (!username || !email || !password || !password2 || !birthday) {
				Alert.alert('Missing Required Fields');
			} else if (password !== password2) {
				Alert.alert('Passwords Do Not Match');
			} else {
				await signup({
					username,
					email,
					password,
					birthday,
				});
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
				placeholder='Email'
				leftIcon={<Icon type='ionicons' name='person-outline' />}
				value={email}
				onChangeText={setEmail}
			/>
			<Input
				placeholder='Password'
				leftIcon={<Icon type='ionicons' name='lock-outline' />}
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>
			<Input
				placeholder='Confirm Password'
				leftIcon={<Icon type='ionicons' name='lock-outline' />}
				secureTextEntry={true}
				value={password2}
				onChangeText={setPassword2}
			/>
			<View style={styles.dateContainer}>
				<Text style={styles.bdayText}>Date of Birth</Text>
				<DateTimePicker
					testID='dateTimePicker'
					value={birthday}
					mode='date'
					is24Hour={true}
					onChange={onChange}
				/>
			</View>

			<Button title='Signup & Login' onPress={handleSignup} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	bdayText: {
		marginTop: 7,
		fontSize: 18,
	},
});

export default Signup;
