import { CONFIRM_SESSION, LOGIN, LOGOUT, SET_LOADING } from '../types';

const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				profile: action.payload,
				isLoggedIn: true,
				loading: false,
			};

		case LOGOUT:
			return {
				...state,
				profile: {},
				isLoggedIn: false,
				loading: false,
			};

		case CONFIRM_SESSION:
			return {
				...state,
				isLoggedIn: true,
				profile: action.payload,
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
