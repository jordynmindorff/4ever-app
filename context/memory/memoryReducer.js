import { GET_MEMORIES, GET_MEMORY, CREATE_MEMORY, SET_LOADING } from '../types';

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
				loading: false,
			};

		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};

export default reducer;
