import Cookies from 'js-cookie';

interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None';
  [property: string]: any;
}

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const destroyLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const setCookie = (name: string, value: string, option?: CookieAttributes) => {
  Cookies.set(name, value, option);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const destroyCookie = (key: string, option?: CookieAttributes) => {
  Cookies.remove(key, option || undefined);
};

export const getRefreshToken = () => {
  const refreshToken = getCookie('token');
  if (refreshToken) {
    return refreshToken.split(' ')[1];
  }
  return null;
};
