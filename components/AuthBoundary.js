import AuthContext from '../context/authentication/authContext.js';
import MemoryContext from '../context/memory/memoryContext.js';
import { useEffect, useContext, Fragment } from 'react';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';

import NavTabs from './layout/NavTabs';
import AuthStack from './layout/AuthStack.js';

const getValueFor = async (key) => await SecureStore.getItemAsync(key);

const AuthBoundary = () => {
	const authContext = useContext(AuthContext);
	const { confirmSession, isLoggedIn, loading: authLoad } = authContext;

	const memoryContext = useContext(MemoryContext);
	const { loading: memLoad } = memoryContext;

	useEffect(() => {
		const check = async () => {
			const value = await getValueFor('authToken');

			if (value) {
				confirmSession(value);
			}
		};

		check();
	}, []);

	return (
		<Fragment>
			<Spinner visible={authLoad || memLoad} textContent={'Loading...'} />

			{isLoggedIn ? <NavTabs /> : <AuthStack />}
		</Fragment>
	);
};

export default AuthBoundary;
