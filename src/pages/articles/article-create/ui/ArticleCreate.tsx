import { FC } from 'react';

import { ArticleForm } from '../../../../shared/UI/article-form';
import { useArticleCreate } from '../model';

export const ArticleCreate: FC = () => {
  const { onFinish } = useArticleCreate();

  return <ArticleForm onFinish={onFinish} title="Create new article" />;
};
