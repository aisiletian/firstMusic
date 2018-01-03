<template>
  <div id="app">
    <my-header></my-header>
    <header-nav></header-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type='text/ecmascript-6'>
import Header from './baseComponents/home/header'
import HeaderNav from './baseComponents/home/header-nav'
import Player from './components/player/player'

export default {
  name: 'app',
  components: {
    myHeader: Header,
    headerNav: HeaderNav,
    player: Player
  }
}
</script>

<style>
#app{
  display: flex;
  display: -webkit-flex;
  position: relative;
  flex-direction: column;
  -webkit-flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
