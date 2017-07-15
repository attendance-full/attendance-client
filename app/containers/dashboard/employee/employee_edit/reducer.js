
const defaultState = {
	username: '',
	phone: '',
	roleId: '',
	address: '',
	usernameError: '',
	phoneError: '',
	roleIdError: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		default:
			return state;
	}
}
