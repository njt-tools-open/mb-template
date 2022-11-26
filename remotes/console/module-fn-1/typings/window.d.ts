import { consoleSDK } from '@app-fe/console-sdk';

declare global {
  interface Window {
    consoleSDK: consoleSDK;
  }
}

export {};
