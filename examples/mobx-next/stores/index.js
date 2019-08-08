import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import App from './app'
import User from './user'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let store = null

export function initializeStore(initialData = {}) {
  // Always make a new store if server, otherwise state is shared between requests
  initialData.getParent = () => store
  if (isServer) {
    store = {
      user: new User(isServer, initialData),
      app: new App(isServer, initialData),
    }
  }
  if (store === null) {
    store = {
      user: new User(isServer, initialData),
      app: new App(isServer, initialData),
    }
  }
  return store
}
