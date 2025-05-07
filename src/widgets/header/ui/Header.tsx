import { FC } from 'react';

import { Avatar, Button } from 'antd';
import clases from './Header.module.scss';
import { Link } from 'react-router-dom';
import userService from '../../../entities/user/lib/service';
// import { useAuth } from '../../../entities/auth/model/hooks/use-auth';
import { useAuth } from '../../../entities/user/model/hooks/use-auth';

const defoltAvatarUrl =
  'https://avatars.mds.yandex.net/i?id=abd175a694c17c392bb27a8c7041ddea_sr-10109607-images-thumbs&n=13';

export const Header: FC = () => {
  const { isAuth, username, avatarUrl } = useAuth();

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
              <Link to="/new-article">Create article</Link>
            </Button>
            <Link to="/profile">
              <Button color="default" variant="link">
                {username ?? 'null'}
              </Button>
              <div className={clases.avatarWrapper}>
                <Avatar
                  style={{ marginRight: '20px' }}
                  src={avatarUrl ?? defoltAvatarUrl}
                  size={44}
                />
              </div>
            </Link>
            <Button color="default" variant="outlined" onClick={userService.logOut}>
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
