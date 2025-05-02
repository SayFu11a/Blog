import { store } from '../../app/store';
import { setAvatarUrl, setEmail, setToken, setUsername } from './authDataSlice';
import { saveAvatarUrl, saveEmail, saveToken, saveUsername } from './utils';

const authService = {
    setTokenFn: (token: string) => {
        saveToken(token);
        store.dispatch(setToken(token));
    },
    setUsernameFn: (username: string) => {
        saveUsername(username);
        store.dispatch(setUsername(username));
    },
    setEmailFn: (email: string) => {
        saveEmail(email);
        store.dispatch(setEmail(email));
    },
    setAvatarUrlFn: (avatarUrl: string) => {
        saveAvatarUrl(avatarUrl);
        store.dispatch(setAvatarUrl(avatarUrl));
    },
    setAllRegisterRespounseDate: (user: {
        token: string;
        username: string;
        email: string;
    }) => {
        saveToken(user.token);
        saveUsername(user.username);
        saveEmail(user.email);

        store.dispatch(setToken(user.token));
        store.dispatch(setUsername(user.username));
        store.dispatch(setEmail(user.email));
    },
};

export default authService;
