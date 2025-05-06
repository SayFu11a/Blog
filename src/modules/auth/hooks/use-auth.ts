import { useAppSelector } from '../../../app/store';

export function useAuth() {
    const { token, username, email, avatarUrl } = useAppSelector(
        (state) => state.authData
    );

    return {
        isAuth: !!token,
        username,
        email,
        avatarUrl,
        token,
    };
}
