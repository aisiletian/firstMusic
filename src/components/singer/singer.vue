<template>
  <div id='singer'>
    <load v-if='isLoadShow'></load>
    <scroll v-if='!isLoadShow' :data='singerList' :scrollX='false' :scrollY='true' :color='true' ref='scroll' :isClick='true' @childScroll='childScroll'>
      <ul class='singer-ul' ref='singerUl'>
        <li class='singer-li' v-for='(item,index) in singerList'>
          <h1 class='title'>{{item.title}}</h1>
          <ul class='inner-ul'>
            <li class='inner-li' v-for='(value,key) in item.items' @click='_onClick(value)'>
              <a>
                <img v-lazy='value.picUrl'>
                <p class='name' v-html='value.Fsinger_name'></p>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <ul class='prompt-fix'>
      <li @click='_onClickTab(index)' v-for='(item,index) in singerList' :class='{active: showActive === index}'>{{item.title.substring(0,1)}}</li>
    </ul>
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import Loading from '../../baseComponents/loading'
import Scroll from '../../baseComponents/scroll'
import {getSingerList} from '../../api/singer'
import {apiGetdetailData} from '../../api/detail'
import {ERR_OK} from '../../config/index'
import {mapMutations} from 'vuex'

export default {
  created () {
    this._getSingerList()
  },
  data () {
    return {
      originSingerList: [],
      singerList: [],
      isLoadShow: true,
      showActive: 0,
      scrollArr: [],
      scrollY: 0
    }
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.originSingerList = res.data.list
          this.formatSingerList(this.originSingerList)
          this.isLoadShow = false
          this._initPage()
        }
      })
    },
    _initPage () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
        let child = this.$refs.singerUl.children
        let childLen = this.$refs.singerUl.children.length
        for (let i = 0; i < childLen; i++) {
          this.scrollArr.push(child[i].offsetTop)
        }
      }, 20)
    },
    formatSingerList (list) {
      let map = {}
      map.hot = {
        title: '热门歌曲',
        items: []
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push({
            Fsinger_id: item.Fsinger_id,
            Fsinger_mid: item.Fsinger_mid,
            picUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
            Fsinger_name: item.Fsinger_name
          })
        }
      })
      list.forEach((item, index) => {
        if (!map[item.Findex]) {
          map[item.Findex] = {
            title: item.Findex,
            items: []
          }
        }
        map[item.Findex].items.push({
          Fsinger_id: item.Fsinger_id,
          Fsinger_mid: item.Fsinger_mid,
          picUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
          Fsinger_name: item.Fsinger_name
        })
      })

      let hotJson = map['hot']
      this.singerList.push(hotJson)
      delete (map['hot'])
      delete (map['9'])
      let remainderArray = []
      for (let i in map) {
        remainderArray.push(map[i])
      }
      remainderArray.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      remainderArray.forEach((item, index) => {
        this.singerList.push(item)
      })
    },
    _onClickTab (index) {
      this.showActive = index
      this.$refs.scroll._scrollToElement(this.$refs.singerUl.children[index], 0)
      let mes = this.singerList[index].title.substr(0, 1)
      this.$layer.msg(mes)
    },
    childScroll (y) {
      this.scrollY = y
    },
    _onClick (value) {
      let singername = value.Fsinger_name
      this.setDetailSingerName(singername)

      let singerId = value.Fsinger_id
      this.setDetailSingerId(singerId)

      let singermid = value.Fsinger_mid
      this.$router.push(`/singer/${singermid}`)

      setTimeout(() => {
        apiGetdetailData(singermid).then((res) => {
          if (res.code === ERR_OK) {
            let picUrl = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singermid}.jpg?max_age=2592000`
            this.setDetailPicUrl(picUrl)

            let list = res.data.list
            this.setDetailPlayList(list)
          }
        })
      }, 500)
    },
    ...mapMutations({
      setDetailPlayList: 'SET_DETAIL_PLAYLIST',
      setDetailPicUrl: 'SET_DETAIL_PICURL',
      setDetailSingerName: 'SET_DETAIL_SINGERNAME',
      setDetailSingerId: 'SET_DETAIL_SINGERID'
    })
  },
  components: {
    scroll: Scroll,
    load: Loading
  },
  watch: {
    scrollY (newValue) {
      if (this.scrollArr.length) {
        if (this.scrollY > 0) {
          this.showActive = 0
          return
        }
        if (this.scrollY * -1 >= this.scrollArr[this.scrollArr.length - 1]) {
          this.showActive = this.scrollArr.length - 1
          return
        }
        this.scrollArr.forEach((item, index) => {
          if (this.scrollY * -1 >= item && this.scrollY * -1 < this.scrollArr[index + 1]) {
            this.showActive = index
          }
        })
      }
    }
  }
}
</script>

<style>
#singer{
  display: block;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  overflow: hidden;
}
.singer-ul{
  display: block;
  position: relative;
}
.singer-li{
  display: block;
  position: relative;
}
.singer-li .title{
  display: block;
  position: relative;
  padding: 0 15px;
  background-color: #666;
  font-size: 14px;
  color: #999;
  line-height:30px;
}
.singer-li .inner-ul{
  display: block;
  position: relative;
  padding: 10px 0;
}
.singer-li .inner-li{
  display: block;
  position: relative;
}
.singer-li .inner-li a{
  display: flex;
  display: -webkit-flex;
  position: relative;
  padding: 10px 15px;
  overflow: hidden;
}
.singer-li .inner-li img{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.singer-li .name{
  display: block;
  position: relative;
  width: 100%;
  height: 50px;
  padding-left: 15px;
  flex: 1;
  -webkit-flex: 1;
  font-size: 14px;
  color: #999;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.prompt-fix{
  display: block;
  position: absolute;
  width: 22px;
  top:50%;
  right: 0;
  padding: 5px 0;
  background-color: rgba(0,0,0,0.4);
  border-radius: 100px;
  transform: translate3D(0,-50%,0)
}
.prompt-fix li{
  width: 22px;
  font-size: 12px;
  color: #fff;
  line-height: 16px;
  text-align: center;
}
.prompt-fix .active{
  color: #31c27c;
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
