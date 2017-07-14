import { combineReducers } from "redux";
import { reducer as loadingReducer } from './containers/app';

const rootReducer = combineReducers({
	loadingReducer
});

export default rootReducer;
