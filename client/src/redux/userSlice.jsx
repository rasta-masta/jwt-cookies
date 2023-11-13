import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {}
  },
  reducers : {
    login: (state, action) => {
      state.value = action.payload;
      state.value.userName = action.payload.userName || state.value.userName;
    },
    logout: (state) => {
      state.value = {}  
    },
    setTokens:(state, action) => {
      state.value.accessToken = action.payload.accessToken;
      state.value.refreshToken = action.payload.refreshToken;
      state.value.userName = action.payload.userName;
      console.log('setToken payload: ', action.payload)
    }
  }
})

export const { login, logout, setTokens } = userSlice.actions;
export default userSlice.reducer;