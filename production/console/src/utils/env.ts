import { RemoteInfoModel } from '@app-fe/console-types';

const isDev = import.meta.env.DEV;

/** 装换模块名称为 Pascal 命名 */
export const transfromRemoteName = (name: string) => {
  return name
    .replace(/.+\//, '')
    .replace(/(^|-)[a-zA-Z]/g, s => s.toUpperCase())
    .replace(/[^\w]/g, '');
};

/** 获取 layout 模块资源路径 */
export const getRemotePath = ({
  name,
  port,
}: {
  name: string;
  port?: number;
}) => {
  const { origin, protocol, hostname, pathname } = window.location;

  if (isDev) {
    return `${protocol}//${hostname}:${port}`;
  }

  return `${origin}${pathname.replace(/\/$/, '')}/${name.replace(/.+\//, '')}`;
};

/** 获取远程模块 js 资源路径 */
export const getRemoteJs = (remote: RemoteInfoModel) => {
  const publicPath = getRemotePath(remote);
  return `${publicPath}/main.js?name=${remote.name}&v=${remote.version}`;
};
