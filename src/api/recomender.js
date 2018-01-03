import jsonp from '../common/js/jsonp'

export function getSlider () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }
  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}

export function getDiscList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag'

  const data = Object.assign({}, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cmd: 'shoubo',
    lan: 'all'
  })

  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}
