import {jsonp} from '../common/js/jsonp'

export function apiGetdetailData (mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  let data = Object.assign({}, {
    singermid: mid,
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 80,
    begin: 0
  })

  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}

export function apiGetdetailRank (topid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  let data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topid
  })

  let options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}
