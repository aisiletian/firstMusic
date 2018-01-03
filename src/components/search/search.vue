<template>
  <div id='search'>
    <find :findData='inputData' @showHistory='showHistory' @getFindResult='getFindResult' @childChange='childChange' ref='childFind'></find>
    <transition name='fade-colunm'>
      <search-content :data='findResult' v-if='findResult.length'></search-content>
    </transition>
    <div class='search-find'>
      <h1 class='title'>热门搜索</h1>
      <div class='list'>
        <span v-for='(item,index) in hotList' v-html='item.k' @click='clickSong(index)'></span>
      </div>
    </div>
    <transition name='fade-colunm'>
      <div class='search-histoty' v-if='historyList.length'>
        <h1 class='title'>搜索历史
          <span @click='deleteAllHistory'>清空</span>
        </h1>
        <div class='history-container'>
          <ul class='list'>
            <li v-for='(item, index) in historyList'>
              <span class='text' @click.stop='getHistoryData(item)'>{{item}}</span>
              <i class='delete' @click.stop='deleteStorage(index)'>×</i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import Find from '../../baseComponents/find'
import SearchContent from '../../baseComponents/search-content'
import {deleteIndexArr} from '../../common/js/array'
import {getHotList, getSearchResult} from '../../api/search'
import {ERR_OK} from '../../config/index'

export default {
  created () {
    this._getHotList()
  },
  data () {
    return {
      hotList: [],
      inputData: '',
      historyList: localStorage['historyArr'] ? localStorage['historyArr'].split(',') : [],
      findResult: []
    }
  },
  methods: {
    _getHotList () {
      getHotList().then((res) => {
        if (res.code === ERR_OK) {
          this.hotList = res.data.hotkey.slice(0, 8)
        }
      })
    },
    clickSong (index) {
      this.inputData = this.hotList[index].k.trim()
    },
    showHistory (arg) {
      this.historyList = arg
    },
    deleteStorage (index) {
      this.historyList = deleteIndexArr(this.historyList, index)
      localStorage['historyArr'] = this.historyList.join(',')
    },
    deleteAllHistory () {
      let me = this
      let id = this.$layer.confirm('是否清空历史记录?', async function () {
        me.historyList = []
        localStorage['historyArr'] = me.historyList.join(',')
        me.$layer.close(id)
      }, function () {
        me.$layer.close(id)
      })
    },
    setFindResult () {
      this.findResult = []
    },
    getFindResult (result) {
      this.setFindResult()
      this._promise = null
      if (!result) {
        return
      }
      this._promise = getSearchResult(result).then((res) => {
        if (res.code === ERR_OK) {
          res.data.song.list.forEach((value, index) => {
            this.findResult.push({
              picUrl: `https://y.gtimg.cn/music/photo_new/T002R68x68M000${value.albummid}.jpg?max_age=2592000`,
              singer: value.singer[0].name,
              songName: value.songname,
              songid: value.songid,
              songmid: value.songmid
            })
          })
        }
      })
    },
    getHistoryData (value) {
      this.inputData = value
    },
    childChange (value) {
      this.inputData = value
    }
  },
  components: {
    find: Find,
    searchContent: SearchContent
  }
}
</script>

<style>
#search{
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  overflow: hidden;
  flex-direction: column;
  -webkit-flex-direction: column;
  padding-top: 66px;
  width: 100%;
  height: 100%;
  background-color: #222;
}
.search-find{
  display: block;
  padding: 0 15px;
}
.search-find .title{
  display: block;
  font-size: 16px;
  color: #666;
  line-height: 30px;
}
.search-find .list{
  display: block;
  position: relative;
  padding: 5px 0;
  font-size: 0;
}
.search-find .list span{
  display: inline-block;
  padding: 0 5px;
  margin: 0 15px 10px 0;
  background-color: #333;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
  line-height: 22px;
}
.search-histoty{
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-direction: column;
  -webkit-flex-direction: column;
  flex: 1;
  -webkit-flex: 1;
  padding: 0 15px;
}
.search-histoty .title{
  display: block;
  position: relative;
  font-size: 16px;
  color: #666;
  line-height: 30px;
}
.search-histoty .title span{
  display: inlineb-block;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  color: #666;
  line-height: 30px;
}
.history-container{
  display: block;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.search-histoty .list li{
  display: flex;
  display: -webkit-flex;
}
.search-histoty .list .text{
  display: block;
  flex: 1;
  -webkit-flex: 1;
  height: 30px;
  font-size: 16px; 
  color: #999;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-histoty .list .delete{
  display: block;
  font-size: 20px;
  font-style: normal;
  color: #999;
  line-height: 30px;
}
.fade-colunm-enter-active,.fade-colunm-leave-active{
  transition: all 0.3s;
}
.fade-colunm-enter{
  transform: translate3D(0, 100px, 0);
  opacity: 0;
}
.fade-colunm-enter-to{
  transform: translate3D(0, 0, 0);
  opacity: 1;
}

.fade-colunm-leave{
  transform: translate3D(0, 0, 0);
  opacity: 1
}
.fade-colunm-leave-to{
  transform: translate3D(0, 100px, 0);
  opacity: 0;
}
.notify .notify-main{
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}
</style>

