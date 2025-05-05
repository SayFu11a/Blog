import { FC } from 'react';

import { articlesApi } from '../api';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../../shared/UI/article-form';

type formData = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

const ArticleCreate: FC = () => {
    const [createArticleReqwest, { error }] = articlesApi.useCreateArticleMutation();

    const navigate = useNavigate();

    const onFinish = async (values: formData) => {
        try {
            console.log('Received values of form: ', values);

            const data = await createArticleReqwest({
                article: { ...values },
            }).unwrap();

            navigate(`/article/${data.article.slug}`, { replace: true });
            console.log('Create success:', data);
        } catch (e) {
            console.log('Create error:', e);
            console.log('Create error2:', error);
        }
    };

    return <ArticleForm onFinish={onFinish} title="Create new article" />;
};

export default ArticleCreate;
