import AuthContext from '../context/authentication/authContext.js';
import { useEffect, useContext, Fragment } from 'react';
import * as SecureStore from 'expo-secure-store';

import NavTabs from './layout/NavTabs';
import Login from './pages/Login';

const getValueFor = async (key) => await SecureStore.getItemAsync(key);

const AuthBoundary = () => {
	const authContext = useContext(AuthContext);
	const { confirmSession, isLoggedIn } = authContext;

	useEffect(() => {
		const check = async () => {
			const value = await getValueFor('authToken');

			if (value) {
				confirmSession(value);
			}
		};

		check();
	}, []);

	return <Fragment>{isLoggedIn ? <NavTabs /> : <Login />}</Fragment>;
};

export default AuthBoundary;
