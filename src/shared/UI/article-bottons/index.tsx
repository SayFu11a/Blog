import { Button, Flex } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const ArticleBottons: FC<{ autorName: string; slug: string }> = ({ autorName, slug }) => {
    return autorName === localStorage.getItem('username') ? (
        <Flex justify="right">
            <Button color="danger" variant="outlined" style={{ marginRight: '12px' }}>
                Delete
            </Button>{' '}
            <Button color="green" variant="outlined">
                <Link to="edit">Edit</Link>
            </Button>
        </Flex>
    ) : null;
};

export default ArticleBottons;
