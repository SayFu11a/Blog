import { store } from '../../app/store';
import {
    removeUser,
    setAvatarUrl,
    setEmail,
    setToken,
    setUsername,
} from './authDataSlice';
import {
    removeDataFromLocalStorage,
    saveAvatarUrl,
    saveEmail,
    saveToken,
    saveUsername,
} from './utils';

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
    setAllLoginRespounseDate: (user: {
        token: string;
        username: string;
        email: string;
        image: string;
    }) => {
        saveToken(user.token);
        saveUsername(user.username);
        saveEmail(user.email);
        saveAvatarUrl(user.image);

        store.dispatch(setAvatarUrl(user.image));
        store.dispatch(setToken(user.token));
        store.dispatch(setUsername(user.username));
        store.dispatch(setEmail(user.email));
    },
    setAllEditData: (user: {
        password: string | undefined;
        username: string | undefined;
        email: string | undefined;
        image: string | undefined;
        token: string;
    }) => {
        if (user.username) {
            saveUsername(user.username);
            store.dispatch(setUsername(user.username));
        }
        if (user.email) {
            saveEmail(user.email);
            store.dispatch(setEmail(user.email));
        }
        if (user.image) {
            saveAvatarUrl(user.image);
            store.dispatch(setAvatarUrl(user.image));
        }

        store.dispatch(setToken(user.token));
        saveToken(user.token);
    },
    logOut: () => {
        store.dispatch(removeUser());
        removeDataFromLocalStorage();
    },
};

export default authService;
