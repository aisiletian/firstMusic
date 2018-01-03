<template>
  <div class='find'>
    <div class='inner'>
      <input type='text' placeholder='搜索歌曲、歌单、专辑' v-model='myFindData'>
      <button @click='findSong'>添加到历史</button>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    findData: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      myFindData: this.findData,
      keyDownTime: null,
      isLoad: false,
      timer: null
    }
  },
  methods: {
    findSong () {
      if (!this.myFindData) {
        this.$layer.msg('请输入搜索内容')
        return
      }

      if (!localStorage['historyArr']) {
        localStorage['historyArr'] = this.myFindData
        this.$layer.msg('您已添加到历史记录')
      } else {
        if (localStorage['historyArr'].split(',').indexOf(this.myFindData) === -1) {
          localStorage['historyArr'] += ',' + this.myFindData
          this.$layer.msg('您已添加到历史记录')
        } else {
          this.$layer.msg('已有该记录,请不要重复添加')
        }
      }

      this.$emit('showHistory', localStorage['historyArr'].split(','))
    },
    _setTimer () {
      this.timer = setTimeout(() => {
        this.$emit('getFindResult', this.myFindData)
      }, 500)
    }
  },
  watch: {
    findData (newValue) {
      this.myFindData = newValue
    },
    myFindData () {
      this.$emit('childChange', this.myFindData)
      clearTimeout(this.timer)
      this.timer = null
      this._setTimer()
    }
  }
}
</script>

<style>
.find{
  display: block;
  position: absolute;
  width: 100%;
  padding: 15px;
  top: 0;
  left: 0;
}
.find .inner{
  display: flex;
  display: -webkit-flex;
  border-radius: 5px;
  overflow: hidden;
}
.find .inner input{
  display: block;
  position: relative;
  height: 36px;
  flex: 1;
  -webkit-flex: 1;
  padding: 0 15px;
  background-color: #333;
  font-size: 14px;
  color: #666;
  line-height:36px;
}
.find .inner button{
  display: block;
  position: relative;
  padding: 0 10px;
  background-color: #31c27c;
  font-size: 15px;
  color: #fff;
}
</style>
