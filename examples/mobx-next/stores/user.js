import { action, decorate, observable, runInAction } from 'mobx';

let timer

export default class User {
  @observable name = 'test'
  @observable age = 1
  @observable lastUpdate = Date.now()
  @observable light = false

  constructor(isServer, { getParent, user }) {
    this.getParent = getParent
    if(user){
      this.token = user.token
      this.lastUpdate = user.lastUpdate
    }
  }

  start = () => {
    timer = setInterval(() => {
      // pass off to another action instead
      this.update()
    }, 1000)
  }

  @action
  update = () => {
    this.lastUpdate = Date.now()
    this.light = true
  }

  stop = () => {
    clearInterval(timer)
  }

  @action
  setName = (name) => {
    this.name += name + 1
  }

  @action
  addAge = (number) => {
    this.age += 1
  }

  

}
