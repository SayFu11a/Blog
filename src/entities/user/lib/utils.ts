const saveHelper = (key: string, val: string) => {
    localStorage.setItem(key, val);
};

export const saveToken = (token: string) => {
    saveHelper('token', token);
};

export const saveUsername = (username: string) => {
    saveHelper('username', username);
};

export const saveEmail = (email: string) => {
    saveHelper('email', email);
};

export const saveAvatarUrl = (avatarUrl: string) => {
    saveHelper('avatarUrl', avatarUrl);
};

export const removeDataFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('avatarUrl');
};
