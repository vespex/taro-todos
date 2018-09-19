import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCard, AtIcon, AtInput, AtButton, AtFloatLayout, } from 'taro-ui'

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
  add () {
    this.setState({
      addShow: true
    })
  }
  handleOptClick (item, id, e) {
    e.stopPropagation()
    this.props.dispatch(opt({...item, id}))
  }
  
  del (id, e) {
    e.stopPropagation()
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
      listShow: false,
      addShow: false
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
          this.props.home.list.map(item => <View className='card' key={item.id}><AtCard title={item.title} onClick={this.toDetail.bind(this, item.id)}><View className='card-content'><View><Text className='card-text'>{this.getDetail(item.id)}</Text></View><View className='opt-list'><View><View onClick={this.del.bind(this, item.id)}><AtIcon className='icon' size='20' color='#ccc' value='trash' ></AtIcon></View></View><View>{item.options.map((itm, idx) => <View key={idx} onClick={this.handleOptClick.bind(this, itm, item.id)}><AtIcon className='icon' size='20' color='#E45649'  value={itm.name + (itm.value ? '-2' : '')} ></AtIcon></View>)}</View></View></View></AtCard></View>)
        }
        <AtFloatLayout
          className='float'
          isOpened={this.state.listShow}
          title='请选择一个标题'
          onClose={this.closeList.bind(this)}
        >
          <View className='list'>
            {this.props.home.list.map(item => <View className='item' key={item.id} onClick={this.handleChooseList.bind(this, item.id, item.title)}>{item.title}{this.state.curId === item.id ? <AtIcon value='check' size='20' color='#6190e8'></AtIcon> : ''}</View>)}
          </View>
        </AtFloatLayout>
        <View className='float-add' onClick={this.add.bind(this)}><AtIcon value='add-circle' size='30' color='#E45649'></AtIcon></View>
        <View className={['float-bar', this.state.addShow && 'float-show']}>
          <View className='float-content'>
            <View className='float-wrap'>
              <View className='flex'>
                <View className='flex-1'>
                  <AtInput
                    type='text'
                    placeholder='选择或添加一个标题'
                    value={this.state.titleValue}
                    onChange={this.handleTitleChange}
                  >
                  </AtInput>
                </View>
                <View size='small' onClick={this.openTitleList.bind(this)}><AtIcon value='chevron-down' size='20' color='#6190e8'></AtIcon></View>
              </View>
              <View>
                <AtInput
                  type='text'
                  size='small'
                  placeholder='添加一个内容'
                  value={this.state.contentValue}
                  onChange={this.handleContentChange}
                ></AtInput>
              </View>
              <View className='input-btns flex flex-je'>
                <View className='btn'>
                  <AtButton onClick={this.quit.bind(this)}>取消</AtButton>
                </View>
                <View className='btn'>
                  <AtButton type='primary' onClick={this.handleSubmit.bind(this)}>确定</AtButton>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
