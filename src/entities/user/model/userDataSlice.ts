import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userDataState {
  token: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
}

const initialState: userDataState = {
  token: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
  email: localStorage.getItem('email') || '',
  avatarUrl: localStorage.getItem('avatarUrl') || null,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    },
    removeUser: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.avatarUrl = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUsername, setEmail, setAvatarUrl, removeUser } =
  userDataSlice.actions;

export default userDataSlice.reducer;
