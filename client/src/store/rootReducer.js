import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import {catogoriesReducer} from "./catogories/catogories.reducer"
import userReducer from "./user/userReducer";

export const rootReducer = combineReducers({
    user:userReducer,
    catogories: catogoriesReducer,
    cart:cartReducer
})