import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Card, Flex } from 'antd';
import { articlesApi } from '../api';
import { ArticleId } from '../types';
import ArticleMini from '../../../shared/UI/article-mini';
import Markdown from 'react-markdown';

import styles from './article-details.module.scss';

const ArticleDetails: FC = () => {
    const { id } = useParams<{ id: ArticleId }>();

    const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
        id ?? skipToken
    );

    console.log(article);
    console.log(isLoadingArticle);

    // return <ArticleMini article={data?.article} />;
    // return <>asdas</>;

    if (article) {
        return (
            <Flex justify="center">
                <Card
                    loading={isLoadingArticle}
                    style={{ width: 938 }}
                    className={styles.wrapper}
                >
                    <ArticleMini article={article} />
                    <Markdown>{article.body}</Markdown>
                </Card>
            </Flex>
        );
    }
};

export default ArticleDetails;

// http://localhost:5173/articles/123-oe2l18
