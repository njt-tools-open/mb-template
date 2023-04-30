import { initReactI18next } from 'react-i18next';

import * as i18next from 'i18next';

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
  lng: 'zh_CN',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
