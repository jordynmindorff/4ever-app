import React, { useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { FOREVER_BASE } from '@env';
import { LOGIN } from '../types';

const save = async (key, value) => {
	await SecureStore.setItemAsync(key, value);
};

const getValueFor = async (key) => {
	return await SecureStore.getItemAsync(key);
};

const AuthState = (props) => {
	const initialState = {
		isLoggedIn: false,
		profile: {},
		loading: false,
		alert: {},
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// TODO: email accept
	// Login and return token
	const login = async (username, password) => {
		setLoading();

		const req = await fetch(`${FOREVER_BASE}/v1/auth/login`, {
			method: 'POST',
			body: {
				username,
				password,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const res = await req.json();

		if (res.success) {
			dispatch({
				type: LOGIN,
				payload: res.data.user,
			});

			save('authKey', res.data.token);
		} else {
			// TODO handle with alert
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: state.isLoggedIn,
				profile: state.profile,
				loading: state.loading,
				login,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
