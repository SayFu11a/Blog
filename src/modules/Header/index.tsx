import { FC } from 'react';

import { Avatar, Button } from 'antd';

import clases from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/hooks/use-auth';
import { removeUser } from '../auth/authDataSlice';
import { useAppDispath } from '../../app/store';
import authService from '../auth/service';

const defoltAvatarUrl =
    'https://avatars.mds.yandex.net/i?id=abd175a694c17c392bb27a8c7041ddea_sr-10109607-images-thumbs&n=13';

const Header: FC = () => {
    const { isAuth, username, avatarUrl } = useAuth();
    const dispatch = useAppDispath();
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
                        <Button color="default" variant="link">
                            <Link to="/articles/0">{username ?? 'null'}</Link>
                        </Button>
                        <Avatar
                            style={{ marginRight: '20px' }}
                            src={avatarUrl?.length !== 0 ? avatarUrl : defoltAvatarUrl}
                            size={44}
                        />
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
                            Sign In
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
