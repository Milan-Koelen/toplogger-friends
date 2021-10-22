import { createSlice } from "@reduxjs/toolkit";
import { URL } from "../config";
import gradeColors from "../features/grades/gradeColors";

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

      dispatch(
        userSlice.actions.setUser({
          token: data.token,
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

export const fetchUser = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const jwt = state.user.user.token;

      const result = await fetch(URL + "/user", {
        headers: {
          authorization: jwt,
        },
      });

      if (result.status !== 200) {
        console.error(await result.text(), result.status);
        return;
      }

      const data = await result.json();

      console.log(data);

      dispatch(userSlice.actions.setUser(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const selectUser = state => {
  const data = {
    ...state.user.user,
    Profile: {
      ...state.user.user.Profile,
      Accends: state.user.user.Profile?.Accends.map(accend => ({
        ...accend,
        climb: {
          ...accend.climb,
          color: gradeColors[accend.climb?.hold_id],
        },
      })),
    },
  };

  // console.log(data.Profile?.Accends[0]);
  return data;
};

export default userSlice.reducer;
