import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../config";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: state => {
      state.user = {};
    },
  },
});
export const { logout } = userSlice.actions;

export const login = ({ email, password }) => {
  return async dispatch => {
    try {
      const result = await fetch(URL + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      });

      if (result.status !== 200) {
        console.error(await result.text(), result.status);
        return;
      }

      const data = await result.json();

      dispatch(userSlice.actions.setToken({ token: data.token }));
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectUser = state => state.user.user;

export default userSlice.reducer;
