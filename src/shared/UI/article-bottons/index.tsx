import { Button, Flex, Popconfirm } from 'antd';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articlesApi } from '../../../modules/articles/api';
import { ArticleId } from '../../../modules/articles/types';

const ArticleBottons: FC<{ autorName: string }> = ({ autorName }) => {
    const { id } = useParams<{ id: ArticleId }>();

    const navigate = useNavigate();

    const [deleteArticle, { error }] = articlesApi.useDeleteArticleMutation();
    console.log(id);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            const data = await deleteArticle(id).unwrap();
            navigate('/articles/0');

            setOpen(false);
            setConfirmLoading(false);

            console.log('delete success:', data);
        } catch (e) {
            console.log('delete error:', e);
            console.log('delete error2:', error);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleEdit: React.MouseEventHandler<HTMLSpanElement> = (e) => {
        e.stopPropagation();
        navigate('edit');
    };

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
