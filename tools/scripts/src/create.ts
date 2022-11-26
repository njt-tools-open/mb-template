import path from 'path';
import { folderCopy, getAllRemotes, getAuthor } from './tools';

interface CreateOptions {
  template: string;
  name: string;
  type: string;
  production?: string;
  displayName?: string;
}

/** 创建项目 */
const createProduction = (options: CreateOptions) => {
  const { name, template } = options;
  const author = getAuthor();
  const tempPath = path.resolve(`./templates/${template}`);
  const targetPath = path.resolve(`./production/${name}`);

  const remotes = getAllRemotes();

  if (remotes.find(item => item.path === targetPath)) {
    console.log('目录已存在');
    return;
  }

  folderCopy(tempPath, targetPath, { ...options, author });
};

/** 创建远程模块 */
const createRemoteModule = (options: CreateOptions) => {
  const { name, type, template, production } = options;
  const author = getAuthor();
  const tempPath = path.resolve(`./templates/${template}`);
  const targetPath = path.resolve(`./remotes/${production}/${type}-${name}`);

  const remotes = getAllRemotes();

  if (remotes.find(item => item.path === targetPath)) {
    console.log('目录已存在');
    return;
  }

  const port =
    (remotes
      .map(item => parseInt(item.remoteManifest.port, 10))
      .sort((a, b) => b - a)[0] ?? 8010) + 1;

  folderCopy(tempPath, targetPath, { ...options, author, port });
};

export const create = (options: CreateOptions) => {
  switch (options.template) {
    case 'production':
      createProduction(options);
      break;
    default:
      createRemoteModule(options);
      break;
  }
};
