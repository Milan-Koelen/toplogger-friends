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

export const selectFollowing = state => state.following.following;

export default followingSlice.reducer;
