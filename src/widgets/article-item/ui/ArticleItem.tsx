import { FC } from 'react';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { Avatar, Flex } from 'antd';
import styles from './ArticleItem.module.scss';
import MyTags from './MyTags';
import { Article } from '../../../entities/articles/model/types';
import ArticleBottons from './ArticleBottons';
import { useArticleItem } from '../model';

type ArticleItemProps = {
  article: Article | undefined;
  isDetalis?: boolean | undefined;
};

export const ArticleItem: FC<ArticleItemProps> = ({ article, isDetalis }) => {
  const { likeHandle, unLikeHandle } = useArticleItem(article?.slug);

  if (article) {
    const data = new Date(article?.createdAt ?? '');
    return (
      <Flex justify="space-between">
        <div style={{ transition: 'all 0.2s ease-in-out' }}>
          <Flex align="center">
            <span className={styles.title}>{article?.title}</span>{' '}
            {article.favorited ? (
              <HeartFilled
                style={{ color: 'red' }}
                className={styles.heart}
                onClick={unLikeHandle}
              />
            ) : (
              <HeartOutlined className={styles.heart} onClick={likeHandle} />
            )}
            <span style={{ marginLeft: '5px' }}>{article?.favoritesCount}</span>
          </Flex>
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
          {isDetalis ? <ArticleBottons autorName={article.author.username} /> : null}
        </Flex>
      </Flex>
    );
  }
};
