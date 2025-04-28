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
import { Articles } from '../types';

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

const ArticlePage: FC<Articles> = ({ articls }) => {
    const [loading, setLoading] = useState<boolean>(false);

    // <div key={article.slug}>
    //     <span>{article?.title}</span>

    //     {/* <span>{article?.description}</span> */}
    // </div>

    return articls?.articles?.map((article) => {
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
                <Card loading={loading} style={{ width: 938 }}>
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

export default ArticlePage;
