import { combineReducers } from "@reduxjs/toolkit";
import AppReducer from "./AppReducer";


const rootReducer = combineReducers({
    app: AppReducer
})

export default rootReducer;