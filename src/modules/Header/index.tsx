import { FC } from 'react';

import { Avatar, Button } from 'antd';
import clases from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/hooks/use-auth';
import authService from '../auth/service';

const defoltAvatarUrl =
    'https://avatars.mds.yandex.net/i?id=abd175a694c17c392bb27a8c7041ddea_sr-10109607-images-thumbs&n=13';

const Header: FC = () => {
    const { isAuth, username, avatarUrl } = useAuth();
    console.log(isAuth);

    return (
        <header className={clases.header}>
            <Button color="default" variant="link">
                <Link to="/articles/0">Realworld Blog</Link>
            </Button>
            <section>
                {isAuth ? (
                    <>
                        <Button
                            style={{ marginRight: '10px' }}
                            size="small"
                            color="green"
                            variant="outlined"
                        >
                            Create article
                        </Button>
                        <Link to="/profile">
                            <Button color="default" variant="link">
                                {username ?? 'null'}
                            </Button>
                            <div className={clases.avatarWrapper}>
                                <Avatar
                                    style={{ marginRight: '20px' }}
                                    src={
                                        avatarUrl?.length !== 0
                                            ? avatarUrl
                                            : defoltAvatarUrl
                                    }
                                    size={44}
                                />
                            </div>
                        </Link>
                        <Button
                            color="default"
                            variant="outlined"
                            onClick={authService.logOut}
                        >
                            Log Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="default" variant="link">
                            <Link to="/sign-in">Sign In</Link>
                        </Button>
                        <Button color="green" variant="outlined">
                            <Link to="/sign-up">Sign Up</Link>
                        </Button>
                    </>
                )}
            </section>
        </header>
    );
};

export default Header;

// qweeeeeqweqwe@ma.re
// 123123
