import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      // Here you can set user info if needed
    },
    clearUser(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
