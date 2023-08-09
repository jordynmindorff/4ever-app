import React, { useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { FOREVER_BASE } from '@env';
import { LOGIN, CONFIRM_SESSION, LOGOUT, SET_LOADING } from '../types';

const save = async (key, value) => {
	await SecureStore.setItemAsync(key, value);
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
			body: JSON.stringify({
				username,
				password,
			}),
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

			await save('authToken', res.data.token);
		} else {
			// TODO handle with alert
		}
	};

	const confirmSession = async (token) => {
		setLoading();

		const req = await fetch(`${FOREVER_BASE}/v1/auth/confirmsession`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res = await req.json();

		if (res.success) {
			dispatch({
				type: CONFIRM_SESSION,
				payload: res.data.user,
			});
		} else {
			dispatch({
				type: LOGOUT,
			});
		}
	};

	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};

	// Set Loading State
	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: state.isLoggedIn,
				profile: state.profile,
				loading: state.loading,
				login,
				logout,
				confirmSession,
				setLoading,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
