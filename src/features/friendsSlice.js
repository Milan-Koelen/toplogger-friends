import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../config";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export const fetchFriends = () => {
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

      dispatch(friendsSlice.actions.setFriends(data.friends));
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectFriends = state => state.friends.friends;

export default friendsSlice.reducer;
