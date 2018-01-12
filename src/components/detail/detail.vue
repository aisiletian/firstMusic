<template>
  <div id='Detail'>
    <loader v-if='isLoadingShow'></loader>
    <div class='top'>
      <h1 class='title'>
        <span class='icon-back' @click='_onBack'></span>
        {{detailSingerName}}
      </h1>
      <div class='img-wrapper' ref='topBox'>
        <img :src='detailPicUrl'>
      </div>
    </div>
    <div class='bot' ref='botBox'>
      <div class='bg' ref='bg'></div>
      <scroll :data='[]' :isOverflow='true' @detailAnimate='detailAnimate' :isClick='true' ref='scroller'>
        <ul class='detail-list' v-if='detailPlayList.length'>
          <li class='detail-li' v-for='(item,index) in detailPlayList' @click='onClick(item, index)'>
            <h1 class='songName'>{{item.musicData.songname}}</h1>
            <p class='text'>{{detailSingerName}}—>{{item.musicData.albumname}}</p>
          </li>
        </ul>

        <ul class='detail-list' v-if='detailTopList.length'>
          <li class='detail-li' v-for='(item,index) in detailTopList' @click='onClick(item, index)'>
            <h1 class='songName'>{{item.data.songname}}</h1>
            <p class='text'>{{detailSingerName}}—>{{item.data.songname}}</p>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from '../../baseComponents/scroll'
import Loading from '../../baseComponents/loading'
import {getLyric} from '../../api/player'
import {ERR_OK} from '../../config/index'
import {Base64} from 'js-base64'
import {mapGetters, mapMutations} from 'vuex'

export default {
  created () {
    this.isLoadingShow = true
    if (!this.detailSingerId) {
      history.back()
    }
  },
  computed: {
    ...mapGetters([
      'detailSingerId',
      'detailSingerName',
      'detailPicUrl',
      'detailPlayList',
      'detailTopList',
      'playerPicUrl',
      'playerList',
      'playerReallyList',
      'playerFullScreen',
      'playerLyric',
      'playerCurrentIndex',
      'playerIsPlayer'
    ])
  },
  methods: {
    _onBack () {
      window.history.back()
    },
    onClick (value, index) {
      if (this.detailTopList.length) {
        return
      }
      this.setPlayerFullScreen(true)
      this.setPlayerIsPlay(false)

      let mid = value.musicData.singer[0].mid
      let picUrl = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
      this.setPlayPicUrl(picUrl)

      let emptyArr = []
      this.detailPlayList.forEach((item, i) => {
        let singerName = item.musicData.singer[0].name
        let songName = item.musicData.songname
        let songId = item.musicData.songid
        let songMid = item.musicData.songmid
        emptyArr.push({
          singerName: singerName,
          songName: songName,
          songId: songId,
          songMid: songMid,
          audio: `http://ws.stream.qqmusic.qq.com/C100${songMid}.m4a?fromtag=46`
        })
      })
      this.setPlayerList(emptyArr)
      this.setPlayerReallyList(emptyArr)
      this.setPlayerCurrentIndex(index)
      this.setPlayerIsPlay(false)

      getLyric(value.musicData.songmid).then((res) => {
        if (res.retcode === ERR_OK) {
          let lyric = Base64.decode(res.lyric)
          this.setPlayerLyric(lyric)
        }
      })
    },
    detailAnimate (y) {
      if (y > 0) {
        this._animteBig(y)
      } else {
        this._animteSmall(y)
      }
    },
    _animteBig (y) {
      let topHeight = this.$refs.topBox.offsetHeight
      let scaleSize = (topHeight + y) / topHeight
      this.$refs.topBox.style.zIndex = 20
      this.$refs.botBox.style.zIndex = 1
      this.$refs.topBox.style.transform = `scale(${scaleSize}, ${scaleSize})`
    },
    _animteSmall (y) {
      let topHeight = this.$refs.topBox.offsetHeight
      let selfY = 0
      this.$refs.topBox.style.zIndex = 1
      this.$refs.botBox.style.zIndex = 20
      if (y * -1 < topHeight) {
        selfY = y
      } else {
        selfY = topHeight * -1 + 1
      }
      this.$refs.bg.style.transform = `translate(0px, ${selfY}px)`
    },
    ...mapMutations({
      setDetailSingerId: 'SET_DETAIL_SINGERID',
      setDetailSingerName: 'SET_DETAIL_SINGERNAME',
      setDetailPicUrl: 'SET_DETAIL_PICURL',
      setDetailPlayList: 'SET_DETAIL_PLAYLIST',
      setDetailTopList: 'SET_DETAIL_TOPLIST',
      setPlayPicUrl: 'SET_PLAYER_PICURL',
      setPlayerList: 'SET_PLAYER_LIST',
      setPlayerReallyList: 'SET_PLAYER_REALLYLIST',
      setPlayerFullScreen: 'SET_PLAYER_FULLSCREEN',
      setPlayerLyric: 'SET_PLAYER_LYRIC',
      setPlayerCurrentIndex: 'SET_PLAYER_CURRENTINDEX',
      setPlayerIsPlay: 'SET_PLAYER_ISPLAY'
    })
  },
  components: {
    scroll: Scroll,
    loader: Loading
  },
  watch: {
    detailPlayList () {
      this.isLoadingShow = false
    },
    detailTopList () {
      this.isLoadingShow = false
    }
  },
  destroyed () {
    this.setDetailSingerId(null)
    this.setDetailSingerName(null)
    this.setDetailPicUrl(null)
    this.setDetailPlayList([])
    this.setDetailTopList([])
    this.isLoadingShow = true
  }
}
</script>

<style>
#Detail{
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 299;
  background-color: #fff;
  top: 0;
  left: 0;
}
#Detail .top{
  display: block;
  position: relative;
  width: 100%;
  height: 50%;
  overflow: visible;
}
#Detail .title{
  display: block;
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 44px;
  padding: 0 15px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  color: #666;
  text-align: center;
  line-height: 44px;
}
#Detail .title .icon-back{
  display: block;
  position: absolute;
  top: 0;
  left: 15px;
  width: 15px;
  height: 44px;
  background:url(../../common/images/goodsList-left.png) no-repeat 0px 14px;
}
#Detail .img-wrapper{
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: center top;
  overflow: hidden;
}
#Detail .img-wrapper img{
  display: block;
  width: 100%;
}
#Detail .img-wrapper span{
  display: inline-block;
  position: absolute;
  padding: 0 15px;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px; 
  color: #31c27c;
  line-height: 30px;
  border: 1px solid #31c27c;
  border-radius: 100px;
}
#Detail .bot{
  display: block;
  position: relative;
  width: 100%;
  height: 50%;
}
#Detail .bot .bg{
  display: block;
  position: absolute;
  background-color: #222;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.detail-list{
  display: block;
  position: relative;
  padding: 10px 0 0 0;
}
.detail-list li{
  display: block;
  position: relative;
  padding: 5px 15px;
  border-bottom: 1px solid #666;
}
.detail-list .songName{
  font-size: 14px;
  color: #fff;
  line-height: 26px;
}
.detail-list .text{
  font-size: 12px;
  color: #999;
  line-height: 20px;
}
</style>
