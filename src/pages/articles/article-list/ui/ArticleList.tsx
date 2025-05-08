import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Flex, Pagination } from 'antd';

import { ArticleItem } from '../../../../widgets/article-item';

import { ArticleId } from '../../../../entities/articles/model/types';
import { useArticleList } from '../model';
import LoaderList from '../../../../shared/ui/loader-list/LoaderList';

export const ArticleList: FC = () => {
  const { articles, isLoading, currentPage, totalPage } = useArticleList();
  const navigate = useNavigate();

  const handleArticleClick = (slug: ArticleId) => {
    navigate(`/article/${slug}`);
  };

  return (
    <Flex vertical align="center">
      {isLoading ? (
        <LoaderList />
      ) : (
        articles.map((article) => (
          <Card
            key={article.slug}
            onClick={() => handleArticleClick(article.slug)}
            style={{ width: 938, marginBottom: '20px' }}
            hoverable
          >
            <ArticleItem article={article} />
          </Card>
        ))
      )}
      <Pagination
        current={currentPage}
        total={totalPage * 5}
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
