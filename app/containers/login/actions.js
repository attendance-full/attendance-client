export const LOGIN_ACTION = 'LOGIN_LOGIN_ACTION';
export const VALUE_CHANGE_ACTION = 'LOGIN_VALUE_CHANGE_ACTION';

export const login = (username, password) => {
	return {
		type: LOGIN_LOGIN_ACTION,
		username,
		password
	}
}

export const valueChange= (key, value) => {
	return {
		type: VALUE_CHANGE_ACTION,
		key,
		value
	}
}
