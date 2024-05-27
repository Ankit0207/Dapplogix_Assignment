import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { reducer as blogReducer } from "./Blogs/reducer";
import { reducer as commentReducer } from "./Comments/reducer";
import {thunk}  from "redux-thunk"

const rootReducer = combineReducers({
    blogReducer,commentReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
