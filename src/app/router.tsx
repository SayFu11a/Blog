import { createBrowserRouter, Link, Outlet, redirect } from 'react-router-dom';
// import { UsersList } from '../modules/users/users-list';
// import { Counters } from '../modules/counters/counters';
// import { UserInfo } from '../modules/users/user-info';
// import { usersApi } from '../modules/users/api';

import Header from '../shared/UI/Header';
import ArticleList from '../modules/articles/article-list';

import { store } from './store';

const loadStore = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(store), 0);
    });

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Header />
                <Link to="articles">acrticles</Link> <Link to="shis">shis</Link>
                <section
                    style={{
                        backgroundColor: 'rgba(235, 238, 243, 1)',
                        padding: '26px 0px',
                    }}
                >
                    <Outlet />
                </section>
            </>
        ),
        children: [
            {
                index: true,
                loader: () => redirect('/articles'),
            },
            {
                path: 'articles',
                element: <ArticleList />,
                // loader: () => {
                //     loadStore().then(async () => {
                //         store.dispatch(
                //             usersApi.util.prefetch('getUsers', undefined, {})
                //         );
                //     });
                //     return null;
                // },
            },
            // {
            //     path: 'articles/:id',
            //     element: <UserInfo />,
            //     // loader: ({ params }) => {
            //     //     loadStore().then(async () => {
            //     //         store.dispatch(
            //     //             usersApi.util.prefetch('getUser', params.id ?? '', {})
            //     //         );
            //     //     });
            //     //     return null;
            //     // },
            // },
            {
                path: 'shis',
                element: <>shis shis</>,
            },
        ],
    },
]);
