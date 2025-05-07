import { skipToken } from '@reduxjs/toolkit/query';
import { articlesApi } from '../../../../entities/articles/api/articlesApi';
import { useParams } from 'react-router-dom';

export function useArticleList() {
  const { offset = '0' } = useParams<{ offset: string }>(); // !проверить: если тут дефольный "0" то есть ли смысл в skiptoken
  const numericOffset = Number(offset);
  const { data, isLoading } = articlesApi.useGetArticlesQuery(offset ?? skipToken);
  const currentPage = numericOffset / 5 + 1;
  const totalPage = data ? Math.ceil(data.articlesCount / 5) : 0;

  return {
    articles: data?.articles ?? [],
    isLoading,
    currentPage,
    totalPage,
  };
}
