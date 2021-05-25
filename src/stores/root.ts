import { makeAutoObservable } from "mobx";

class RootStore {
  counter = 0;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  incrementCounter() {
    this.counter++;
  }
}

const rootStore = new RootStore();
export default rootStore;
