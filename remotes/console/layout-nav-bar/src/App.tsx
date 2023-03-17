import { Menu,Layout  } from 'antd';

import { RouteModel } from '@app-fe/types';

import i18n from './translation';

import './App.css';

const { Sider } = Layout;

interface MenuModel {
  key: string;
  label: string;
  children?: MenuModel[];
}

const App = () => {
  const formatMenu = (routes: RouteModel[]): MenuModel[] => {
    const menu: MenuModel[] = routes.map(item => {
      const res: MenuModel = {
        key: item.path,
        label: item.displayName[i18n.language],
      };
      if (item.children && item.children.length) {
        res.children = formatMenu(item.children);
      }
      return res;
    });
    return menu;
  };

  const handleSelect = ({ key }: { key: string }) => {
    window.consoleSDK.navigateTo(key);
  };

  const routes: RouteModel[] = window.consoleSDK.getRoutes();

  const menu = formatMenu(routes);

  return (
    <div className="App">
      <Sider
        theme="light"
        collapsible
        width={200}
        className="site-layout-background"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={menu}
          onSelect={handleSelect}
        />
      </Sider>
    </div>
  );
};

export default App;
