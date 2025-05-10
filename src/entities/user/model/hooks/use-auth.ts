import { useAppSelector } from '../../../../shared/redux';

export function useAuth() {
  const { token, username, email, avatarUrl } = useAppSelector((state) => state.userData);

  return {
    isAuth: !!token,
    username,
    email,
    avatarUrl,
    token,
  };
}
