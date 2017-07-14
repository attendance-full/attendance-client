import { combineReducers } from "redux";
import { reducer as app } from './containers/app';
import { reducer as login } from './containers/login';

const rootReducer = combineReducers({
	app,
	login
});

export default rootReducer;
