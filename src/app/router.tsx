import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import Header from '../modules/Header';
import { store } from './store';
import { articlesApi } from '../modules/articles/api';
import ArticleList from '../modules/articles/article-list';
import ArticleDetails from '../modules/articles/article-details';
import Register from '../modules/auth/register';
// import { useAuth } from './internal';
import { useAuth as UseAuth } from '../modules/auth/hooks/use-auth';

const loadStore = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(store), 0);
    });

const auth = () => {
    const { isAuth, username } = UseAuth();
    return {
        isAuth,
        username,
    };
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                {auth().isAuth ? <>зареган</> : <Header />}
                {/* <Header /> */}
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
                path: 'sign-up',
                element: <Register />,
            },
        ],
    },
]);
