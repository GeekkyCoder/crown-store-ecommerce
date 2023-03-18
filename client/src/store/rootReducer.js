import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import {catogoriesReducer} from "./catogories/catogories.reducer"

export const rootReducer = combineReducers({
    catogories: catogoriesReducer,
    cart:cartReducer
})