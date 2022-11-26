import { makeAutoObservable } from 'mobx';

import { getToken, removeToken, setToken } from '@app-fe/console-storage';
import { UserInfoModel } from '@app-fe/console-types';
import { fetchGetUserInfo } from '../apis/user';

export class UserStore {
  isLogin = !!getToken();

  userInfo: UserInfoModel = {
    id: '',
    nickname: '',
    avatar: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setToken = (token: string) => {
    this.isLogin = !!token;
    setToken(token);
  };

  removeToken = () => {
    removeToken();
    this.isLogin = false;
  };

  getUserInfo = (): Promise<UserInfoModel> => {
    const { userInfo } = this;

    if (userInfo.id) {
      return new Promise(resolve => {
        resolve(userInfo);
      });
    }

    return fetchGetUserInfo();
  };
}

export const userStore = new UserStore();
