import { ConsoleJsBridge } from '@app-fe/console-types';

declare global {
  interface Window {
    ConsoleJsBridge: ConsoleJsBridge;
    consoleSDK: any;
  }
}

export {};
