<template>
  <div id='rank'>
    <load v-if='isLoadShow'></load>
    <scroll v-if='!isLoadShow' :data='rankList' :scrollX='false' :scrollY='true' :color='false' :isClick='true' ref='scroll'>
      <ul class='rank-ul'>
        <li v-for='(item,index) in rankList'>
          <a>
            <img v-lazy='item.picUrl'>
            <div class='li-r'>
              <h1 class='title' v-text='item.topTitle'></h1>
              <p v-for='(v,i) in item.songList'>{{v.songname}}-{{v.singername}}</p>
            </div>
          </a>
        </li>
      </ul>
    </scroll>
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import Loading from '../../baseComponents/loading'
import Scroll from '../../baseComponents/scroll'
import {getTopList} from '../../api/ranking'
import {apiGetdetailRank} from '../../api/detail'
import {mapMutations} from 'vuex'
import {ERR_OK} from '../../config/index'

export default {
  created () {
    this._getTopList()
  },
  data () {
    return {
      rankList: [],
      isLoadShow: true
    }
  },
  methods: {
    _getTopList () {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.rankList = res.data.topList
          this.isLoadShow = false
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      })
    },
    _onClick (value) {
      let topid = value.id
      this.setDetailSingerId(topid)
      this.$router.push(`/ranking/${topid}`)

      setTimeout(() => {
        apiGetdetailRank(topid).then((res) => {
          if (res.code === ERR_OK) {
            let singerName = res.topinfo.ListName
            this.setDetailSingerName(singerName)

            let picUrl = res.topinfo.pic_album
            this.setDetailPicUrl(picUrl)

            let list = res.songlist
            this.setDetailTopList(list)
          }
        })
      }, 500)
    },
    ...mapMutations({
      setDetailSingerId: 'SET_DETAIL_SINGERID',
      setDetailSingerName: 'SET_DETAIL_SINGERNAME',
      setDetailPicUrl: 'SET_DETAIL_PICURL',
      setDetailTopList: 'SET_DETAIL_TOPLIST'
    })
  },
  components: {
    scroll: Scroll,
    load: Loading
  }
}
</script>

<style>
#rank{
  display: block;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  overflow: hidden;
}
.rank-ul{
  display: block;
  position: relative;
  padding: 10px 0;
}
.rank-ul li{
  display: block;
  position: relative;
  padding: 10px 15px;
}
.rank-ul a{
  display: flex;
  display: -webkit-flex;
  position: relative;
  background-color: #333;
}
.rank-ul img{
  display: block;
  width: 100px; 
  height: 100px;
}
.rank-ul .li-r{
  dispaly: flex;
  display: -webkit-flex;
  position: relative;
  padding: 0 10px;
  flex: 1;
  -webkit-flex: 1;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: center;
  -webkit-justify-content: center;
  overflow: hidden;
}
.rank-ul .li-r .title{
  font-size: 16px;
  color: #fff;
  line-height: 26px;
}
.rank-ul .li-r p{
  display: block;
  height: 24px;
  font-size: 12px;
  color: #666;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s;
}
.fade-enter{
  transform: translate3D(100%, 0, 0);
}
.fade-enter-to{
  transform: translate3D(0, 0, 0);
}

.fade-leave{
  transform: translate3D(0, 0, 0);
}
.fade-leave-to{
  transform: translate3D(100%, 0, 0);
}
</style>
