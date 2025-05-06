// import { z } from 'zod';
// import { baseApi } from '../../shared/api';
import { baseApi } from '../../shared/api';

// import { ArticlesData, ArticleId, Article } from './types';

type getUserData = {
    user: {
        image: string | undefined;
    };
};

type registerData = {
    user: {
        token: string;
        username: string;
        email: string;
    };
};

type editData = {
    user: {
        password: string | undefined;
        username: string | undefined;
        email: string | undefined;
        image: string | undefined;
        token: string;
    };
};

type loginData = {
    user: {
        token: string;
        username: string;
        email: string;
        image: string;
    };
};

export const registerApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getUser: create.query({
            query: () => ({
                url: `/user`,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Auth'],
            transformResponse: (res: getUserData) => res,
        }),
        registerUser: create.mutation({
            query: (userData) => ({
                url: `/users`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (res: registerData) => res,
        }),
        logInUser: create.mutation({
            query: (userData) => ({
                url: `/users/login`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
            transformResponse: (res: loginData) => res,
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
            transformResponse: (res: editData) => res,
        }),
    }),
    overrideExisting: true,
});

export const {
    useRegisterUserMutation,
    useLogInUserMutation,
    useEditUserMutation,
    useGetUserQuery,
} = registerApi;
