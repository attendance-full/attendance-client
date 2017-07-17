export const EMPLOYEE_EDIT_VALUE_CHANGE = 'EMPLOYEE_EDIT_VALUE_CHANGE';

export const valueChange = (key, value) => {
	return {
		type: EMPLOYEE_EDIT_VALUE_CHANGE,
		key,
		value
	}
}

