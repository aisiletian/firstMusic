<template>
  <div class='scroll-wrapper' :class="{'scroll-wrapper-color': color,'scroll-white':white,'scroll-transparent':transparent,'scroll-hide': isOverflow}" ref='scroll'>
    <div class='scroll-container' ref='container'>
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'

export default {
  props: {
    proto: {
      type: Number,
      default: 3
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: []
    },
    color: {
      type: Boolean,
      default: false
    },
    white: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    },
    isOverflow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroller: null
    }
  },
  activated () {
    this.refresh()
  },
  mounted () {
    setTimeout(() => {
      this.scroller = new BScroll(this.$refs.scroll, {
        scrollY: this.scrollY,
        scrollX: this.scrollX,
        probeType: this.proto,
        click: this.isClick
      })

      if (this.scroller) {
        this.scroller.on('scroll', (pos) => {
          this.$emit('childScroll', pos.y)

          this.$emit('detailAnimate', pos.y)
        })
      }
    }, 20)
  },
  methods: {
    refresh () {
      this.scroller && this.scroller.refresh()
    },
    _scrollToElement () {
      this.scroller && this.scroller.scrollToElement.apply(this.scroller, arguments)
    },
    _scrollTo () {
      this.scroller && this.scroller.scrollTo.apply(this.scroller, arguments)
    }
  },
  watch: {
    data () {
      this.scroller && this.scroller.refresh()
    }
  }
}
</script>

<style>
.scroll-wrapper{
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #222;
  transform-origin: center top;
}
.scroll-wrapper-color{
  background-color: #333;
}
.scroll-white{
  background-color: #fff;
}
.scroll-transparent{
  background-color: transparent;
}
.scroll-hide{
  overflow: visible;
}
</style>
