import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface authDataState {
    token: string | null;
    username: string | null;
    email: string | null;
    avatarUrl: string | null;
}

const initialState: authDataState = {
    token: localStorage.getItem('authToken') || '',
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    avatarUrl: localStorage.getItem('avatarUrl') || '',
};

export const authDataSlice = createSlice({
    name: 'authData',
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
    authDataSlice.actions;

export default authDataSlice.reducer;
