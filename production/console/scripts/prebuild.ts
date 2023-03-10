import path from 'path';
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';

import { RouteModel } from '@app-fe/types';

const transformJson = (filename: string): any => {
  return JSON.parse(readFileSync(filename, { encoding: 'utf8' }));
};

const dist = path.join(__dirname, '../src/.settings');

const productionName = transformJson(
  path.join(__dirname, '../package.json')
).name.replace(/.+\//, '');

const remotesFolder = path.join(
  __dirname,
  `../../../remotes/${productionName}`
);

const atRemote = (name: string) => path.join(remotesFolder, name);
const atdist = (name: string) => path.join(dist, name);

/** 转换 package name 为 Parscal 命名 */
const transfromPkgName = (name: string) => {
  return name
    .replace(/.+\//, '')
    .replace(/[a-z]/g, s => s.toUpperCase())
    .replace(/-/g, '_');
};

/** 收集远程文件 */
const collectRemotes = (type: 'layout' | 'module') => {
  const packages = readdirSync(remotesFolder).filter(folder => {
    return (
      statSync(atRemote(folder)).isDirectory() &&
      transformJson(`${atRemote(folder)}/package.json`).remoteManifest.type ===
        type
    );
  });

  return packages;
};

/** 生成布局文件 */
const createLayoutFile = () => {
  const packages = collectRemotes('layout');

  const packageInfoList = packages.map(pkg => {
    const { name, version, remoteManifest } = transformJson(
      `${atRemote(pkg)}/package.json`
    );
    return {
      name,
      version,
      displayName: remoteManifest.displayName,
      port: remoteManifest.port,
    };
  });

  const content = `${packageInfoList
    .map(pkg => {
      return `
/** ${pkg.displayName} */
export const ${transfromPkgName(pkg.name)} = '${pkg.name}';`;
    })
    .join('\n')}

/** 布局组件 */
export const LAYOUT_LIST = [
  ${packageInfoList
    .map(pkg => {
      return `{
    name: ${transfromPkgName(pkg.name)},
    version: '${pkg.version}',
    port: ${pkg.port},
  },`;
    })
    .join('\n')}
];
  `;

  writeFileSync(atdist('layout.ts'), content);
};

interface RoutePkgInfo {
  name: string;
  version: string;
  production: string;
  displayName: Record<string, string>;
  port: number;
  parentName?: string;
  index: number;
}

const transformRoutes = (
  pkgs: RoutePkgInfo[],
  parent?: RouteModel
): RouteModel[] => {
  const routes: RouteModel[] = [];
  pkgs.forEach(
    ({ parentName, name, production, version, port, index, displayName }) => {
      if (parentName === parent?.name) {
        const current: RouteModel = {
          name,
          path: name.replace(new RegExp(`^[^/]+/${production}-`), '/'),
          version,
          port,
          index,
          displayName,
          children: [],
        };
        const children = transformRoutes(pkgs, current);
        current.children = children.sort((a, b) => a.index - b.index);
        if (!children.length) {
          delete current.children;
        }
        routes.push(current);
      }
    }
  );
  return routes.sort((a, b) => a.index - b.index);
};

/** 生成路由文件 */
const createRoutesFile = () => {
  const packages = collectRemotes('module').map(pkg => {
    const { name, version, remoteManifest } = transformJson(
      `${atRemote(pkg)}/package.json`
    );
    return {
      name: name as string,
      version: version as string,
      production: remoteManifest.production,
      displayName: remoteManifest.displayName as Record<string, string>,
      port: remoteManifest.port as number,
      parentName: remoteManifest.parentName as string,
      index: remoteManifest.index as number,
    };
  });
  const routes = transformRoutes(packages);
  const content = `
export const routes = ${JSON.stringify(routes, null, 2)}
  `;
  writeFileSync(atdist('routes.ts'), content);
};

/** 预构建文件 */
const prebuild = () => {
  mkdirSync(dist);

  createLayoutFile();
  createRoutesFile();

  process.exit(0);
};

prebuild();
