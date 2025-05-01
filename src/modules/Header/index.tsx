import { FC } from 'react';

import { Button } from 'antd';

import clases from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => {
    return (
        <header className={clases.header}>
            <Button color="default" variant="link">
                <Link to="/articles/0">Realworld Blog</Link>
            </Button>

            <section>
                <Button color="default" variant="link">
                    Sign In
                </Button>
                <Button color="green" variant="outlined">
                    Sign Up
                </Button>
            </section>
        </header>
    );
};

export default Header;
