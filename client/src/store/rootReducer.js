import { combineReducers } from "redux";
import {catogoriesReducer} from "./catogories/catogories.reducer"

export const rootReducer = combineReducers({
    catogories: catogoriesReducer,
})