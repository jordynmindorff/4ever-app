import {
	GET_MEMORIES,
	GET_MEMORY,
	CREATE_MEMORY,
	SET_LOADING,
	CLEAR_MEMORY,
	EDIT_MEMORY,
} from '../types';

const reducer = (state, action) => {
	switch (action.type) {
		case GET_MEMORIES:
			return {
				...state,
				memories: action.payload,
				loading: false,
			};

		case GET_MEMORY:
			return {
				...state,
				memory: action.payload,
				memoryVisible: true,
				loading: false,
			};

		case CREATE_MEMORY:
			return {
				...state,
				memories: [...state.memories, action.payload],
				loading: false,
			};

		case SET_LOADING:
			return {
				...state,
				loading: !state.loading,
			};

		case CLEAR_MEMORY:
			return {
				...state,
				memory: {},
				memoryVisible: false,
			};

		case EDIT_MEMORY:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
