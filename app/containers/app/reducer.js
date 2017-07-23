import {
	START_LOADING_ACTION,
	STOP_LOADING_ACTION,
	SHOW_MESSAGE_ACTION,
	DISMISS_MESSAGE_ACTION,
	LOAD_GRADE_ACTION,
	LOAD_CLASSED_ACTION
} from './actions'

const initState = {
	loading: false,
	open: false,
	message: '',
	grade: []
}

export default (state = initState, action) => {
	switch (action.type) {
		case START_LOADING_ACTION:
			return Object.assign({}, state, { loading: true });
		case STOP_LOADING_ACTION:
			return Object.assign({}, state, { loading: false });
		case SHOW_MESSAGE_ACTION:
			return Object.assign({}, state, { open: true, message: action.message });
		case DISMISS_MESSAGE_ACTION:
			return Object.assign({}, state, { open: false, message: '' });
		case LOAD_GRADE_ACTION:
			return Object.assign({}, state, { grade: action.grade });
		case LOAD_CLASSED_ACTION: {
			const newGrade = [];
			state.grade.map((grade) => {
				const classes = action.classes.filter((item) => item.gradeId == grade.id);
				newGrade.push(Object.assign({}, grade, { classes }));
			});
			return Object.assign({}, state, { grade: newGrade });
		}
		default:
			return state;
	}
}
