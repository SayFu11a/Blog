import { z } from 'zod';
import { baseApi } from '../../shared/api';
// import { Article, UserId } from './users.slice';

import { Articles, ArticleId } from './types';

const ArticlesDtoSchema = z.object({
    articles: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            slug: z.string(),
            favoritesCount: z.number(),
            tagList: z.array(z.nullable(z.string())).optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
            author: z.object({
                username: z.string(),
                image: z.string(),
                following: z.boolean(),
            }),
        })
    ),
    articlesCount: z.number(),
});

export const articlesApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getArticle: create.query<Articles, void>({
            query: () => '/articles',
            providesTags: ['Articles', { type: 'Articles', id: 'LIST' }],
            transformResponse: (res: unknown) => ArticlesDtoSchema.parse(res),
        }),
        // getUser: create.query<User, UserId>({
        //     query: (userId) => `/users/${userId}`,
        //     providesTags: ['Users'],
        //     transformResponse: (res: unknown) => ArticlesDtoSchema.parse(res),
        // }),
        // deleteUser: create.mutation<void, UserId>({
        //     query: (userId) => ({ method: 'DELETE', url: `/users/${userId}` }),
        //     // invalidatesTags: ['Users'], // https://youtu.be/9NVDzMW6b1k?t=9195
        // }),
    }),
    overrideExisting: true,
});

// export const { useGetUsersQuery } = usersApi;
