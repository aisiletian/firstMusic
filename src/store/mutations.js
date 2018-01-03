import * as types from './mutations-type'

const mustations = {
  [types.SET_DETAIL_SINGERID] (state, value) {
    state.detailSingerId = value
  },
  [types.SET_DETAIL_SINGERNAME] (state, value) {
    state.detailSingerName = value
  },
  [types.SET_DETAIL_PICURL] (state, value) {
    state.detailPicUrl = value
  },
  [types.SET_DETAIL_PLAYLIST] (state, value) {
    state.detailPlayList = value
  },
  [types.SET_DETAIL_TOPLIST] (state, value) {
    state.detailTopList = value
  },
  // 播放器内核页面
  [types.SET_PLAYER_PICURL] (state, value) {
    state.playerPicUrl = value
  },
  [types.SET_PLAYER_LIST] (state, value) {
    state.playerList = value
  },
  [types.SET_PLAYER_REALLYLIST] (state, value) {
    state.playerReallyList = value
  },
  [types.SET_PLAYER_FULLSCREEN] (state, value) {
    state.playerFullScreen = value
  },
  [types.SET_PLAYER_LYRIC] (state, value) {
    state.playerLyric = value
  },
  [types.SET_PLAYER_CURRENTINDEX] (state, value) {
    state.playerCurrentIndex = value
  },
  [types.SET_PLAYER_ISPLAY] (state, value) {
    state.playerIsPlay = value
  }
}

export default mustations
