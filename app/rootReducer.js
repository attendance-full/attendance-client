import { combineReducers } from "redux";
import { reducer as app } from './containers/app';
import { reducer as login } from './containers/login';
import { reducer as employeeList } from './containers/dashboard/employee/employee_list';
import { reducer as editedEmployee } from './containers/dashboard/employee/employee_edit';
console.log(editedEmployee);
const rootReducer = combineReducers({
	app,
	login,
	employeeList,
	editedEmployee
});

export default rootReducer;
