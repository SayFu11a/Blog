import { FC } from 'react';

import { articlesApi } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../../../shared/UI/article-form';
import { ArticleId } from '../types';
import { skipToken } from '@reduxjs/toolkit/query';

type formData = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

const ArticleEdit: FC = () => {
    const { id } = useParams<{ id: ArticleId }>();

    const navigate = useNavigate();

    const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
        id ?? skipToken
    );
    console.log(id);

    const [editArticle, { isLoading, error }] = articlesApi.useEditArticleMutation();

    const onFinish = async (values: formData) => {
        try {
            console.log('Received values of form: ', values);

            const data = await editArticle({
                article: { ...values, slug: id },
            }).unwrap();

            navigate('/articles/0', { replace: true });
            console.log('Edit success:', data);
        } catch (e) {
            console.log('Edit error:', e);
            console.log('Edit error2:', error);
        }
    };

    return (
        <ArticleForm
            onFinish={onFinish}
            title="Edit article"
            isEditing
            article={article}
        />
    );
};

export default ArticleEdit;
