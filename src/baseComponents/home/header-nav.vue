<template>
  <div id='header-vue'>
    <ul>
      <li>
        <router-link to='/recomender'>精选</router-link>
      </li>
      <li>
        <router-link to='/singer'>热门歌手</router-link>
      </li>
      <li>
        <router-link to='/ranking'>排行</router-link>
      </li>
      <li>
        <router-link to='/search'>搜索</router-link>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data: function () {
    return {}
  }
}
</script>

<style>
#header-vue ul{
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 40px;
  position: relative;
}
#header-vue ul li{
  display: block;
  flex: 1;
  -webkit-flex: 1;
}
#header-vue ul a{
  display: block;
  font-size: 14px;
  color: #666;
  line-height:40px;
  text-align:center;
}
#header-vue .router-link-active{
  display: block;
  position: relative;
  color: #31c27c;
}
#header-vue .router-link-active:after{
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #31c27c;
  bottom: 0;
  left: 0;
}
</style>
