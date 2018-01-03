<template>
  <div id='discList'>
    <ul>
      <li v-for='(item,index) in discListData' @click='onClick(item)'>
        <img v-lazy='item.picurl'>
        <div class='li-r'>
          <h1 class='theme' v-html='item.mvdesc'></h1>
          <p class='text' v-html='item.singername'></p>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script type='text/ecmascript-6'>
import {apiGetdetailData} from '../../api/detail'
import {mapMutations} from 'vuex'
import {ERR_OK} from '../../config/index'

export default {
  props: {
    'discListData': {
      type: Array,
      default: []
    }
  },
  methods: {
    onClick (item) {
      let singername = item.singername
      this.setDetailSingerName(singername)

      let singerId = item.singerid
      this.setDetailSingerId(singerId)

      let singermid = item.singer_mid
      this.$router.push(`/recomender/${singermid}`)

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
  }
}
</script>

<style>
#discList{
  display: block;
  position: relative;
}
#discList ul{
  display: block;
  position: relative;
}
#discList li{
  display: flex;
  display: -webkit-flex;
  position: relative;
  padding: 10px 15px;
  align-items: center;
  -webkit-align-items: center;
}
#discList img{
  display: block;
  width: 60px;
  height: 60px;
  margin-right: 15px;
}
#discList .li-r{
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: center;
  -webkit-justify-content: center;
  flex: 1;
  -webkit-flex: 1;
}
#discList .theme{
  display: block;
  height: 26px;
  font-size: 16px;
  color: #fff;
  line-height: 26px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap; 
}
#discList .text{
  display: block;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden; 
}
</style>
