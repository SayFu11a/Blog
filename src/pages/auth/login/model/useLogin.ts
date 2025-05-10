import { useLogInUserMutation } from '../../../../entities/user/api/userApi';
import { logInSaveData } from '../../../../entities/user/model/userThunks';
import { useAppDispath } from '../../../../shared/redux';

type formData = {
  email: string;
  password: string;
  username: string;
};

export function useLogin() {
  const [loginUser, { isError }] = useLogInUserMutation();
  const dispatch = useAppDispath();

  const onFinish = async (values: formData) => {
    console.log('Received values of form: ', values);
    try {
      const { email, password } = values;
      const userData = await loginUser({
        user: { email: email.toLowerCase(), password },
      }).unwrap();

      dispatch(logInSaveData(userData.user));

      console.log('login success:', userData);
    } catch (error) {
      console.error('login failed:1', error);
      console.error('login failed2:', isError);
    }
  };

  return {
    onFinish,
    isError,
  };
}
