<template>
  <div id='loading'>
    <img src='../common/images/loading.gif'>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {}
</script>

<style>
#loading{
  display: block;
  position: absolute;
  z-index: 199;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
#loading img{
  display: block;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
