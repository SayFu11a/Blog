import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../shared/api';
import { router } from './router';
import skipCountReduser from '../entities/articles/model/articleSlice';
import userDataReduser from '../entities/user/model/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';

export const extraArgument = {
  router,
};

export const store = configureStore({
  reducer: {
    userData: userDataReduser,
    skipCount: skipCountReduser,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
