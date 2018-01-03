<template>
  <div id='home'>
    <load v-if='isLoadShow'></load>
    <scroll v-if='!isLoadShow' :data='discList' :color='true' :isClick='true' ref='scroll'>
      <div>
        <Slider :sliderData='sliderData'></Slider>
      </div>
      <h1 class='base-title'>精选歌手</h1>
      <discList :discListData='discList'></discList>
      <p class='recomender-more'>没有更多了哦，亲~</p>
    </scroll>
    <transition name='fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import Loading from '../../baseComponents/loading'
import Slider from '../../baseComponents/home/slider'
import discList from '../../baseComponents/home/discList'
import scroll from '../../baseComponents/scroll'
import {getSlider, getDiscList} from '../../api/recomender'
import {ERR_OK} from '../../config'

export default {
  created () {
    this._getSlider()
    this._getDiscList()
  },
  data () {
    return {
      sliderData: [],
      discList: [],
      isLoadShow: true
    }
  },
  methods: {
    _getSlider () {
      getSlider().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderData = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.mvlist
          this.isLoadShow = false
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      })
    }
  },
  components: {
    Slider: Slider,
    discList: discList,
    scroll: scroll,
    load: Loading
  }
}
</script>

<style>
#home{
  display: block;
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  overflow: hidden;
}
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.base-title{
  display: block;
  position:relative;
  padding: 0 15px;
  font-size: 16px;
  color: #ffcc33;
  text-align:center;
  line-height: 40px;
}
.recomender-more{
  display: block;
  position: relative;
  padding: 0 15px;
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 40px;
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
