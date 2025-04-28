import { FC } from 'react';

import { Button } from 'antd';

import clases from './Header.module.scss';

const Header: FC = () => {
    return (
        <header className={clases.header}>
            <div>Realworld Blog</div>
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
