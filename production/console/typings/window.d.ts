import type * as antd from 'antd/es/index.d';

declare global {
  interface Window {
    antd: antd;
    ConsoleJsBridge: ConsoleJsBridge;
  }
}

export {};
