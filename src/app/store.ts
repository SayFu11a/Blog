import { configureStore } from '@reduxjs/toolkit';
// import { countersReduser } from '../modules/counters/counters.slice';

import { baseApi } from '../shared/api';
import { router } from './router';
import skipCountReduser from '../modules/articles/articleSlice';

export const extraArgument = {
    router,
};

export const store = configureStore({
    reducer: {
        skipCount: skipCountReduser,
        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
