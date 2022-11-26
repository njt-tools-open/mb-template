import {
  existsSync,
  mkdir,
  readdirSync,
  readFileSync,
  statSync,
  writeFile,
} from 'fs';
import path from 'path';
import shell from 'shelljs';

const ejs = require('ejs');

export const getAuthor = () => {
  const res = shell.exec('git config user.name', { silent: true });

  if (res.code !== 0) return '';

  return res.toString().replace(/\s/g, '');
};

export const isFile = (name: string): boolean => {
  try {
    const stats = statSync(name);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

export const isFolder = (name: string): boolean => {
  try {
    const stats = statSync(name);
    return stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

const mkFolder = (folder): Promise<null> =>
  new Promise(resolve => {
    const isPathToExist = existsSync(folder);
    if (!isPathToExist || !statSync(folder).isDirectory()) {
      mkdir(folder, () => {
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });

const copyFile = (
  pathFrom: string,
  pathTo: string,
  params: Record<string, any>,
  callback: () => void
) => {
  const str = readFileSync(pathFrom, { encoding: 'utf8' });
  try {
    const content = ejs.render(str, params);
    writeFile(pathTo, content, null, callback);
  } catch (err) {
    console.log(err);
    console.log(pathFrom);
  }
};

export const folderCopy = (
  pathFrom: string,
  pathTo: string,
  params: Record<string, any>
): Promise<null> =>
  new Promise(resolve => {
    if (existsSync(pathFrom) && statSync(pathFrom).isDirectory()) {
      mkFolder(pathTo).then(() => {
        const dirLs = readdirSync(pathFrom).map(file => ({
          name: file,
          isCopyed: false,
        }));
        dirLs.forEach(fileInfo => {
          const originPath = path.join(pathFrom, `./${fileInfo.name}`);
          const targetPath = path.join(pathTo, `./${fileInfo.name}`);

          if (statSync(originPath).isDirectory()) {
            folderCopy(originPath, targetPath, params).then(() => {
              fileInfo.isCopyed = true;
              if (!dirLs.find(__file => !__file.isCopyed)) {
                resolve(null);
              }
            });
          } else {
            fileInfo.isCopyed = true;
            copyFile(originPath, targetPath, params, () => {
              if (!dirLs.find(__file => !__file.isCopyed)) {
                resolve(null);
              }
            });
          }
        });
      });
    }
  });

export const getAllRemotes = () => {
  const remotes: {
    name: string;
    path: string;
    remoteManifest: any;
  }[] = [];

  readdirSync(path.resolve('./remotes')).forEach(folder => {
    if (statSync(path.resolve(`./remotes/${folder}`)).isDirectory()) {
      readdirSync(path.resolve(`./remotes/${folder}`)).forEach(remote => {
        const remotePath = path.resolve(`./remotes/${folder}/${remote}`);
        const pkgPath = path.join(remotePath, 'package.json');
        if (statSync(remotePath).isDirectory() && isFile(pkgPath)) {
          const pkg = JSON.parse(readFileSync(pkgPath, { encoding: 'utf8' }));
          remotes.push({
            name: pkg.name,
            path: remotePath,
            remoteManifest: pkg.remoteManifest,
          });
        }
      });
    }
  });

  return remotes;
};
