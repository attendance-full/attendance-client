export const START_LOADING_ACTION = 'APP_START_LOADING_ACTION';
export const STOP_LOADING_ACTION = 'APP_STOP_LOADING_ACTION';
export const SHOW_MESSAGE_ACTION = 'APP_SHOW_MESSAGE_ACTION';
export const DISMISS_MESSAGE_ACTION = 'APP_DISMISS_MESSAGE_ACTION';
export const LOAD_GRADE_ACTION = 'LOAD_GRADE_ACTION';
export const LOAD_CLASSED_ACTION = 'LOAD_CLASSED_ACTION';

export const startLoading = () => {
	return {
		type: START_LOADING_ACTION
	}
}

export const stopLoading = () => {
	return {
		type: STOP_LOADING_ACTION
	}
}

export const showMessage = (message) => {
	return {
		type: SHOW_MESSAGE_ACTION,
		message
	}
}

export const dismissMessage =() => {
	return {
		type: DISMISS_MESSAGE_ACTION
	}
}

export const loadGradeSuccess = (grade) => {
	return {
		type: LOAD_GRADE_ACTION,
		grade
	}
}

export const loadClassesSuccess = (classes) => {
	return {
		type: LOAD_CLASSED_ACTION,
		classes
	}
}
