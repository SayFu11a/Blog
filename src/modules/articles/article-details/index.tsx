import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Card, Flex } from 'antd';
import { articlesApi } from '../api';
import { ArticleId } from '../types';
import ArticleMini from '../../../shared/UI/article-mini';
import Markdown from 'react-markdown';

import styles from './article-details.module.scss';
import MyLoader from '../../../shared/UI/skeleton';

const ArticleDetails: FC = () => {
    const { id } = useParams<{ id: ArticleId }>();

    const { data: article, isLoading: isLoadingArticle } = articlesApi.useGetArticleQuery(
        id ?? skipToken
    );

    if (isLoadingArticle) {
        return (
            <Flex justify="center">
                <MyLoader height={203} />
            </Flex>
        );
    }

    if (article) {
        return (
            <Flex justify="center">
                <Card style={{ width: 938 }} className={styles.wrapper}>
                    <ArticleMini article={article} isDetalis />
                    <Markdown>{article.body}</Markdown>
                </Card>
            </Flex>
        );
    }
};

export default ArticleDetails;

// http://localhost:5173/articles/123-oe2l18
