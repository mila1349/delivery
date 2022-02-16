import { combineReducers } from "redux";

import packages from "./packages";
import alert from './alert'
import user from './user'

export default combineReducers({
    packages, alert, user
})