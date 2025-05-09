import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/auth.reducer.js";
import userReducer from "../reducers/user.reducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
