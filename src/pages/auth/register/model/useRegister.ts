// import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useRegisterUserMutation } from '../../../../entities/user/api/userApi';
// import userService from '../../../../entities/user/lib/service';
import { registerSaveData } from '../../../../entities/user/model/userThunks';
import { useAppDispath } from '../../../../shared/redux';

type formData = {
  agreement: boolean;
  email: string;
  password: string;
  password2: string;
  username: string;
};

export function useRegister() {
  const [registerUser, { error }] = useRegisterUserMutation();

  const dispatch = useAppDispath();

  const onFinish = async (values: formData) => {
    console.log('Received values of form: ', values);
    try {
      const { username, email, password } = values;
      const userData = await registerUser({
        user: { username, email, password },
      }).unwrap();
      dispatch(registerSaveData(userData.user));
      console.log('Registration success:', userData);
    } catch (err) {
      console.error('Registration failed:', err);
      console.error('registerError22222:', error);
    }
  };

  return {
    onFinish,
    error: error as FetchBaseQueryError | SerializedError,
  };
}
