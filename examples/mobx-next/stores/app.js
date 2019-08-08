import { action, decorate, observable, runInAction } from 'mobx';

export default class App {
  @observable name = 'test'

  constructor(isServer, { getParent, app }) {
    this.getParent = getParent
    if(app){
    }
  }

}