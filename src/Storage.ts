const emailKey = 'email';
export const getEmail = () => {
    localStorage.setItem(emailKey, 'guest@gmail.com');
    return localStorage.getItem(emailKey);
};

export const storeEmail = (email: string) => {
    console.log(email);
    localStorage.setItem(emailKey, email);
};
