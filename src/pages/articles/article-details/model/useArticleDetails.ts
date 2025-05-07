import { useParams } from 'react-router-dom';
import { ArticleId } from '../../../../entities/articles/model/types';
import { articlesApi } from '../../../../entities/articles/api/articlesApi';
import { skipToken } from '@reduxjs/toolkit/query';

export function useArticleDetails() {
  const { id } = useParams<{ id: ArticleId }>();

  const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
    id ?? skipToken
  );

  return {
    article,
    isLoadingArticle,
  };
}
