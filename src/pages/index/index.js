import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCard, AtIcon, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput, AtActionSheet, AtActionSheetItem } from 'taro-ui'

import { init, opt, add, del } from '../../actions/home'

import './index.scss'

@connect(({ home }) => ({
  home
}))
class Index extends Component {
  
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    addShow: false,
    listShow: false,
    titleValue: '',
    contentValue: '',
    curId: ''
  }

  delCount = 0
  timer = null

  componentWillMount () {
    this.props.dispatch(init())
  }
 
  handleOptClick (item, id) {
    this.props.dispatch(opt({...item, id}))
  }
  add () {
    this.setState({
      addShow: true
    })
  }
  del (id) {
    this.delCount++
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.delCount = 0, 500)
    if (this.delCount > 1) {
      this.props.dispatch(del({id}))
    }
  }
  handleTitleChange (e) {
    this.setState({
      titleValue: e,
      curId: ''
    })
  }
  handleContentChange (e) {
    this.setState({
      contentValue: e,
    })
  }
  handleSubmit () {
    if (this.state.titleValue) {
      const item = this.props.home.list.find(itm => itm.id === this.state.curId)
      this.props.dispatch(add({ id: this.state.curId, title: this.state.titleValue, content: this.state.contentValue }))
      this.setState({
        titleValue: item ? item.title : '',
        contentValue: '',
      })
    }
    this.quit()
  }
  quit () {
    this.setState({
      addShow: false,
    })
  }
  handleChooseList (curId, titleValue) {
    const isCur = this.state.curId === curId
    this.setState({
      curId: isCur ? '' : curId,
      titleValue: isCur ? '' : titleValue,
      listShow: false
    })
  }
  closeList () {
    this.setState({
      listShow: false
    })
  }
  openTitleList () {
    this.setState({
      listShow: true
    })
  }
  getDetail (id) {
    const detail = this.props.home.detail.find(item => item.id === id).list
    return detail.length ? detail[detail.length - 1].content : ''
  }

  toDetail (id) {
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }

  render () {
    return (
      <View className='index'>
        {
          this.props.home.list.map(item => <View className='card' key={item.id}><AtCard title={item.title} onClick={this.toDetail.bind(this, item.id)}><View className='card-content'><View><Text className='card-text'>{this.getDetail(item.id)}</Text></View><View className='opt-list'><View><AtIcon className='icon' size='20' color='#ccc' value='trash' onClick={this.del.bind(this, item.id)}></AtIcon></View><View>{item.options.map((itm, idx) => <AtIcon className='icon' size='20' color='#E45649' key={idx} value={itm.name + (itm.value ? '-2' : '')} onClick={this.handleOptClick.bind(this, itm, item.id)}></AtIcon>)}</View></View></View></AtCard></View>)
        }
        <View className='float-add' onClick={this.add.bind(this)}><AtIcon value='add-circle' size='30' color='#E45649'></AtIcon></View>
        <AtModal isOpened={this.state.addShow}>
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            <View className='flex flex-jb'>
              <AtInput
                type='text'
                placeholder='输入一个标题'
                value={this.state.titleValue}
                onChange={this.handleTitleChange}
              >
              </AtInput>
              <AtButton size='small' onClick={this.openTitleList.bind(this)}><AtIcon value='chevron-down' size='20' color='#6190e8'></AtIcon></AtButton>
            </View>
            <AtInput
              type='text'
              placeholder='输入一个内容'
              value={this.state.contentValue}
              onChange={this.handleContentChange}
            >
            </AtInput>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.quit.bind(this)}>取消</Button>
            <Button onClick={this.handleSubmit.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
        <AtActionSheet isOpened={this.state.listShow} onClose={this.closeList.bind(this)} title='头部标题可以用通过转义字符换行'>
          {this.props.home.list.map(item => <AtActionSheetItem key={item.id} onClick={this.handleChooseList.bind(this, item.id, item.title)}>{item.title}{this.state.curId === item.id ? <AtIcon value='check' size='20' color='#6190e8'></AtIcon> : ''}</AtActionSheetItem>)}
        </AtActionSheet>
      </View>
    )
  }
}

export default Index
