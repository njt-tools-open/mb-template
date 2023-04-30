import { useEffect, useRef, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';

import { baseStore } from '../../store/base';
import { getRemotePath } from '../../utils/env';
import { useNavigator } from '../../utils/navigator';

const getRouteInfo = (path: string, routers = baseStore.routes): any => {
  for (let i = 0; i < routers.length; i++) {
    if (routers[i].path === path) {
      return routers[i];
    }
    if (routers[i].children) {
      const route = getRouteInfo(path, routers[i].children);
      if (route) {
        return route;
      }
    }
  }
};

const ModuleLoader = () => {
  useNavigator();
  const location = useLocation();
  const modelRef = useRef(null);
  const [moduleAdapter, setModuleAdapter] = useState<any>();

  const renderModule = () => {
    const moduleInfo = getRouteInfo(location.pathname, baseStore.routes);

    if (!moduleInfo) {
      moduleAdapter?.unmount();
      return;
    }
    const publicPath = getRemotePath(moduleInfo);
    const mainUrl = `${publicPath}/main.js?name=${moduleInfo.name}&v=${moduleInfo.version}`;
    let adapter: any = null;

    System.import(mainUrl).then(({ default: Layout }) => {
      // 确认卸载
      moduleAdapter?.unmount();
      // 实例化适配器
      adapter = new Layout({
        container: modelRef.current,
        publicPath: publicPath,
      });
      // 挂载
      adapter.mount();
      // 监听重载
      adapter.onReload(() => {
        renderModule();
      });

      setModuleAdapter(adapter);
    });
  };
  useEffect(() => {
    renderModule();

    return () => {
      moduleAdapter?.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return <div ref={modelRef} className="root-module-container"></div>;
};

const ModeulContainer = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<ModuleLoader />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default ModeulContainer;
