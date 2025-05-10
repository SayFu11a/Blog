import { FC } from 'react';

import { Avatar, Button } from 'antd';
import clases from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../entities/user/model/hooks/use-auth';
import { useAppDispath } from '../../../shared/redux';
import { logOutCrearStore } from '../../../entities/user/model/userThunks';

const defoltAvatarUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export const Header: FC = () => {
  const { isAuth, username, avatarUrl } = useAuth();
  const dispatch = useAppDispath();

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
            <Button
              color="default"
              variant="outlined"
              onClick={() => dispatch(logOutCrearStore())}
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
