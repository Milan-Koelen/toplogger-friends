import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import followingSlice from "../features/followingSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    following: followingSlice,
  },
  middleware: getDefaultMiddleware => [thunk, ...getDefaultMiddleware()],
});
