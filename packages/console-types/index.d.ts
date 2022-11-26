export interface RemoteInfoModel {
  name: string;
  port: number;
  version: string;
}

export declare interface RouteModel {
  name: string;
  path: string;
  version: string;
  port: number;
  index: number;
  displayName: Record<string, string>;
  children?: RouteModel[];
}

/** console js bridge */
export declare interface ConsoleJsBridge {
  /** 基础 */
  getAppBaseInfo: () => any;
  logout: () => void;
  /** 国际化 */
  getLang: () => string;
  setLang: (lng: string) => void;
  onLangChange: (fn: (lng: string) => void) => void;
  offLangChange: (fn: (lng: string) => void) => void;
  /** 路由 */
  navigateTo: (path: string) => void;
  navigateBack: () => void;
  redirectTo: (path: string) => void;
  closeAll: () => void;
  getQuery: () => Record<string, any>;
  getRoutes: () => RouteModel[];
  /** 请求 */
  fetch: (options: any) => void;
}

export declare interface UserInfoModel {
  id: string;
  nickname: string;
  avatar: string;
}
