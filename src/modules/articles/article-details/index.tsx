import { FC } from 'react';
import { articlesApi } from '../api';
import { useParams } from 'react-router-dom';
import { ArticleId } from '../types';
import { skipToken } from '@reduxjs/toolkit/query';
import ArticleMini from '../article-mini';
import { Card } from 'antd';

const ArticleDetails: FC = () => {
    const { id } = useParams<{ id: ArticleId }>();

    const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
        id ?? skipToken
    );

    console.log(article);
    console.log(isLoadingArticle);

    // return <ArticleMini article={data?.article} />;
    // return <>asdas</>;

    return (
        <Card loading={isLoadingArticle} style={{ width: 938 }} hoverable>
            <ArticleMini article={article} />
        </Card>
    );
};

export default ArticleDetails;
