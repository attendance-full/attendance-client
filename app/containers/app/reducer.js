import {
	START_LOADING_ACTION
} from './actions'

const initState = {
	loading: false
}

const loading = (state = initState, action) => {
	switch (action.type) {
		case START_LOADING_ACTION:
			return Object.assign({}, state, { loading: true });
		default:
			return state;
	}
}

export default loading;
