import { FC } from 'react';

import { ArticleForm } from '../../../../shared/UI/article-form';

import { useArticleEdit } from '../model';

export const ArticleEdit: FC = () => {
  const { article, onFinish } = useArticleEdit();

  return (
    <ArticleForm onFinish={onFinish} title="Edit article" isEditing article={article} />
  );
};
