import { FC } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Flex, Pagination } from 'antd';

import { ArticleId } from '../types';
import { articlesApi } from '../api';
import ArticleMini from '../../../shared/UI/article-mini';

const ArticleList: FC = () => {
    const { offset = '0' } = useParams<{ offset: string }>();
    const numericOffset = Number(offset);

    console.log(offset, 'offset');

    const { data, isLoading } = articlesApi.useGetArticlesQuery(offset ?? skipToken);

    const navigate = useNavigate();

    const handleArticleClick = (slug: ArticleId) => {
        navigate(`/article/${slug}`, { replace: true });
    };

    return (
        <Flex vertical align="center">
            {data?.articles?.map((article) => (
                <Card
                    key={article.slug}
                    onClick={() => handleArticleClick(article.slug)}
                    loading={isLoading}
                    style={{ width: 938, marginBottom: '20px' }}
                    hoverable
                >
                    <ArticleMini article={article} />
                </Card>
            ))}
            <Pagination
                current={numericOffset / 5 + 1}
                total={data ? data.articlesCount : 0}
                pageSize={5}
                onChange={(page) => {
                    navigate(`/articles/${(page - 1) * 5}`, {
                        preventScrollReset: true,
                    });
                }}
                showSizeChanger={false}
            />
        </Flex>
    );
};

export default ArticleList;
