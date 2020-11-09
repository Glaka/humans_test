import { combineReducers } from "redux";
import humanReducer from "../reducers/humans";

export const rootReducer = combineReducers({
    humanReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
