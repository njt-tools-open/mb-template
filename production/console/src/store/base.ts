import { makeAutoObservable } from 'mobx';

import { RemoteInfoModel, RouteModel } from '@app-fe/types';

export const CONSOLE_LAYOUT_APP_BAR = '@app-fe/console-layout-app-bar';

export const CONSOLE_LAYOUT_NAV_BAR = '@app-fe/console-layout-nav-bar';

export class BaseStore {
  [CONSOLE_LAYOUT_APP_BAR]: RemoteInfoModel | null = null;
  [CONSOLE_LAYOUT_NAV_BAR]: RemoteInfoModel | null = null;

  routes: RouteModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNavbar = (data: any) => {
    this[CONSOLE_LAYOUT_NAV_BAR] = data;
  };

  setAppbar = (data: any) => {
    this[CONSOLE_LAYOUT_APP_BAR] = data;
  };

  setRoutes = (routes: RouteModel[]) => {
    this.routes = routes;
  };
}

export const baseStore = new BaseStore();
