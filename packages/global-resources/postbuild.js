import fs from 'fs';
import path from 'path';

const packages = [];

const getPkg = src => {
  return JSON.parse(fs.readFileSync(src, { encoding: 'utf8' }));
};

const createFile = (src, dest, template = {}) => {
  let content = fs.readFileSync(src, { encoding: 'utf8' });
  for (const key in template) {
    content = content.replace(
      new RegExp(`'${key}'`, 'g'),
      `'${template[key]}'`
    );
  }
  fs.mkdirSync(dest.replace(/\/[^/]+$/, ''), { recursive: true });
  fs.writeFileSync(dest, content);
};

const createReact = name => {
  const config = {
    name: `${name}`,
    file: `${name}.\${process.env.NODE_ENV}.js`,
  };
  const folder = path.resolve(`node_modules/${config.name}`);
  const pkg = getPkg(`${folder}/package.json`);
  config.version = pkg.version;
  packages.push(config);

  createFile(
    path.resolve(
      `node_modules/${config.name}/umd/${config.name}.development.js`
    ),
    path.resolve(
      `dist/${config.name}/${pkg.version}/${config.name}.development.js`
    )
  );
  createFile(
    path.resolve(
      `node_modules/${config.name}/umd/${config.name}.production.min.js`
    ),
    path.resolve(
      `dist/${config.name}/${pkg.version}/${config.name}.production.js`
    )
  );
};

const createI18next = name => {
  const config = {
    name: `${name}`,
    file: `${name}.js`,
  };
  const folder = path.resolve(`node_modules/${config.name}`);
  const pkg = getPkg(`${folder}/package.json`);
  config.version = pkg.version;
  packages.push(config);

  createFile(
    path.resolve(`node_modules/${config.name}/dist/umd/${config.name}.js`),
    path.resolve(`dist/${config.name}/${pkg.version}/${config.name}.js`)
  );
};

const createDayjs = () => {
  const config = {
    name: 'dayjs',
    file: 'dayjs.js',
  };
  const folder = path.resolve(`node_modules/${config.name}`);
  const pkg = getPkg(`${folder}/package.json`);
  config.version = pkg.version;
  packages.push(config);

  createFile(
    path.resolve(`node_modules/${config.name}/${config.name}.min.js`),
    path.resolve(`dist/${config.name}/${pkg.version}/${config.name}.js`)
  );
};

const createAntd = () => {
  const config = {
    name: 'antd',
    file: 'antd-with-locales.js',
  };
  const folder = path.resolve(`node_modules/${config.name}`);
  const pkg = getPkg(`${folder}/package.json`);
  config.version = pkg.version;
  packages.push(config);

  createFile(
    path.resolve(`node_modules/${config.name}/dist/antd-with-locales.min.js`),
    path.resolve(`dist/${config.name}/${pkg.version}/antd-with-locales.js`)
  );
  createFile(
    path.resolve(`node_modules/${config.name}/dist/antd-with-locales.min.js.map`),
    path.resolve(`dist/${config.name}/${pkg.version}/antd-with-locales.js.map`)
  );
  createFile(
    path.resolve(`node_modules/${config.name}/dist/antd.min.css`),
    path.resolve(`dist/${config.name}/${pkg.version}/antd.css`)
  );
  createFile(
    path.resolve(`node_modules/${config.name}/dist/antd.min.css.map`),
    path.resolve(`dist/${config.name}/${pkg.version}/antd.css.map`)
  );
};

/** 生成所有依赖文件 */
const createAllLibs = () => {
  createReact('react');
  createReact('react-dom');
  createI18next('i18next');
  createI18next('react-i18next');
  createDayjs();
  createAntd();
};

/** 生成依赖文件列表 */
const createListConfig = () => {
  fs.writeFileSync(
    'dist/libs.config.json',
    JSON.stringify({ packages }, null, 2)
  );
};

const prepare = () => {
  fs.rmdirSync('dist', { recursive: true });
  fs.mkdirSync('dist');
};

/** 构建 */
const bundle = () => {
  fs.renameSync('./lib/index.js', './lib/index.mjs');
  prepare();
  createAllLibs();
  createListConfig();
};

bundle();
