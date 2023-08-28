import React, { useReducer } from 'react';
import MemoryContext from './memoryContext';
import memoryReducer from './memoryReducer';
import { FOREVER_BASE } from '@env';
import { GET_MEMORIES, GET_MEMORY, CREATE_MEMORY, SET_LOADING, CLEAR_MEMORY } from '../types';
import * as SecureStore from 'expo-secure-store';

const getValueFor = async (key) => await SecureStore.getItemAsync(key);

// TODO: DON'T HARDCODE AUTH, IMPLEMENT SEPARATELY NAVIGATED AUTH FLOW WITH TOKEN STORING
const MemoryState = (props) => {
	const initialState = {
		memories: [],
		memory: {},
		loading: false,
		memoryVisible: false,
	};

	const [state, dispatch] = useReducer(memoryReducer, initialState);

	// Get all memories associated with active account
	const getMemories = async () => {
		setLoading();
		const token = await getValueFor('authToken');

		const req = await fetch(`${FOREVER_BASE}/v1/memory`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res = await req.json();
		res.data.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});

		res.data.forEach((v, i) => {
			v.date = new Date(v.date);
			v.formattedDate = new Date(v.date).toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		});

		dispatch({
			type: GET_MEMORIES,
			payload: res.data,
		});
	};

	// Get a single memory
	const getMemory = async (id) => {
		setLoading();
		const token = await getValueFor('authToken');

		const req = await fetch(`${FOREVER_BASE}/v1/memory/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const res = await req.json();

		res.data.formattedDate = new Date(res.data.date).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		dispatch({
			type: GET_MEMORY,
			payload: res.data,
		});
	};

	const createMemory = async (bodyText, imageURL) => {
		try {
			setLoading();
			const token = await getValueFor('authToken');

			const date = new Date().toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			const req = await fetch(`${FOREVER_BASE}/v1/memory/`, {
				method: 'POST',
				body: JSON.stringify({
					date,
					bodyText,
					imageURL,
				}),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			const res = await req.json();
			if (!res.success) throw new Error(res.msg);

			res.data.formattedDate = new Date(res.data.date).toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			dispatch({
				payload: res.data,
				type: CREATE_MEMORY,
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Get a single memory
	const clearMemory = async () => {
		dispatch({
			type: CLEAR_MEMORY,
		});
	};

	// Set Loading State
	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	return (
		<MemoryContext.Provider
			value={{
				memories: state.memories,
				memory: state.memory,
				loading: state.loading,
				memoryVisible: state.memoryVisible,
				getMemories,
				getMemory,
				setLoading,
				clearMemory,
				createMemory,
			}}>
			{props.children}
		</MemoryContext.Provider>
	);
};

export default MemoryState;
