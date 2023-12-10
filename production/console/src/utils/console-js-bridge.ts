import { baseStore } from '../store/base';
import { userStore } from '../store/user';
import i18n, { getAntdLang } from '../translation';
import { BRIDGE_NAVIGATE_TO, BridgeEvent } from './listeners';

const getAppBaseInfo = (): any => {};

const logout = () => {
  userStore.removeToken();
};

const getUserInfo = () => {};

const getLang = () => {
  return i18n.language;
};

const getAntdUseLang = () => {
  return getAntdLang(i18n.language);
};

const setLang = (lng: string) => {
  i18n.changeLanguage(lng);
};
const onLangChange = (fn: (lng: string) => void) => {
  i18n.on('languageChanged', fn);
};
const offLangChange = (fn: (lng: string) => void) => {
  i18n.off('languageChanged', fn);
};
const navigateTo = (path: string) => {
  BridgeEvent.emit(BRIDGE_NAVIGATE_TO, path);
};

const navigateBack = () => {};
const redirectTo = (path: string) => {
  console.log(path);
};
const closeAll = () => {};
const getQuery = () => {
  return {};
};
const getRoutes = () => {
  return baseStore.routes;
};
const fetch = (_options: any) => {};

const ConsoleJsBridge = {
  getAppBaseInfo,
  logout,
  getUserInfo,
  getLang,
  setLang,
  getAntdUseLang,
  onLangChange,
  offLangChange,
  navigateTo,
  navigateBack,
  redirectTo,
  closeAll,
  getQuery,
  getRoutes,
  fetch,
};

/** 注册 app-js-bridge */
export const registerJsBridge = () => {
  if (window.ConsoleJsBridge) {
    console.warn('[WARN] ConsoleJsBridge is registed');
    return;
  }
  window.ConsoleJsBridge = ConsoleJsBridge;
};
