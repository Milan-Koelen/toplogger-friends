import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import friendsReducer from "../features/friendsSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
  },
  middleware: getDefaultMiddleware => [thunk, ...getDefaultMiddleware()],
});
