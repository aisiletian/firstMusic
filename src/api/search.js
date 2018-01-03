import jsonp from '../common/js/jsonp'

export function getHotList () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

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

export function getSearchResult (value) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    zhidaqu: 1,
    catZhida: 1,
    t: 1,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 30,
    n: 30,
    p: 2,
    remoteplace: 'txt.mqq.all',
    w: value
  })

  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}
