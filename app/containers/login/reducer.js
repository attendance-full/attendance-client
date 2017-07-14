import {
	LOGIN_ACTION,
	VALUE_CHANGE_ACTION
} from './actions';

const defaultState = {
	username: '',
	password: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case VALUE_CHANGE_ACTION: {
			const newState = state;
			newState[action.key] = action.value;
			return Object.assign({}, state, newState);
		}
		default:
			return state;
	}
}
