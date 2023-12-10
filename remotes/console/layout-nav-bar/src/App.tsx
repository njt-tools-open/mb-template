import { ReactNode, useEffect, useState } from 'react';

import { Layout, Menu } from 'antd';

import { RouteModel } from '@app-fe/types';

import { WithLocal } from './components/with-local';

import './App.css';

const { Sider } = Layout;

const STORAGE_COLLAPSE_KEY = '[SOC_NAV]COLLAPSED';

const getCollapsed = () => {
  return window.localStorage.getItem(STORAGE_COLLAPSE_KEY) === '1';
};

const setStorageCollapsed = (open: boolean) => {
  return window.localStorage.setItem(STORAGE_COLLAPSE_KEY, open ? '1' : '0');
};

interface MenuModel {
  key: string;
  label: string | JSX.Element;
  children?: MenuModel[];
  icon?: ReactNode;
}

const MenuIcon = ({ svg }: { svg?: string }) => {
  return svg ? (
    <span
      className="ant-menu-item-icon menu-icon-wrapper"
      dangerouslySetInnerHTML={{ __html: svg }}
    ></span>
  ) : (
    <span className="menu-icon-space"></span>
  );
};

/** 格式化路由, 输出导航格式 */
const formatMenu = (routes: RouteModel[]): MenuModel[] => {
  const menu: MenuModel[] = routes.map(item => {
    const res: MenuModel = {
      key: item.path,
      icon: <MenuIcon svg={item.icon} />,
      label: <WithLocal localKey={item.name} />,
    };
    if (item.children && item.children.length) {
      res.children = formatMenu(item.children);
    }
    return res;
  });
  return menu;
};

/** 获取导航上一级 key */
const getParentKey = (
  menu: MenuModel[] = [],
  childKey = '',
  parentKey = ''
): string => {
  let nextParentKey = '';

  for (let i = 0; i < menu.length; i++) {
    if (menu[i].key === childKey) {
      return parentKey;
    }
    if (menu[i].children) {
      nextParentKey = getParentKey(menu[i].children, childKey, menu[i].key);
      if (nextParentKey) return nextParentKey;
    }
  }

  return '';
};

const isKeyInMenus = (menu: MenuModel[] = [], key: string) => {
  let nextResult = false;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].key === key) {
      return true;
    }
    if (menu[i].children) {
      nextResult = isKeyInMenus(menu[i].children, key);
      if (nextResult) return true;
    }
  }
  return false;
};

const getDefaultActiveKey = (menu: MenuModel[] = []) => {
  let defaultActiveKey =
    window.location.hash.match(/#([^?]+)\?*.*$/)?.[1] ?? '';
  if (!isKeyInMenus(menu, defaultActiveKey)) {
    defaultActiveKey = defaultActiveKey.match(/^(\/[^/]+)/)?.[1] ?? '';
  }
  return defaultActiveKey;
};

// TODO: 选中完全自控, 跟随路由激活
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleSelect = ({ key }: { key: string }) => {
    window.consoleSDK.navigateTo(key);
  };

  const routes: RouteModel[] = window.consoleSDK.getRoutes();

  const menu = formatMenu(routes);

  let defaultActiveKey = getDefaultActiveKey(menu);
  if (!defaultActiveKey) {
    defaultActiveKey = menu[0]?.key;
    window.consoleSDK.navigateTo(defaultActiveKey);
  }
  const defaultActiveKeys = defaultActiveKey ? [defaultActiveKey] : [];
  const defaultOpenKey = getParentKey(menu, defaultActiveKey);
  const defaultOpenKeys = defaultOpenKey ? [defaultOpenKey] : [];

  useEffect(() => {
    // antd 使用 defaultCollapsed, 会导 activeKey 在收起状态显示
    setCollapsed(getCollapsed());
  }, []);

  return (
    <div className="App">
      <Sider
        theme="light"
        width={200}
        className="site-layout-background"
        collapsible
        collapsed={collapsed}
        onCollapse={bool => {
          setCollapsed(bool);
          setStorageCollapsed(bool);
        }}
      >
        <div
          style={{
            lineHeight: '66px',
            fontSize: '20px',
            fontWeight: 600,
            textAlign: 'center',
            borderBottom: '1px solid #efefef',
            marginBottom: '8px',
          }}
        >
          Temp
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultActiveKeys}
          defaultOpenKeys={defaultOpenKeys}
          style={{ height: '100%', borderRight: 0 }}
          items={menu}
          onSelect={handleSelect}
        />
      </Sider>
    </div>
  );
};

export default App;
