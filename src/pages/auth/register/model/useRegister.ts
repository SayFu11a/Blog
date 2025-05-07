import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../../../entities/user/api/userApi';
import userService from '../../../../entities/user/lib/service';

type formData = {
  agreement: boolean;
  email: string;
  password: string;
  password2: string;
  username: string;
};

export function useRegister() {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: formData) => {
    console.log('Received values of form: ', values);
    try {
      const { username, email, password } = values;
      const userData = await registerUser({
        user: { username, email, password },
      }).unwrap();

      userService.setAllRegisterRespounseDate(userData.user);

      navigate('/articles/0');

      console.log('Registration success:', userData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return {
    onFinish,
  };
}
