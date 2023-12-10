import { initReactI18next } from 'react-i18next';

import * as i18next from 'i18next';

import { RouteModel } from '@app-fe/types';

import en_US from '../locales/en_US.json';
import none from '../locales/none.json';
import zh_CN from '../locales/zh_CN.json';

const resources = {
  none: {
    translation: none,
  },
  zh_CN: {
    translation: zh_CN,
  },
  en_US: {
    translation: en_US,
  },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: window.consoleSDK.getLang(),
  interpolation: {
    escapeValue: false,
  },
});

const addI18nResources = (routes: RouteModel[]) => {
  routes.forEach(route => {
    if (!route.displayName) return;

    for (const key in route.displayName) {
      i18n.addResource(key, 'translation', route.name, route.displayName[key]);
    }

    if (route.children) addI18nResources(route.children);
  });
};

// 添加侧边栏国际化资源
const routes: RouteModel[] = window.consoleSDK.getRoutes();

addI18nResources(routes);

export default i18n;
