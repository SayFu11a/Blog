import { useNavigate } from 'react-router-dom';
import { useLogInUserMutation } from '../../../../entities/user/api/userApi';
import userService from '../../../../entities/user/lib/service';

type formData = {
  email: string;
  password: string;
  username: string;
};

export function useLogin() {
  const [loginUser, { isError }] = useLogInUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: formData) => {
    console.log('Received values of form: ', values);
    try {
      const { email, password } = values;
      const userData = await loginUser({
        user: { email: email.toLowerCase(), password },
      }).unwrap();

      userService.setAllLoginRespounseDate(userData.user);

      navigate('/articles/0');

      console.log('login success:', userData);
    } catch (error) {
      console.error('login failed:111111', error);
      console.error('login failed2:', isError);
    }
  };

  return {
    onFinish,
    isError,
  };
}
