import { FC } from 'react';

import { articlesApi } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../../../shared/UI/article-form';

type formData = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

const ArticleEdit: FC = () => {
    // const [createArticleReqwest, { isLoading, error }] =
    //     articlesApi.useCreateArticleMutation();

    const { id } = useParams<{ id: ArticleId }>();

    const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
        id ?? skipToken
    );
    console.log(article);

    const onFinish = async (values: formData) => {
        try {
            console.log('Received values of form: ', values);

            // const data = await createArticleReqwest({
            //     article: { ...values },
            // }).unwrap();

            // navigate('/articles/0', { replace: true });
            // console.log('Create success:', data);
        } catch (e) {
            console.log('Create error:', e);
            console.log('Create error2:', error);
        }
    };

    return <ArticleForm onFinish={onFinish} title="Edit article" article={article} />;
};

export default ArticleEdit;
