import { useNavigate } from 'react-router-dom';
import { articlesApi } from '../../../../entities/articles/api/articlesApi';

type formData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export function useArticleCreate() {
  const [createArticleReqwest, { error }] = articlesApi.useCreateArticleMutation();

  const navigate = useNavigate();

  const onFinish = async (values: formData) => {
    try {
      console.log('Received values of form: ', values);

      const data = await createArticleReqwest({
        article: { ...values },
      }).unwrap();

      navigate('/articles/0');
      console.log('Create success:', data);
    } catch (e) {
      console.log('Create error:', e);
      console.log('Create error2:', error);
    }
  };

  return {
    onFinish,
  };
}
