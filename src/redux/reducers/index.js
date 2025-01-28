import { combineReducers } from "redux";
import userReducer from "./userReducer"
import articleReducer from "./articleReducer"

export const rootReducers  = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
})