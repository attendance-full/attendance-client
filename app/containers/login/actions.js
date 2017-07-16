
export const VALUE_CHANGE_ACTION = 'LOGIN_VALUE_CHANGE_ACTION';

export const valueChange= (key, value) => {
	return {
		type: VALUE_CHANGE_ACTION,
		key,
		value
	}
}
