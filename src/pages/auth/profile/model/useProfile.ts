import { useNavigate } from 'react-router-dom';
import { useEditUserMutation } from '../../../../entities/user/api/userApi';
import userService from '../../../../entities/user/lib/service';

type formData = {
  email: string;
  password: string;
  username: string;
  image: string;
};

export function useProfile() {
  const [editUser] = useEditUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: formData) => {
    try {
      console.log('Received values of form: ', values);
      const { username, email, password, image } = values;

      const userData = await editUser({
        user: {
          username,
          email,
          password,
          image,
          token: localStorage.getItem('token'),
        },
      }).unwrap();

      userService.setAllEditData(userData.user);
      navigate('/articles/0');

      console.log('edit success:', userData);
    } catch (e) {
      console.log('edit feils', e);
    }
  };

  return {
    onFinish,
  };
}
