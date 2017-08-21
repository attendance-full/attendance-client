import {
	EMPLOYEE_EDIT_VALUE_CHANGE,
	CLEAR_EDIT_EMPLOYEE_PAGE,
	INIT_EDIT_INFO_ACTION
} from './actions';

const defaultState = {
	username: '',
	phone: '',
	gradeId: 1,
	classId: 1,
	rfid: '',
	observedPhone: '',
	isObserved: 0
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case EMPLOYEE_EDIT_VALUE_CHANGE: {
			const newState = state;
			newState[action.key] = action.value;
			return Object.assign({}, state, newState);
		}
		case CLEAR_EDIT_EMPLOYEE_PAGE:
			return Object.assign({}, state, {
				username: '',
				phone: '',
				gradeId: 1,
				classId: 1,
				rfid: '',
				observedPhone: '',
				isObserved: 0
			});
		case INIT_EDIT_INFO_ACTION:
			return Object.assign({}, state, {
				username: action.info.name,
				phone: action.info.phone,
				gradeId: action.info.gradeId,
				classId: action.info.classId,
				observedPhone: action.info.observedPhone,
				isObserved: action.info.isObserved,
				rfid: action.info.RFID
			});
		default:
			return state;
	}
}

