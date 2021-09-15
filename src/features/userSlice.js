import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../config";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
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
      console.log(data);
      console.log(data.name);
      console.log(data.grade);
      // console.log(data.TL_ID.TotalTops);
      console.log(data.following);

      dispatch(
        userSlice.actions.setUser({
          token: data.token,
          name: data.name,
          TL_Grade: data.grade,
          AccendHistory: data.AccendHistory,
          TotalTops: data.TotalTops,
          ProfilePictureUrl: data.ProfilePictureUrl,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};

export const signup = ({ email, password }) => {
  return async dispatch => {
    try {
      const result = await fetch(URL + "/signup", {
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
      console.log(data);

      dispatch(
        userSlice.actions.setUser({
          token: data.token,
          name: data.name,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectUser = state => state.user.user;

export default userSlice.reducer;
