export const removeDataFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('avatarUrl');
};
