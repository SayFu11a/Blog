import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface skipCountState {
    value: number;
}

const initialState: skipCountState = {
    value: 0,
};

export const skipCountSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        skipArticlesByAmount: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { skipArticlesByAmount: skipArticles } = skipCountSlice.actions;

export default skipCountSlice.reducer;
