const LOGIN_LOGIN_ACTION = 'LOGIN_LOGIN_ACTION';

export const login = (username, password) => {
	return {
		type: LOGIN_LOGIN_ACTION,
		username,
		password
	}
}
