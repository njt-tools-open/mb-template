import { UserInfoModel } from '@app-fe/console-types';

/** 登录 */
export const fetchLogin = (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Date.now().toString());
    });
  });
};

/** 登出 */
export const fetchLogout = () => {};

/** 获取用户信息 */
export const fetchGetUserInfo = (): Promise<UserInfoModel> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: '111111',
        nickname: 'xxxxxx',
        avatar: '',
      });
    }, 2000);
  });
};
