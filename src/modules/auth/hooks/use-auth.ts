// import { useAppSelector } from '../../../app/internal';

import { useAppSelector } from '../../../app/store';

// const loadStore = () =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(store), 0);
//     });

export function useAuth() {
    const { token, username, email, avatarUrl } = useAppSelector(
        (state) => state.authData
    );

    return {
        isAuth: !!token,
        username,
        email,
        avatarUrl,
    };
}
