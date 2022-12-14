import { register as registerRemoteAdapter } from '@app-fe/remote-adapter';

export const prepare = (cb: () => void) => {
  registerRemoteAdapter();

  cb();
};
