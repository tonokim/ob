import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from '../stores'
import { Provider } from 'mobx-react'

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const store = initializeStore()
    // Provide the store to getInitialProps of pages
    // store.user.name = 'xxx'
    
    appContext.ctx.store = store

    let appProps = await App.getInitialProps(appContext)
    return {
      ...appProps,
      initialState: store,
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.store = isServer
      ? props.initialState
      : initializeStore(props.initialState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
