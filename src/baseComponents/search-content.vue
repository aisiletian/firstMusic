<template>
  <div class='search-content'>
    <ul class='list'>
      <li v-for='(item,index) in data' @click.stop='onClick(item, index)'>
        <img v-lazy='item.picUrl'>
        <div class='li-r'>
          <h1 class='songName'>{{item.songName}}</h1>
          <p class='singer'>{{item.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
import {getLyric} from '../api/player'
import {ERR_OK} from '../config/index'
import {Base64} from 'js-base64'
import {mapMutations} from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    onClick (item, index) {
      this.setPlayerIsPlay(false)
      this.setPlayerFullScreen(true)

      let picUrl = item.picUrl
      this.setPlayPicUrl(picUrl)

      let emptyArr = []
      this.data.forEach((item, i) => {
        let singerName = item.singer
        let songName = item.songName
        let songId = item.songid
        let songMid = item.songmid
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

      getLyric(item.songmid).then((res) => {
        if (res.retcode === ERR_OK) {
          let lyric = Base64.decode(res.lyric)
          this.setPlayerLyric(lyric)
        }
      })
    },
    ...mapMutations({
      setPlayPicUrl: 'SET_PLAYER_PICURL',
      setPlayerList: 'SET_PLAYER_LIST',
      setPlayerReallyList: 'SET_PLAYER_REALLYLIST',
      setPlayerFullScreen: 'SET_PLAYER_FULLSCREEN',
      setPlayerLyric: 'SET_PLAYER_LYRIC',
      setPlayerCurrentIndex: 'SET_PLAYER_CURRENTINDEX',
      setPlayerIsPlay: 'SET_PLAYER_ISPLAY'
    })
  }
}
</script>

<style>
.search-content{
  display: block;
  position: absolute;
  z-index: 19;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #222;
  padding-bottom: 66px;
  top: 66px;
  left: 0;
}
.search-content .list{
  display: block;
  position: relative;
}
.search-content .list li{
  display: flex;
  display: -webkit-flex;
  position:relative;
  padding: 10px 15px;
  border-bottom: 1px solid #666;
}
.search-content .list img{
  display: block;
  width: 50px;
  height: 50px;
}
.search-content .list .li-r{
  display: block;
  flex: 1;
  -webkit-flex: 1;
  padding-left: 15px;
  overflow: hidden;
}
.search-content .list .songName{
  display: block;
  height: 30px;
  font-size: 16px;
  color: #fff;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-content .list .singer{
  display: block;
  height: 20px;
  font-size: 12px;
  color: #808080;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
