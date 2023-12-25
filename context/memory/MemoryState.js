import React, { useReducer } from 'react';
import { Alert } from 'react-native';
import MemoryContext from './memoryContext';
import memoryReducer from './memoryReducer';
import {
	GET_MEMORIES,
	GET_MEMORY,
	CREATE_MEMORY,
	SET_LOADING,
	CLEAR_MEMORY,
	EDIT_MEMORY,
} from '../types';
import * as SecureStore from 'expo-secure-store';

const getValueFor = async (key) => await SecureStore.getItemAsync(key);

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

		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/memory`, {
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

	// Get a single memory, show detail modal by setting memoryVisible to true
	const getMemory = async (id) => {
		setLoading();
		const token = await getValueFor('authToken');

		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/memory/${id}`, {
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

	// create a new memory, add it to the list
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

			const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/memory/`, {
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
			setLoading();
			Alert.alert('Creation Failed');
			console.log(err);
		}
	};

	// Delete a memory, remove it from state, clearing currently visible modal, refetch list of memories
	const deleteMemory = async () => {
		setLoading();
		const token = await getValueFor('authToken');

		if (!state.memory.id) return;

		const memId = state.memory.id;
		const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/memory/${memId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const res = await req.json();
		if (!res.success) throw new Error(res.msg);

		await clearMemory();
		await getMemories();
	};

	// Delete a memory, remove it from state, clearing currently visible modal, refetch list of memories
	const editMemory = async (newBody, newDate) => {
		try {
			setLoading();
			const token = await getValueFor('authToken');

			if (!state.memory.id) return;

			const memId = state.memory.id;
			const req = await fetch(`${process.env.EXPO_PUBLIC_FOREVER_BASE}/v1/memory/${memId}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: {
					date: newDate ? newDate : state.memory.date,
					bodyText: newBody ? newBody : state.memory.bodyText,
				},
			});

			const res = await req.json();
			if (!res.success) throw new Error(res.msg);

			dispatch({
				payload: res.data,
				type: EDIT_MEMORY,
			});
		} catch (error) {
			setLoading();
			Alert.alert('Edit Failed');
		}

		await clearMemory();
		await getMemories();
	};

	// Clear currently visible memory from state and hide modal
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
				deleteMemory,
				editMemory,
			}}>
			{props.children}
		</MemoryContext.Provider>
	);
};

export default MemoryState;
