import { Button, Flex, Popconfirm } from 'antd';
import { FC } from 'react';
import { useArticleBottons } from '../model';

const ArticleBottons: FC<{ autorName: string }> = ({ autorName }) => {
  const { open, confirmLoading, showPopconfirm, handleOk, handleCancel, handleEdit } =
    useArticleBottons();

  return autorName === localStorage.getItem('username') ? (
    <Flex justify="right">
      <Popconfirm
        title="Are you sure to delete this article?"
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
        placement={'rightTop'}
      >
        <Button
          color="danger"
          variant="outlined"
          onClick={showPopconfirm}
          style={{ marginRight: '12px' }}
        >
          Delete
        </Button>
      </Popconfirm>{' '}
      <Button color="green" variant="outlined" onClick={handleEdit}>
        Edit
      </Button>
    </Flex>
  ) : null;
};

export default ArticleBottons;
