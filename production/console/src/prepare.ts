import axios from 'axios';

import { register as registerRemoteAdapter } from '@app-fe/remote-adapter';

import {
  CONSOLE_LAYOUT_APP_BAR,
  CONSOLE_LAYOUT_NAV_BAR,
  baseStore,
} from './store/base';

const registerRemoteModules = () => {
  return axios.get('/production-manifest.json');
};

export const prepare = (cb: () => void) => {
  registerRemoteAdapter();

  registerRemoteModules()
    .then(res => {
      if (res.status === 200) {
        baseStore.setAppbar(res.data[CONSOLE_LAYOUT_APP_BAR]);
        baseStore.setNavbar(res.data[CONSOLE_LAYOUT_NAV_BAR]);
        baseStore.setRoutes(res.data.routes);
        cb();
        return;
      }
      window.alert('Load Manifest error!');
    })
    .catch(() => {
      window.alert('Load Manifest error!');
    });
};
