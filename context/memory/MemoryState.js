import React, { useReducer } from 'react';
import MemoryContext from './memoryContext';
import memoryReducer from './memoryReducer';
import { FOREVER_BASE, AUTH_TOKEN } from '@env';
import { GET_MEMORIES, GET_MEMORY, CREATE_MEMORY, SET_LOADING } from '../types';

// TODO: DON'T HARDCODE AUTH, IMPLEMENT SEPARATELY NAVIGATED AUTH FLOW WITH TOKEN STORING
const NHLState = (props) => {
	const initialState = {
		memories: [],
		memory: {},
		loading: false,
	};

	const [state, dispatch] = useReducer(memoryReducer, initialState);

	// Get all memories associated with active account
	const getMemories = async () => {
		setLoading();

		const req = await fetch(`${FOREVER_BASE}/v1/memory`, {
			headers: {
				Authorization: AUTH_TOKEN,
			},
		});
		const res = await req.json();

		dispatch({
			type: GET_MEMORIES,
			payload: res.data,
		});
	};

	// Get a single memory
	const getMemory = async (id) => {
		setLoading();

		const req = await fetch(`${FOREVER_BASE}/v1/memory/${id}`, {
			headers: {
				Authorization: AUTH_TOKEN,
			},
		});
		const res = await req.json();

		dispatch({
			type: GET_MEMORY,
			payload: res.data,
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
				getMemories,
				getMemory,
				setLoading,
			}}>
			{props.children}
		</MemoryContext.Provider>
	);
};

export default NHLState;
