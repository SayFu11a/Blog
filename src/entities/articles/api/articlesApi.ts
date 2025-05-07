import { baseApi } from '../../../shared/api';

import { ArticlesData, ArticleId, Article } from '../model/types';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query<ArticlesData, string>({
      query: (offsetNum) => ({
        url: `/articles/?limit=5&offset=${offsetNum}`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['Articles', 'DeleteArticle'], // исправить теги как то: если поставлен лайк то весь кеш обновляется, а не имеено того page где были лайки
      // transformResponse: (res: unknown) => ArticlesDtoSchema.parse(res),
      transformResponse: (res: ArticlesData) => res,
    }),
    getArticle: create.query<Article, ArticleId>({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),
      providesTags: ['Articles'],
      transformResponse: (res: { article: Article }) => res.article,
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
      transformResponse: (res: { article: Article }) => res,
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
      transformResponse: (res: { article: Article }) => res,
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
