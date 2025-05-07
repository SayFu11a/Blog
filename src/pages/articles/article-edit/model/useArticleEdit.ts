import { useNavigate, useParams } from 'react-router-dom';
import { ArticleId } from '../../../../entities/articles/model/types';
import { articlesApi } from '../../../../entities/articles/api/articlesApi';
import { skipToken } from '@reduxjs/toolkit/query';

type formData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export function useArticleEdit() {
  const { id } = useParams<{ id: ArticleId }>();
  const navigate = useNavigate();
  const { data: article } = articlesApi.useGetArticleQuery(id ?? skipToken);
  console.log(id);
  const [editArticle, { error }] = articlesApi.useEditArticleMutation();

  const onFinish = async (values: formData) => {
    try {
      console.log('Received values of form: ', values);

      const data = await editArticle({
        article: { ...values, slug: id },
      }).unwrap();

      navigate(`/article/${data.article.slug}`);
      console.log('Edit success:', data);
    } catch (e) {
      console.log('Edit error:', e);
      console.log('Edit error2:', error);
    }
  };

  return {
    article,
    onFinish,
  };
}
