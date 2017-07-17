import {
	EMPLOYEE_EDIT_VALUE_CHANGE
} from './actions';

const defaultState = {
	username: '',
	phone: '',
	gradeid: '',
	classId: '',
	studentId: '',
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case EMPLOYEE_EDIT_VALUE_CHANGE: {
			const newState = state;
			newState[action.key] = action.value;
			return Object.assign({}, state, newState);
		}
		default:
			return state;
	}
}

