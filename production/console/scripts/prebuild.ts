import * as fs from 'fs';
import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

import { RouteModel } from '@app-fe/types';

const transformJson = (filename: string): any => {
  return JSON.parse(readFileSync(filename, { encoding: 'utf8' }));
};

const productionName = transformJson(
  path.join(__dirname, '../package.json')
).name.replace(/.+\//, '');

const remotesFolder = path.join(
  __dirname,
  `../../../remotes/${productionName}`
);

const atRemote = (name: string) => path.join(remotesFolder, name);

/** 收集远程文件 */
const collectRemotes = (types: ('layout' | 'module' | 'module-node')[]) => {
  const packages = readdirSync(remotesFolder).filter(folder => {
    return (
      statSync(atRemote(folder)).isDirectory() &&
      types.includes(
        transformJson(`${atRemote(folder)}/package.json`).remoteManifest.type
      )
    );
  });

  return packages;
};

const generateLayout = () => {
  const packages = collectRemotes(['layout']);
  const layouts = {};

  packages.forEach(pkg => {
    const { name, version, remoteManifest } = transformJson(
      `${atRemote(pkg)}/package.json`
    );

    Object.assign(layouts, {
      [name]: {
        name,
        version,
        displayName: remoteManifest.displayName,
        port: remoteManifest.port,
      },
    });
  });

  return layouts;
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

const generateRoutes = () => {
  const packages = collectRemotes(['module', 'module-node']).map(pkg => {
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

  return routes;
};

const createProductionManifestFile = () => {
  const content = {
    ...generateLayout(),
    routes: generateRoutes(),
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/production-manifest.json'),
    JSON.stringify(content, null, 2)
  );
};

/** 预构建文件 */
const prebuild = () => {
  createProductionManifestFile();

  process.exit(0);
};

prebuild();
