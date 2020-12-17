import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import filteredDashboardReducer from "./dashboardReducers";
import accountsReducer from "./accountsReducers";
import connectorsReducer from "./connectorsReducers";
import notebookReducer from "./notebookReducers";

export default combineReducers({
	themeReducer,
	filteredDashboardReducer,
	accountsReducer,
	connectorsReducer,
	notebookReducer,
});
