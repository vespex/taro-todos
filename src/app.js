import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import Detail from './pages/detail/detail'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/detail/detail',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
        <Detail />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
