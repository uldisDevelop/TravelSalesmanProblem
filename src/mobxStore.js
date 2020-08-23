import Mod from './app/shows/module';

class AppStore {
  constructor() {
    this.mod = new Mod();
  }
}

const app = new AppStore();

window.app = app;

export default app;
