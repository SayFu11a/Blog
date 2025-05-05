import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import Header from '../modules/Header';
import { store } from './store';
import { articlesApi } from '../modules/articles/api';
import ArticleList from '../modules/articles/article-list';
import ArticleDetails from '../modules/articles/article-details';
import Register from '../modules/auth/register';
import Login from '../modules/auth/login';
import Profile from '../modules/auth/profile';
import ArticleCreate from '../modules/articles/article-create';
import ArticleEdit from '../modules/articles/article-edit';

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
                loader: async ({ params }) => {
                    await loadStore();
                    store.dispatch(
                        articlesApi.util.prefetch('getArticles', params.offset ?? '0', {})
                    );
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
                path: 'article/:id/edit',
                element: <ArticleEdit />,
                // loader: ({ params }) => {
                //     loadStore().then(async () => {
                //         store.dispatch(
                //             articlesApi.util.prefetch('getArticle', params.id ?? '', {})
                //         );
                //     });
                //     return null;
                // },
            },
            {
                path: 'sign-up',
                element: <Register />,
            },
            {
                path: 'sign-in',
                element: <Login />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'new-article',
                element: <ArticleCreate />,
            },
        ],
    },
]);
