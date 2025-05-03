import { z } from 'zod';
// import { baseApi } from '../../shared/api';
import { baseApi } from '../../shared/api';

// import { ArticlesData, ArticleId, Article } from './types';

export const registerApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        registerUser: create.mutation({
            query: (userData) => ({
                url: `/users`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (res: unknown) => res,
        }),
        logInUser: create.mutation({
            query: (userData) => ({
                url: `/users/login`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (res: unknown) => res,
        }),
        editUser: create.mutation({
            query: (userData) => ({
                url: `/user`,
                method: 'PUT',
                body: userData,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (res: unknown) => res,
        }),
    }),
    overrideExisting: true,
});

export const { useRegisterUserMutation, useLogInUserMutation, useEditUserMutation } =
    registerApi;
