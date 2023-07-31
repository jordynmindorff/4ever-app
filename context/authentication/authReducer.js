import { LOGIN } from '../types';

const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				profile: action.payload,
				isLoggedIn: true,
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
