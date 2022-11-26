import { action, makeAutoObservable, observable } from 'mobx';

class Store {
  exist = false;

  constructor() {
    makeAutoObservable(this, {
      exist: observable,
      setExist: action,
    });
  }

  setExist = (value: boolean) => {
    this.exist = value;
  };
}

export const baseStore = new Store();
