import { FC } from 'react';

import { HeartOutlined } from '@ant-design/icons';

import { Avatar, Flex } from 'antd';
import styles from './ArticlePage.module.scss';
import MyTags from '../MyTags';
import { Article } from '../../../modules/articles/types';
import ArticleBottons from '../article-bottons';

type ArticleMiniProps = {
    article: Article | undefined;
    isDetalis?: boolean | undefined;
};

const ArticleMini: FC<ArticleMiniProps> = ({ article, isDetalis }) => {
    if (article) {
        const data = new Date(article?.createdAt ?? '');
        return (
            <Flex justify="space-between">
                <div>
                    <span className={styles.title}>{article?.title}</span>{' '}
                    <HeartOutlined /> <span>{article?.favoritesCount}</span>
                    <MyTags tags={article?.tagList} />
                    <div className={styles.text}>{article?.description}</div>
                </div>
                <Flex vertical>
                    <Flex style={{ marginBottom: '30px' }}>
                        <div className={styles.authorInfo}>
                            <div className={styles.name}>{article?.author?.username}</div>
                            <div>
                                {data.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                        <Avatar src={article?.author?.image} size={44} />
                    </Flex>
                    {isDetalis ? (
                        <ArticleBottons
                            autorName={article.author.username}
                            slug={article.slug}
                        />
                    ) : null}
                </Flex>
            </Flex>
        );
    }
};

export default ArticleMini;
