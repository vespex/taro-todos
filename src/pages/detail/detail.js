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
 
  del (id, e) {
    e.stopPropagation()
    this.delCount++
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.delCount = 0, 500)
    if (this.delCount > 1) {
      this.props.dispatch(detailDel({id}))
    }
  }

  handleOptClick (id, opt) {
    this.props.dispatch(detailOpt({id, opt}))
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
      <View className='detail flex flex-column'>
        <View className='db detail-title'><Text>{detail.title}</Text></View>
        <View className='db list flex-1'>
        {
          detail.list && detail.list.map(item => (
            <View key={item.id} className='content-blk item flex flex-jb' onClick={this.handleOptClick.bind(this, item.id, 'done')}>
              <View className='content-text flex'>
                <View className='opt'>{item.done ? <AtIcon size='20' color='#E45649' value='check-circle' ></AtIcon> : <AtIcon size='20' value='alert-circle' ></AtIcon>}</View>
                <View><Text className={item.done ? 'text-done' : ''}>{item.content}</Text></View>
              </View>
              <View className='content-opt flex'><View className='opt' onClick={this.del.bind(this, item.id)}><AtIcon size='20' color='#ccc' value='trash'></AtIcon></View></View>
            </View>
          ))
        }
        </View>
        <View className='db detail-bottom'>
          <View className='detail-input flex flex-jb'>
            <View className='flex-1'>
              <AtInput
                type='text'
                placeholder='输入一个内容'
                value={this.state.contentValue}
                onChange={this.handleContentChange.bind(this)}
              ></AtInput>
            </View>
            <View>
              <AtButton type='primary' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail
