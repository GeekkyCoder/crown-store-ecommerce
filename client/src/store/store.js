import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

//root-reducer

export const store = createStore(rootReducer);
