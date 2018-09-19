import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtInput, AtButton } from 'taro-ui'

import {add, detailInit, detailDel, detailOpt } from '../../actions/home'

import './detail.scss'

@connect(({ home }) => ({
  home
}))
class Detail extends Component {
  
  config = {
    navigationBarTitleText: '详情'
  }

  state = {
    contentValue: ''
  }

  id = null
  timer = null
  delCount = 0

  componentWillMount () {
    this.id = this.$router.params.id
    this.props.dispatch(detailInit({id: this.id}))
  }
 
  del (id) {
    this.delCount++
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.delCount = 0, 500)
    if (this.delCount > 1) {
      this.props.dispatch(detailDel({id}))
    }
  }

  handleOptClick (item, id) {
    this.props.dispatch(detailOpt({...item, id}))
  }

  handleContentChange (e) {
    this.setState({
      contentValue: e,
    })
  }

  handleSubmit () {
    if (this.state.contentValue) {
      const {detailId, detailItem} = this.props.home
      this.props.dispatch(add({ id: detailId, title: detailItem.title, content: this.state.contentValue }))
      this.setState({
        contentValue: '',
      })
    }
  }

  render () {
    const detail = this.props.home.detailItem
    return (
      <View className='detail'>
        <View className='detail-title'><Text>{detail.title}</Text></View>
        <View className='list'>
        {
          detail.list.map(item => (
            <View key={item.id} className='content-blk item flex flex-jb'>
              <View className='content-text'><Text>{item.content}</Text></View>
              <View className='content-opt flex'><View className='opt'>{item.options.map((itm, idx) => <AtIcon className='icon' size='20' color='#E45649' key={idx} value={itm.name + (itm.value ? '-2' : '')} onClick={this.handleOptClick.bind(this, itm, item.id)}></AtIcon>)}</View><View className='opt'><AtIcon className='icon' size='20' color='#ccc' value='trash' onClick={this.del.bind(this, item.id)}></AtIcon></View></View>
            </View>
          ))
        }
        </View>
        <View className='float-bottom'>
          <View className='detail-input flex flex-jb'>
            <View className='flex-1'>
              <AtInput
                type='text'
                placeholder='输入一个内容'
                value={this.state.contentValue}
                onChange={this.handleContentChange}
              ></AtInput>
            </View>
            <View>
              <AtButton type='primary' onClick={this.handleSubmit}>提交</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail
