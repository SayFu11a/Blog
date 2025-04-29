import { FC, useState } from 'react';

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    HeartOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Avatar, Card, Flex, Image, Switch } from 'antd';
import styles from './ArticlePage.module.scss';
import MyTags from '../../../shared/UI/MyTags';
import { ArticleId, ArticlesData } from '../types';
import { articlesApi } from '../api2';
import { useNavigate } from 'react-router-dom';

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

const ArticleList: FC = () => {
    const { data, isLoading } = articlesApi.useGetArticleQuery();

    const navigate = useNavigate();

    const handleArticleClick = (slug: ArticleId) => {
        navigate(slug, { relative: 'path' });
    };

    console.log(isLoading);

    return data?.articles?.map((article) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const data = new Date(article.createdAt);

        return (
            <Flex
                key={article.slug}
                gap="middle"
                align="center"
                vertical
                style={{ marginBottom: '26px' }}
            >
                {/* <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} /> */}
                <Card
                    onClick={() => handleArticleClick(article.slug)}
                    loading={isLoading}
                    style={{ width: 938 }}
                    hoverable
                >
                    <Flex justify="space-between">
                        <div>
                            <span className={styles.title}>{article?.title}</span>{' '}
                            <HeartOutlined /> <span>{article.favoritesCount}</span>
                            <MyTags tags={article.tagList} />
                            <div className={styles.text}>{article?.description}</div>
                        </div>
                        <Flex>
                            <div className={styles.authorInfo}>
                                <div className={styles.name}>
                                    {article.author.username}
                                </div>
                                <div>{data.toLocaleDateString('en-US', options)}</div>
                            </div>
                            <Avatar src={article.author.image} size={44} />
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        );
    });
};

export default ArticleList;
