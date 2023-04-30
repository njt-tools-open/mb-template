module.exports = {
  apps: [
    {
      name: '@app-fe/console',
      script: 'cd production/console && npm run dev',
    },
    {
      name: '@app-fe/console-layout-app-bar',
      script: 'cd remotes/console/layout-app-bar && npm run dev',
    },
    {
      name: '@app-fe/console-layout-nav-bar',
      script: 'cd remotes/console/layout-nav-bar && npm run dev',
    },
    {
      name: '@app-fe/console-module-fn-1',
      script: 'cd remotes/console/module-fn-1 && npm run dev',
    },
    {
      name: '@app-fe/console-module-fn-2',
      script: 'cd remotes/console/module-fn-2 && npm run dev',
    },
    {
      name: '@app-fe/console-module-home',
      script: 'cd remotes/console/module-home && npm run dev',
    },
  ],
};
