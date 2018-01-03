export function formatTime (time) {
  let result = ''
  let seconds = Math.floor(time % 60) >= 10 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
  let minutes = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
  result = minutes + ':' + seconds
  return result
}

export default formatTime
