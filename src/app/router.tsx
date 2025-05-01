import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

import Header from '../modules/Header';
// import ArticleList from '../modules/articles/article-list';

import { store } from './store';
import { articlesApi } from '../modules/articles/api';
import ArticleList from '../modules/articles/article-list';
import ArticleDetails from '../modules/articles/article-details';
// import { Pagination } from 'antd';

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
                <section className="main-section">
                    <Outlet />
                </section>
            </>
        ),
        children: [
            {
                index: true,
                loader: () => redirect('/articles/0'),
            },
            {
                path: 'articles/:offset',
                element: <ArticleList />,
                loader: ({ params }) => {
                    loadStore().then(async () => {
                        store.dispatch(
                            articlesApi.util.prefetch(
                                'getArticles',
                                params.offset ?? '0',
                                {}
                            )
                        );
                    });
                    return null;
                },
            },
            {
                path: 'article/:id',
                element: <ArticleDetails />,
                loader: ({ params }) => {
                    loadStore().then(async () => {
                        store.dispatch(
                            articlesApi.util.prefetch('getArticle', params.id ?? '', {})
                        );
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
