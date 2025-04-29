// import styles from './ArticlePage.module.scss';
// import MyTags from '../../../shared/UI/MyTags';

import { FC } from 'react';

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    HeartOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Avatar, Card, Flex, Image, Switch } from 'antd';

import { ArticleId, ArticlesData } from '../types';
import { articlesApi } from '../api';
import { useNavigate } from 'react-router-dom';
import ArticleMini from '../article-mini';

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

const ArticleList: FC = () => {
    const { data, isLoading } = articlesApi.useGetArticlesQuery();

    const navigate = useNavigate();

    const handleArticleClick = (slug: ArticleId) => {
        navigate(slug, { relative: 'path' });
    };

    console.log(isLoading);

    return data?.articles?.map((article) => {
        return (
            <Flex
                key={article.slug}
                gap="middle"
                align="center"
                vertical
                style={{ marginBottom: '26px' }}
            >
                <Card
                    onClick={() => handleArticleClick(article.slug)}
                    loading={isLoading}
                    style={{ width: 938 }}
                    hoverable
                >
                    <ArticleMini article={article} />
                </Card>
            </Flex>
        );
    });
};

export default ArticleList;
