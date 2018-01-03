import jsonp from '../common/js/jsonp'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}
