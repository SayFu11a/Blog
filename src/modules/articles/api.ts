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
            query: (offsetNum) => ({
                url: `/articles/?limit=5&offset=${offsetNum}`,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Articles', { type: 'Articles', id: 'LIST' }, 'DeleteArticle'],
            transformResponse: (res: unknown) => ArticlesDtoSchema.parse(res),
        }),
        getArticle: create.query<Article, ArticleId>({
            query: (articleId) => `/articles/${articleId}`,
            providesTags: ['Articles'],
            transformResponse: (res: { article: Article }) =>
                ArticleDtoSchema.parse(res.article),
        }),
        createArticle: create.mutation({
            query: (articleData) => ({
                url: `/articles`,
                method: 'POST',
                body: articleData,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Articles'],
            transformResponse: (res: unknown) => res,
        }),
        editArticle: create.mutation({
            query: (articleData) => ({
                url: `/articles/${articleData.article.slug}`,
                method: 'PUT',
                body: articleData,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Articles'],
            transformResponse: (res: unknown) => res,
        }),
        deleteArticle: create.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['DeleteArticle'],
            transformResponse: (res: unknown) => res,
        }),
        likeArticle: create.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/favorite`,
                method: 'POST',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Articles'],
            transformResponse: (res: unknown) => res,
        }),
        unLikeArticle: create.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/favorite`,
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Articles'],
            transformResponse: (res: unknown) => res,
        }),
    }),
    overrideExisting: true,
});

// export const { useGetUsersQuery } = usersApi;
