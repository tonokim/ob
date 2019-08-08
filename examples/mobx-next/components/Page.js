import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './Clock'
import style from './style.less'

@inject('store')
@observer
class Page extends React.Component {
  constructor(props){
    super(props)
    this.store = this.props.store
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    this.store.user.stop()
  }

  onClick = () => {
    const { user: { addAge, lastUpdate, start } } = this.store
    addAge()
    start()
  }

  render() {
    const { user } = this.store
    return (
      <div>
        <Clock
          lastUpdate={this.store.user.lastUpdate}
          light={false}
        />
        <p>title: {this.props.title}</p>
        <p>Name: {this.props.store.user.name}</p>
        <p>Age: {this.props.store.user.age}</p>
        <button className={style['box']} onClick={this.onClick}>增加</button>
        <nav>
          <Link href={this.props.linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
      </div>
    )
  }
}

export default Page
