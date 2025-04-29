import { createBrowserRouter, Link, Outlet, redirect } from 'react-router-dom';

import Header from '../shared/UI/Header';
// import ArticleList from '../modules/articles/article-list';

import { store } from './store';
import { articlesApi } from '../modules/articles/api2';
import ArticleList from '../modules/articles/article-list';

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
                loader: () => {
                    loadStore().then(async () => {
                        store.dispatch(
                            articlesApi.util.prefetch('getArticle', undefined, {})
                        );
                    });
                    return null;
                },
            },
            {
                path: 'articles/:id',
                element: <>detals</>,
                loader: ({ params }) => {
                    loadStore().then(async () => {
                        // store.dispatch(
                        console.log(params.id);

                        // usersApi.util.prefetch('getUser', params.id ?? '', {})
                        // );
                    });
                    return null;
                },
            },
            {
                path: 'shis',
                element: <>shis shis</>,
            },
        ],
    },
]);
