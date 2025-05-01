// import styles from './ArticlePage.module.scss';
// import MyTags from '../../../shared/UI/MyTags';

import { FC, useState } from 'react';

import { Card, Flex, Pagination, PaginationProps } from 'antd';

import { ArticleId } from '../types';
import { articlesApi } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleMini from '../article-mini';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../app/store';
// import { skipArticles } from '../articleSlice';
import { skipToken } from '@reduxjs/toolkit/query';

const ArticleList: FC = () => {
    // const [skipCount, setSkipCount] = useState(0);

    // const skipCount = useSelector((state: RootState) => state.skipCount.value);
    // const dispatch = useDispatch();

    const { offset = '0' } = useParams<{ offset: string }>();
    const numericOffset = Number(offset);

    console.log(offset, 'offset');

    const { data, isLoading } = articlesApi.useGetArticlesQuery(offset ?? skipToken);

    const navigate = useNavigate();

    const handleArticleClick = (slug: ArticleId) => {
        navigate(`/article/${slug}`, { replace: true });
    };

    // const onChange: PaginationProps['onChange'] = (pageNumber) => {
    //     console.log('Page: ', pageNumber);
    //     dispatch(skipArticles(pageNumber !== 1 ? pageNumber * 5 : 0));
    //     console.log(skipCount, 'skipCount');

    //     navigate(`/articles/${pageNumber !== 1 ? pageNumber * 5 : 0}`, { replace: true });
    // };

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
                // defaultCurrent={numericOffset / 5 + 1}
                current={numericOffset / 5 + 1}
                // total={data ? Math.floor((data?.articlesCount / 5) * 10 - 1) : 0}
                total={data ? data.articlesCount : 0}
                pageSize={5}
                onChange={(page) => {
                    navigate(`/articles/${(page - 1) * 5}`);
                }}
                showSizeChanger={false}
            />
        </Flex>
    );
};

export default ArticleList;
