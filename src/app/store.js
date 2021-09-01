import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import followingReducer from "../features/followingSlice";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  following: followingReducer,
});

export default configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware => [thunk, ...getDefaultMiddleware()],
});
