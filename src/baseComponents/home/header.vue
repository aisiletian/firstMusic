<template>
  <div id='header'>
    <span class='made'>乐微 music</span>
    <img class='header-img' src='../../../static/logo.png'>
    <a class='icon-person'></a>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  }
}
</script>

<style>
#header{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: relative;
  height:44px;
  padding: 0 15px;
  background-color: #31c27c;
}
#header .made{
  display: block;
  width: 100%;
  font-size: 18px;
  color: #fff;
  line-height: 44px;
  text-align: center;
}
#header .header-img{
  display: block;
  position: absolute;
  top: 9px;
  left: 15px;
  width: 50px;
  margin: 0 auto;
}
#header .icon-person{
  display: block;
  position: absolute;
  width: 26px;
  height: 26px;
  top: 9px;
  right:15px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
  background-image: url(../../common/images/mall-footer-nav.png);
  background-position: -196px -14px;
  background-size: 280px 135px; 
}
</style>
