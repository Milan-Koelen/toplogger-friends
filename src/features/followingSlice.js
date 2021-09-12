import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../config";

export const followingSlice = createSlice({
  name: "followers",
  initialState: {
    following: [],
  },
  reducers: {
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
  },
});

export const fetchFollowing = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const jwt = state.user.user.token;

      const result = await fetch(URL + "/", {
        headers: {
          authorization: jwt,
        },
      });
      console.log(result);
      if (result.status !== 200) {
        console.error(await result.text(), result.status);
        return;
      }

      const data = await result.json();

      dispatch(followingSlice.actions.setFollowing(data.following));
    } catch (e) {
      console.error(e);
    }
  };
};

export const followUser = id => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user.user;

      console.log(user);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
        body: JSON.stringify({ follow: id }),
      };
      const result = await fetch(URL + "/follow", requestOptions);

      if (result.status !== 200) {
        console.error(await result.text(), result.status);
        return;
      }
      const data = await result.json();

      console.log("data!", data);

      dispatch(followingSlice.actions.setFollowing(data.following));
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectFollowing = state => state.following.following;

export default followingSlice.reducer;
