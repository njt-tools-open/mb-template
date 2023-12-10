import { Root, createRoot } from 'react-dom/client';

import { ConfigProvider } from 'antd';

import { ANTD_CSS_PATH } from '@app-fe/global-resources';
import RemoteAdapter from '@app-fe/remote-adapter';

import App from './App';
import i18n from './translation';

class RemoteEntry extends RemoteAdapter {
  private root?: Root;

  private handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  private beforeRender = () => {
    window.consoleSDK.onLangChange(this.handleLangChange);
  };
  private beforeUnmout = () => {
    window.consoleSDK.offLangChange(this.handleLangChange);
  };

  /** 默认使用样式 */
  override getStaticResources = () => {
    return [
      {
        tag: 'link',
        attributes: {
          rel: 'stylesheet',
          href: ANTD_CSS_PATH,
        },
      },
      {
        tag: 'link',
        attributes: {
          rel: 'stylesheet',
          href: `${this.publicPath}/main.css?v=${process.env.remoteVersion}`,
        },
      },
    ];
  };

  /** 容器完成挂载 */
  override onMounted = (): void => {
    if (!this.container) {
      console.log('[ERROR]', 'Lost container');
      return;
    }
    this.beforeRender();

    const root = createRoot(this.container);

    root.render(
      <ConfigProvider locale={window.consoleSDK.getAntdUseLang()}>
        <App />
      </ConfigProvider>
    );

    this.root = root;
  };

  /** 容器销毁 */
  override onDestroy = (): void => {
    this.beforeUnmout();
    this.root?.unmount();
  };
}

export default RemoteEntry;
