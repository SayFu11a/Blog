import { useNavigate, useParams } from 'react-router-dom';
import { articlesApi } from '../../../entities/articles/api/articlesApi';
import { useState } from 'react';
import { ArticleId } from '../../../entities/articles/model/types';

export function useArticleBottons() {
  const { id } = useParams<{ id: ArticleId }>();

  const navigate = useNavigate();

  const [deleteArticle, { error }] = articlesApi.useDeleteArticleMutation();
  console.log(id);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const data = await deleteArticle(id).unwrap();
      navigate('/articles/0');

      setOpen(false);
      setConfirmLoading(false);

      console.log('delete success:', data);
    } catch (e) {
      console.log('delete error:', e);
      console.log('delete error2:', error);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleEdit: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    navigate('edit');
  };

  return {
    open,
    confirmLoading,
    showPopconfirm,
    handleOk,
    handleCancel,
    handleEdit,
  };
}
