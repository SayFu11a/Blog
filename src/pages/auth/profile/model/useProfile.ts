import { useEditUserMutation } from '../../../../entities/user/api/userApi';
import { useAppDispath } from '../../../../shared/redux';
import { editUserSaveData } from '../../../../entities/user/model/userThunks';

type formData = {
  email: string;
  password: string;
  username: string;
  image: string;
};

export function useProfile() {
  const [editUser, { error }] = useEditUserMutation();
  const dispatch = useAppDispath();

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

      dispatch(editUserSaveData(userData.user));

      console.log('edit success:', userData);
    } catch (e) {
      console.log('edit feils', e);
    }
  };

  return {
    onFinish,
    error,
  };
}
