import Login from '../pages/Login';
import Signup from '../pages/Signup';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='Signup' component={Signup} />
		</Stack.Navigator>
	);
};

export default AuthStack;
