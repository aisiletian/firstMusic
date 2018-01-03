import originJsonp from 'jsonp'

export function jsonp (url, data, options) {
  let finalUrl = param(url, data)

  return new Promise(function (resolve, reject) {
    originJsonp(finalUrl, options, function (err, da) {
      if (!err) {
        resolve(da)
      } else {
        reject(err)
      }
    })
  })
}

function param (url, data) {
  let fnUrl = url
  let params = ''
  if (fnUrl.indexOf('?') === -1) {
    fnUrl = fnUrl + '?'
  }
  for (let k in data) {
    if (data[k]) {
      params += '&' + k + '=' + data[k]
    }
  }
  fnUrl = fnUrl + params.substr(1)
  return fnUrl
}

export default jsonp
