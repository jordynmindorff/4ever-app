import React, { useReducer } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { LOGIN, CONFIRM_SESSION, LOGOUT, SET_LOADING, SIGNUP } from '../types';

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

	// Login and return token
	const login = async (username, password) => {
		setLoading();

		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/auth/login`, {
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
			setLoading();
			Alert.alert('Login Failed');
		}
	};

	const confirmSession = async (token) => {
		setLoading();

		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/auth/confirmsession`, {
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

	const logout = async () => {
		await save('authToken', '');

		dispatch({
			type: LOGOUT,
		});
	};

	// Create new user account & login if successful
	const signup = async ({ username, email, password, birthday }) => {
		setLoading();

		const body = {
			username,
			email,
			password,
			birthday: birthday.toISOString().split('T')[0],
		};

		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/auth/signup`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const res = await req.json();

		if (res.success) {
			await login(username, password);
		} else {
			setLoading();
			Alert.alert('Signup Failed');
			console.log(res);
		}
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
				signup,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
