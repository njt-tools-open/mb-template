/** 退出登录 */
const logout = () => {
  window.ConsoleJsBridge.logout();
};
/** 获取当前使用语言 */
const getLang = () => {
  return window.ConsoleJsBridge.getLang();
};
/** 设置语言 */
const setLang = (lng: string) => {
  window.ConsoleJsBridge.setLang(lng);
};
/** 监听语言变化 */
const onLangChange = (fn: (lng: string) => void) => {
  window.ConsoleJsBridge.onLangChange(fn);
};
/** 监听语言变化 */
const offLangChange = (fn: (lng: string) => void) => {
  window.ConsoleJsBridge.offLangChange(fn);
};

/** 获取路由结构 */
const getRoutes = () => {
  return window.ConsoleJsBridge.getRoutes();
};
/** 打开新标签 */
const navigateTo = (path: string) => {
  window.ConsoleJsBridge.navigateTo(path);
};

const consoleSDK = Object.assign(new Object(null), {
  logout,
  getLang,
  setLang,
  onLangChange,
  offLangChange,
  getRoutes,
  navigateTo,
});

/* TODO: Proxy */
window.consoleSDK = consoleSDK;

export { consoleSDK };
