import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { store } from './store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { Provider } from 'react-redux';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
