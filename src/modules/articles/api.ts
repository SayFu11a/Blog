import { z } from 'zod';
import { baseApi } from '../../shared/api';

import { ArticlesData, ArticleId, Article } from './types';

const ArticleDtoSchema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    favoritesCount: z.number(),
    tagList: z.array(z.nullable(z.string())).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    favorited: z.boolean(),
    body: z.string().optional(),
    author: z.object({
        username: z.string(),
        image: z.string(),
        following: z.boolean(),
    }),
});

const ArticlesDtoSchema = z.object({
    articles: z.array(ArticleDtoSchema),
    articlesCount: z.number(),
});

export const articlesApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getArticles: create.query<ArticlesData, string>({
            query: (offsetNum) => `/articles/?limit=5&offset=${offsetNum}`,
            providesTags: ['Articles', { type: 'Articles', id: 'LIST' }],
            transformResponse: (res: unknown) => ArticlesDtoSchema.parse(res),
        }),
        getArticle: create.query<Article, ArticleId>({
            query: (articleId) => `/articles/${articleId}`,
            providesTags: ['Articles'],
            transformResponse: (res: { article: Article }) =>
                ArticleDtoSchema.parse(res.article),
        }),
        // deleteUser: create.mutation<void, UserId>({
        //     query: (userId) => ({ method: 'DELETE', url: `/users/${userId}` }),
        //     // invalidatesTags: ['Users'], // https://youtu.be/9NVDzMW6b1k?t=9195
        // }),
    }),
    overrideExisting: true,
});

// export const { useGetUsersQuery } = usersApi;
