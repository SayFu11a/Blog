import { FC } from 'react';
import { Card, Flex } from 'antd';
import ArticleMini from '../../../../shared/UI/article-mini';
import Markdown from 'react-markdown';

import MyLoader from '../../../../shared/UI/skeleton';
import { useArticleDetails } from '../model';

export const ArticleDetails: FC = () => {
  const { article, isLoadingArticle } = useArticleDetails();

  if (isLoadingArticle) {
    return (
      <Flex justify="center">
        <MyLoader height={203} />
      </Flex>
    );
  }
  // поправить перенос строки для Markdown
  if (article) {
    return (
      <Flex justify="center">
        <Card style={{ width: 938 }}>
          <ArticleMini article={article} isDetalis />
          <Markdown>{article.body}</Markdown>
        </Card>
      </Flex>
    );
  }
};
