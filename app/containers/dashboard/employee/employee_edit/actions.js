export const EMPLOYEE_EDIT_VALUE_CHANGE = 'EMPLOYEE_EDIT_VALUE_CHANGE';
export const CLEAR_EDIT_EMPLOYEE_PAGE = 'CLEAR_EDIT_EMPLOYEE_PAGE';
export const INIT_EDIT_INFO_ACTION = 'INIT_EDIT_INFO_ACTION';

export const valueChange = (key, value) => {
	return {
		type: EMPLOYEE_EDIT_VALUE_CHANGE,
		key,
		value
	}
}

export const clearEditPage = () => {
	return {
		type: CLEAR_EDIT_EMPLOYEE_PAGE,
	}
}

export const initEditInfo =(info) => {
	return {
		type: INIT_EDIT_INFO_ACTION,
		info
	}
}
