import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import { store } from './store';

import { articlesApi } from '../entities/articles/api/articlesApi';

import { ArticleList } from '../pages/articles/article-list';
import { ArticleDetails } from '../pages/articles/article-details';
import { ArticleEdit } from '../pages/articles/article-edit';
import { ArticleCreate } from '../pages/articles/article-create';

import { Profile } from '../pages/auth/profile';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';

import { Header } from '../widgets/header/ui';

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
            store.dispatch(articlesApi.util.prefetch('getArticle', params.id ?? '', {}));
          });
          return null;
        },
      },
      {
        path: 'article/:id/edit',
        element: <ArticleEdit />,
        loader: ({ params }) => {
          loadStore().then(async () => {
            store.dispatch(articlesApi.util.prefetch('getArticle', params.id ?? '', {}));
          }); // посмотреть нужен ли жтот лоудер вообще
          return null;
        },
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
