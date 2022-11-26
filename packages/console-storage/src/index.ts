const saveLocalstorage = (key: string, content: string) => {
  window.localStorage.setItem(`[CONSOLE]${key}`, content);
};

const getLocalstorage = (key: string) => {
  return window.localStorage.getItem(`[CONSOLE]${key}`);
};

const removeLocalstorage = (key: string) => {
  window.localStorage.removeItem(`[CONSOLE]${key}`);
};

const TOKEN_KEY = 'TOKEN';
// const ROUTER_HISTORY_KEY = 'ROUTER_HISTORY';

export const setToken = (token: string) => {
  saveLocalstorage(TOKEN_KEY, token);
};

export const getToken = () => {
  return getLocalstorage(TOKEN_KEY);
};

export const removeToken = () => {
  removeLocalstorage(TOKEN_KEY);
};
