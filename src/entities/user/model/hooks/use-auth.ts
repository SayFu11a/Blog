// import { useAppSelector } from '../../../app/store'; //! закинуть в shered там сделать redux какой нибуть чтобы от туда экспортировать

import { useAppSelector } from '../../../../app/store';

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
