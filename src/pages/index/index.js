import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCard } from 'taro-ui'

import { getList } from '../../actions/home'

import './index.scss'

@connect(({ home }) => ({
  home
}), (dispatch) => ({
  getList () {
    dispatch(getList())
  },
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  componentWillMount () {
    this.props.getList()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {
          this.props.home.list.map(item => <AtCard key={item.id}>{item.title}</AtCard>)
        }
      </View>
    )
  }
}

export default Index
