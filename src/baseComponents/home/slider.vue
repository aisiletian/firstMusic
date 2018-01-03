<template>
  <div id='slider' ref='slider'>
    <div class='slider-container' ref='sliderUl'>
      <div class='slider-item clearfix' v-for='(item, key) in sliderData' ref='sliderLi'>
        <a>
          <img :src='item.picUrl'>
        </a>
      </div>
    </div>
    <div class='page'>{{currentPage || 1}}/{{allPage}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
export default {
  props: {
    'sliderData': {
      type: Array,
      default: []
    },
    'autoPlay': {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      currentPage: 1,
      allPage: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._setWidth()
      this._setSwipe()
      this._getPage()

      window.addEventListener('resize', () => {
        this._setWidth(true)
      }, false)
    }, 20)
  },
  activated () {
    this._setWidth()
    this._setSwipe()
    this._getPage()
  },
  methods: {
    _setWidth () {
      let sliderW = this.$refs.slider.clientWidth
      let sliderUlW = sliderW * (this.$refs.sliderUl.children.length)
      let child = this.$refs.sliderUl.children

      for (let i = 0; i < child.length; i++) {
        child[i].style.width = sliderW + 'px'
      }

      this.$refs.sliderUl.style['width'] = sliderUlW + 'px'
    },
    _setSwipe () {
      this.swipe = new BScroll(this.$refs.slider, {
        scrollX: true,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.currentPage = this.swipe && this.swipe.getCurrentPage().pageX + 1
    },
    _getPage () {
      this.allPage = this.$refs.sliderUl.children.length
      this.swipe.on('scrollEnd', () => {
        this.currentPage = this.swipe.getCurrentPage().pageX + 1
      })
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  watch: {
    sliderData () {
      this._setWidth()
    }
  }
}
</script>

<style>
#slider{
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
}
#slider .slider-container{
  display: block;
  position: relative;
}
#slider .slider-item{
  display: block;
  float: left;
}
#slider .slider-container a{
  display: block;
  position: relative;
  width: 100%;
}
#slider .slider-container img{
  display: block;
  width: 100%;
}
#slider .page{
  display: inline-block;
  position: absolute;
  padding: 5px 10px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 100px;
  bottom: 10px;
  right: 15px;
  font-size: 16px;
  color: #31c27c;
}
</style>
