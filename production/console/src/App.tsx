import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { getRemoteJs, getRemotePath } from './utils/env';
import {
  CONSOLE_LAYOUT_APP_BAR,
  CONSOLE_LAYOUT_NAV_BAR,
  LAYOUT_LIST,
} from './.settings/layout';

import ModeulContainer from './components/module-loader';
import { RemoteInfoModel } from '@app-fe/console-types';
import LoginSection from './components/login';

import './App.css';
import { userStore } from './store/user';

const layoutMap = new Map<string, RemoteInfoModel>();

LAYOUT_LIST.forEach(item => {
  layoutMap.set(item.name, item);
});

const App = observer(() => {
  const appbar = useRef(null);
  const navbar = useRef(null);
  const [appbarAdapter, setAppbarAdapter] = useState<any>();
  const [navbarAdapter, setNavbarAdapter] = useState<any>();

  const renderAppBar = () => {
    if (!appbar.current) return;

    const barInfo = layoutMap.get(CONSOLE_LAYOUT_APP_BAR) as RemoteInfoModel;
    const publicPath = getRemotePath(barInfo);
    const mainUrl = getRemoteJs(barInfo);

    let layout: any = null;

    System.import(mainUrl).then(({ default: Layout }) => {
      // 确认卸载
      appbarAdapter?.unmount();
      // 实例化适配器
      layout = new Layout({
        container: appbar.current,
        publicPath: publicPath,
      });
      // 挂载
      layout.mount();
      // 监听重载
      layout.onReload(() => {
        renderAppBar();
      });

      setAppbarAdapter(layout);
    });
  };

  const renderNavBar = () => {
    if (!navbar.current) return;

    const barInfo = layoutMap.get(CONSOLE_LAYOUT_NAV_BAR) as RemoteInfoModel;
    const publicPath = getRemotePath(barInfo);
    const mainUrl = getRemoteJs(barInfo);

    let layout: any = null;

    System.import(mainUrl).then(({ default: Layout }) => {
      // 确认卸载
      navbarAdapter?.unmount();
      // 实例化适配器
      layout = new Layout({
        container: navbar.current,
        publicPath: publicPath,
      });
      // 挂载
      layout.mount();
      // 监听重载
      layout.onReload(() => {
        renderNavBar();
      });

      setNavbarAdapter(layout);
    });
  };

  useEffect(() => {
    renderAppBar();
    renderNavBar();

    return () => {
      appbarAdapter?.unmount();
      navbarAdapter?.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.isLogin]);

  return (
    <>
      {userStore.isLogin ? (
        <div className="root-app">
          <div className="root-layout-nav">
            <div className="root-nav-bar" ref={navbar}></div>
          </div>
          <div className="root-layout-section">
            <div className="root-app-bar" ref={appbar}></div>
            <ModeulContainer />
          </div>
        </div>
      ) : (
        <LoginSection />
      )}
    </>
  );
});

export default App;
