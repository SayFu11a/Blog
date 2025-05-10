import { AppThunk } from '../../../shared/redux';
import { removeDataFromLocalStorage } from '../lib/utils';
import {
  removeUser,
  setAvatarUrl,
  setEmail,
  setToken,
  setUsername,
} from './userDataSlice';

type userRegisterResponse = {
  token: string;
  username: string;
  email: string;
};

type userLogInResponse = {
  token: string;
  username: string;
  email: string;
  image: string;
};

type userEditResponse = {
  password: string | undefined;
  username: string | undefined;
  email: string | undefined;
  image: string | undefined;
  token: string;
};

export const registerSaveData =
  (user: userRegisterResponse): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    try {
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      dispatch(setToken(user.token));
      dispatch(setUsername(user.username));
      dispatch(setEmail(user.email));

      router.navigate('/articles/0');
    } catch (error) {
      console.error(error);
    }
  };

export const logInSaveData =
  (user: userLogInResponse): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    try {
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      dispatch(setToken(user.token));
      dispatch(setUsername(user.username));
      dispatch(setEmail(user.email));
      if (user.image) {
        dispatch(setAvatarUrl(user.image));
        localStorage.setItem('avatarUrl', user.image);
      }

      router.navigate('/articles/0');
    } catch (error) {
      console.error(error);
    }
  };

export const editUserSaveData =
  (user: userEditResponse): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    try {
      if (user.username) {
        localStorage.setItem('username', user.username);
        dispatch(setUsername(user.username));
      }
      if (user.email) {
        localStorage.setItem('email', user.email);
        dispatch(setEmail(user.email));
      }
      if (user.image) {
        dispatch(setAvatarUrl(user.image));
        localStorage.setItem('avatarUrl', user.image);
      }
      localStorage.setItem('token', user.token);
      dispatch(setToken(user.token));

      router.navigate('/articles/0');
    } catch (error) {
      console.error(error);
    }
  };

export const logOutCrearStore =
  (): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    try {
      dispatch(removeUser());
      removeDataFromLocalStorage();
      router.navigate('/articles/0');
    } catch (error) {
      console.error(error);
    }
  };
