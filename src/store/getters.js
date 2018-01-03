export const detailSingerId = state => state.detailSingerId

export const detailSingerName = state => state.detailSingerName

export const detailPicUrl = state => state.detailPicUrl

export const detailPlayList = state => state.detailPlayList

export const detailTopList = state => state.detailTopList

// 获取播放器内核数据
export const playerPicUrl = state => state.playerPicUrl

export const playerList = state => state.playerList

export const playerReallyList = state => state.playerReallyList

export const playerFullScreen = state => state.playerFullScreen

export const playerLyric = state => state.playerLyric

export const playerCurrentIndex = state => state.playerCurrentIndex

export const playerCurrentSong = state => state.playerReallyList[state.playerCurrentIndex]

export const playerIsPlay = state => state.playerIsPlay
