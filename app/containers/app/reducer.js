import {
	START_LOADING_ACTION,
	STOP_LOADING_ACTION,
	SHOW_MESSAGE_ACTION,
	DISMISS_MESSAGE_ACTION
} from './actions'

const initState = {
	loading: false,
	open: false,
	message: ''
}

export default (state = initState, action) => {
	switch (action.type) {
		case START_LOADING_ACTION:
			return Object.assign({}, state, { loading: true });
		case STOP_LOADING_ACTION:
			return Object.assign({}, state, { loading: false });
		case SHOW_MESSAGE_ACTION:
			return Object.assign({}, state, { open: true, message: action.message });
		case DISMISS_MESSAGE_ACTION:
			return Object.assign({}, state, { open: false, message: '' });
		default:
			return state;
	}
}
