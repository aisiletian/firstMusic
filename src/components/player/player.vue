<template>
  <div id='player'>
    <audio :src='audioSrc' style='width:0px;height:0px;' ref='myAudio' loop></audio>
    <transition name='player-animation-wrapper'>
    <div class='player-min' v-if='playerReallyList.length' @click='open_player'>
      <span class='close' @click.stop='emptyList'>关闭</span>
      <img :src='playerPicUrl'>
      <div class='center'>
        <h1 class='songname'>{{this.playerReallyList[this.playerCurrentIndex].songName}}</h1>
        <p class='singername'>{{this.playerReallyList[this.playerCurrentIndex].singerName}}</p>
      </div>
      <div class='svg-box'>
        <i class='fa icon' :class="{'fa-pause':playerIsPlay,'fa-play':!playerIsPlay}" @click.stop='togglePlay' ref='minController'></i>
        <svg class='svg' viewBox='0 0 100 100' xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill='transparent' stroke='#9FB6CD' stroke-width='8'/>
          <circle ref='sgvCircle' cx="50" cy="50" r="46" fill='transparent' stroke-dasharray='300' stroke='#DC143C' stroke-dashoffset='300' stroke-width='8'/>
        </svg>
      </div>
    </div>
    </transition>
    <transition name='player-animation-wrapper'>
    <div class='player-container' v-if='playerFullScreen'>
      <ul class='player-bg' ref='bg'>
        <li><img src='../../common/images/play_1.jpg'></li>
        <li><img src='../../common/images/play_2.jpg'></li>
        <li><img src='../../common/images/play_3.jpg'></li>
        <li><img src='../../common/images/play_4.jpg'></li>
        <li><img src='../../common/images/play_5.jpg'></li>
        <li><img src='../../common/images/play_6.jpg'></li>
        <li><img src='../../common/images/play_7.jpg'></li>
        <li><img src='../../common/images/play_8.jpg'></li>
        <li><img src='../../common/images/play_9.jpg'></li>
      </ul>
      <div class='mask-bg'></div>
      <div class='lyric-wrapper'>
        <h1 class='title'>
          <i class='fa fa-angle-down icon' @click='stop_player'></i>
          {{this.playerReallyList[this.playerCurrentIndex].songName}}
        </h1>
        <h1 class='singername'>{{this.playerReallyList[this.playerCurrentIndex].singerName}}</h1>
        <div class='lyric-container' ref='lyricContainer'>
          <div class='inner'>
            <div class='l' ref='innerL'>
              <scroll :data='[]' :transparent='true' ref='lyricScroll'>
                <div ref='lyricList'>
                  <p v-for='(item, index) in myLyric' :class="{'active':index === lyricActiveIndex}">{{item.text}}</p>
                </div>
              </scroll>
            </div>
            <div class='r'>
              <scroll :data='playerReallyList' :transparent='true' v-if='playerReallyList.length'>
                <p v-for='(item,i) in playerReallyList' :class="{'active':i === playerCurrentIndex}">{{item.singerName}}-{{item.songName}}</p>
              </scroll>
            </div>
          </div>
          <ul class='lyric-dots' ref='dots'>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class='progress-wrapper'>
          <span class='currentTime'>{{audioCurrentTime}}</span>
          <div class='progress-bar' ref='maxBar' @click.stop='onClickBar'>
            <div class='bar-inner' ref='minBar'>
              <span 
                @touchstart='onTouchStart'
                @touchmove='onTouchMove'
                @touchend='onTouchEnd'
              ></span>
            </div>
          </div>
          <span class='musicTime'>{{audioDuration}}</span>
        </div>
        <div class='lyric-controller'>
          <i class='fa fa-step-backward' @click='setPrevSong'></i>
          <i class='fa' :class="{'fa-pause-circle':playerIsPlay,'fa-play-circle':!playerIsPlay}" @click.stop='togglePlay' ref='maxController'></i>
          <i class='fa fa-step-forward' @click='setNextSong'></i>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import {getLyric} from '../../api/player'
import {ERR_OK} from '../../config/index'
import {Base64} from 'js-base64'
import BScroll from 'better-scroll'
import Scroll from '../../baseComponents/scroll'
import {formatTime} from '../../common/js/audio'
import {mapGetters, mapMutations} from 'vuex'

export default {
  created () {
    this.progressWidth = null
    this.startX = null
  },
  data () {
    return {
      bgCurrentIndex: 0,
      currentPageIndex: 0,
      audioSrc: '',
      myLyric: [],
      audioDuration: '00:00',
      audioCurrentTime: '00:00',
      currentSeconds: 0,
      isTouch: false,
      lyricActiveIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'playerPicUrl',
      'playerList',
      'playerReallyList',
      'playerFullScreen',
      'playerLyric',
      'playerCurrentIndex',
      'playerCurrentSong',
      'playerIsPlay'
    ])
  },
  methods: {
    initPage () {
      setTimeout(() => {
        this.$refs.dots.children[0].className = 'active'
        this.interval()
        this.scroller = new BScroll(this.$refs.lyricContainer, {
          scrollX: true,
          momentum: false,
          snap: {
            loop: false,
            threshold: 0.3,
            speed: 400
          }
        })

        if (this.scroller) {
          this.scroller.on('scrollEnd', () => {
            this.currentPageIndex = this.scroller.getCurrentPage().pageX
          })
        }
      }, 20)
    },
    interval () {
      clearInterval(this.timerBg)
      if (!this.$refs.bg.children) {
        return
      }
      this.timerBg = setInterval(() => {
        this.bgCurrentIndex++
        if (this.bgCurrentIndex === this.$refs.bg.children.length) {
          this.bgCurrentIndex = 0
        }
        for (let i = 0; i < this.$refs.bg.children.length; i++) {
          this.$refs.bg.children[i].style.opacity = 0
          if (i === this.bgCurrentIndex) {
            this.$refs.bg.children[i].style.opacity = 1
          }
        }
      }, 10000)
    },
    stop_player () {
      this.setPlayerFullScreen(false)
    },
    open_player () {
      this.setPlayerFullScreen(true)
    },
    setCurrentTime () {
      this.currentSeconds = this.$refs.myAudio.currentTime
      this.audioCurrentTime = formatTime(this.$refs.myAudio.currentTime)
    },
    oncanplay () {
      this.$refs.myAudio.oncanplay = () => {
        this.audioDuration = formatTime(this.$refs.myAudio.duration)
        this.timerSong = setInterval(() => {
          this.setCurrentTime()
        }, 30)
      }
    },
    togglePlay () {
      if (this.playerIsPlay) {
        this.$refs.myAudio.pause()
      } else {
        this.$refs.myAudio.play()
      }
      this.setPlayerIsPlay(!this.playerIsPlay)
    },
    setProgress (currentTime) {
      if (this.isTouch) {
        return
      }
      let maxW = this.$refs.maxBar.offsetWidth
      let radio = currentTime / this.$refs.myAudio.duration
      this.$refs.minBar.style.width = (maxW * radio) + 'px'
    },
    setSvgProgress (currentTime) {
      let duration = this.$refs.myAudio.duration
      let radio = currentTime / duration
      let dasharray = Math.PI * 46 * 2
      let dashoffset = dasharray - dasharray * radio
      this.$refs.sgvCircle.setAttribute('stroke-dasharray', dasharray)
      this.$refs.sgvCircle.setAttribute('stroke-dashoffset', dashoffset)
    },
    onTouchStart (event) {
      this.progressWidth = this.$refs.minBar.offsetWidth
      this.startX = event.targetTouches[0].clientX
    },
    onTouchMove (event) {
      this.isTouch = true
      let x = event.targetTouches[0].clientX
      let w = this.progressWidth + x - this.startX
      this.$refs.minBar.style.width = w + 'px'
    },
    onTouchEnd (event) {
      this.isTouch = false
      let x = event.changedTouches[0].clientX
      let w = this.progressWidth + x - this.startX
      this.$refs.minBar.style.width = w + 'px'
      let radio = w / this.$refs.maxBar.offsetWidth
      this.setSongTimer(radio)
    },
    setSongTimer (radio) {
      if (!this.$refs.myAudio) {
        return
      }
      let timer = radio * this.$refs.myAudio.duration
      this.$refs.myAudio.currentTime = timer
    },
    setLyric (songmid) {
      getLyric(songmid).then((res) => {
        if (res.retcode === ERR_OK) {
          let lyric = Base64.decode(res.lyric)
          this.setPlayerLyric(lyric)
        }
      })
    },
    setPrevSong () {
      let index = this.playerCurrentIndex - 1
      console.log(this.playerReallyList[index])
      if (index < 0) {
        return
      }
      this.setPlayerCurrentIndex(index)
      this.setPlayerIsPlay(false)

      let songmid = this.playerReallyList[index].songMid
      this.setLyric(songmid)
    },
    setNextSong () {
      let index = this.playerCurrentIndex + 1
      if (index > this.playerReallyList.length - 1) {
        return
      }
      this.setPlayerCurrentIndex(index)
      this.setPlayerIsPlay(false)

      let songmid = this.playerReallyList[index].songMid
      this.setLyric(songmid)
    },
    emptyList () {
      this.audioSrc = ''
      this.setPlayerReallyList([])
    },
    setLyricActive (lyric) {
      this.myLyric.forEach((item, index) => {
        if (!item.text) {
          return
        }
        let timeArr = item.time.split(':')
        let time = 0
        timeArr.forEach((v, i) => {
          if (i === 0) {
            time += Number(v) * 60
          }
          if (i === 1) {
            time += Number(v)
          }
        })
        if (lyric >= time) {
          this.lyricActiveIndex = index
        }
      })
    },
    onClickBar (event) {
      let x = event.clientX
      let minX = this.$refs.maxBar.offsetLeft
      let width = x - minX
      this.$refs.minBar.style.width = width + 'px'
      let radio = width / this.$refs.maxBar.offsetWidth
      this.setSongTimer(radio)
    },
    ...mapMutations({
      setPlayerPicUrl: 'SET_PLAYER_PICURL',
      setPlayerList: 'SET_PLAYER_LIST',
      setPlayerReallyList: 'SET_PLAYER_REALLYLIST',
      setPlayerFullScreen: 'SET_PLAYER_FULLSCREEN',
      setPlayerLyric: 'SET_PLAYER_LYRIC',
      setPlayerCurrentIndex: 'SET_PLAYER_CURRENTINDEX',
      setPlayerIsPlay: 'SET_PLAYER_ISPLAY'
    })
  },
  watch: {
    currentPageIndex (newValue) {
      for (let i = 0; i < this.$refs.dots.children.length; i++) {
        this.$refs.dots.children[i].className = ''
      }
      this.$refs.dots.children[newValue].className = 'active'
    },
    playerFullScreen (newValue) {
      if (!newValue) {
        clearInterval(this.timerBg)
        this.timerBg = null
        return
      }
      this.initPage()
    },
    playerLyric (newValue) {
      if (!newValue) {
        this.myLyric.splice(0, this.myLyric.length)
        this.myLyric.push('暂无歌词')
      }
      this.myLyric.splice(0, this.myLyric.length)
      let lyric = newValue.split(/\n/)
      lyric.forEach((item, index) => {
        this.myLyric.push({
          time: item.match(/\[.*\]/).length && item.match(/\[.*\]/)[0].replace(/\[/, '').replace(/\]/, ''),
          text: item.replace(/\[.*\]/, '').trim()
        })
      })
    },
    playerCurrentSong (newValue) {
      if (!newValue) {
        return
      }
      clearInterval(this.timerSong)
      this.timerSong = null
      this.audioSrc = newValue.audio
      this.oncanplay()
    },
    currentSeconds (newValue) {
      if (this.$refs.maxBar) {
        this.setProgress(newValue)
      }
      this.setSvgProgress(newValue)
      this.setLyricActive(newValue)
    },
    lyricActiveIndex () {
      if (this.$refs.lyricScroll) {
        this.$refs.lyricScroll._scrollToElement(this.$refs.lyricList.children[this.lyricActiveIndex], 500, 0, (-1 * this.$refs.innerL.offsetHeight / 2))
      }
    }
  },
  components: {
    scroll: Scroll
  },
  destroyed () {
    clearInterval(this.timerBg)
    this.timerBg = null
    clearInterval(this.timerSong)
    this.timerSong = null
  }
}
</script>

<style>
#player{
  display: block;
  position: fixed;
  z-index: 300;
  width: 100%;
  height: 100%;
  top: 100%;
  left: 0;
  background-color: transparent;
}
.player-container{
  display: block;
  position: absolute;
  z-index: 301;
  background: url(../../common/images/bg.jpg) no-repeat 0 0;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: -100%;
  left: 0;
}
.player-container .mask-bg{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
}
.lyric-wrapper{
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  position: absolute;
  z-index: 302;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.player-container .title{
  display: block;
  position: relative;
  font-size: 18px;
  color: #31c27c;
  text-align: center;
  line-height: 44px;
}
.player-container .title .icon{
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 15px;
  font-size: 30px;
  color: #31c27c;
}
.lyric-wrapper .singername{
  display: block;
  font-size: 16px;
  color: #31c27c;
  line-height: 24px;
  text-align: center;
}
.lyric-container{
  display: block;
  white-space: nowrap;
  position: relative;
  width: 100%;
  flex: 1;
  -webkit-flex: 1;
  padding: 10px 0 40px 0;
  overflow: hidden;
}
.lyric-container .inner{
  display: block;
  height: 100%;
  width: 200%;
}
.lyric-container .l,.lyric-container .r{
  display: inline-block;
  vertical-align: top;
  width: 50%;
  height: 100%;
}
.lyric-container p{
  padding: 0 15px;
  font-size: 16px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  text-align:center;
}
.lyric-container .active{
  font-size: 20px;
  color: #31c27c;
}
.lyric-dots{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  font-size: 0;
}
.lyric-dots li{
  display: block;
  width: 10px;
  height: 10px;
  margin-left: 10px;
  background-color: #fff;
  border-radius: 100px;
}
.lyric-dots .active{
  width: 20px;
  background-color: #31c27c;
}
.player-bg{
  display: block;
  position: absolute;
  z-index: 302;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.player-bg li{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s linear;
}
.player-bg li:first-child{
  opacity: 1;
}
.player-bg li img{
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  opacity: 0.5;
}

.player-min{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: fixed;
  z-index: 299;
  width: 100%;
  height: 60px;
  padding: 0 15px;
  bottom: 0;
  left: 0;
  background-color: #666;
}
.player-min .close{
  display: inline-block;
  position: absolute;
  top: -25px;
  right: 15px;
  font-size: 16px;
  color: #fff;
}
.player-min img{
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
}
.player-min .center{
  display: block;
  flex: 1;
  -webkit-flex: 1;
  padding: 8px 15px 4px 15px;
  overflow: hidden;
}
.player-min .songname{
  height: 24px;
  font-size: 14px;
  color: #fff;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.player-min .singername{
  height: 24px;
  font-size: 14px;
  color: #999;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.player-min .svg-box{
  display: block;
  position: relative;
  width: 38px;
  height: 38px;
}
.player-min .svg-box .icon{
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  transform: translate3d(-50%, -50%, 0);
}
.player-min .svg{
  display: block;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.player-min .svg circle{
  transform-origin: center;
  transform: rotate(-90deg);
}

.progress-wrapper{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: relative;
  height: 40px;
  padding: 0 15px;
  overflow: hidden;
}
.progress-wrapper .currentTime{
  display: block;
  margin-right: 15px;
  font-size: 14px; 
  color: #31c27c;
}
.progress-wrapper .progress-bar{
  display: block;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.3);
}
.progress-wrapper .progress-bar .bar-inner{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 4px;
  background-color: #31c27c;
}
.progress-wrapper .progress-bar span{
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #31c27c;
  top: -6px;
  left: 100%;
}
.progress-wrapper .musicTime{
  display: block;
  margin-left: 15px;
  font-size: 14px; 
  color: #31c27c;
}
.lyric-controller{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  position: relative;
  height: 80px;
  padding: 0 15px;
}
.lyric-controller .loop{
  display: inline-block;
  position: absolute;
  top: 35px;
  left: 15px;
  font-size: 16px;
  color: #31c27c;
}
.lyric-controller i{
  margin: 0 10px;
  font-size: 30px;
  color: #31c27c;
}
.player-animation-wrapper-enter-active,.player-animation-wrapper-leave-active{
  transition: all 0.5s;
}
.player-animation-wrapper-enter{
  transform: translate3D(0, 100%, 0);
}
.player-animation-wrapper-enter-to{
  transform: translate3D(0, 0, 0);
}

.player-animation-wrapper-leave{
  transform: translate3D(0, 0, 0);
}
.player-animation-wrapper-leave-to{
  transform: translate3D(0, 100%, 0);
}
</style>
