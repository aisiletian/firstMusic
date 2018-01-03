export function deleteIndexArr (arr, index) {
  let finalArr = []
  let l = arr.slice(0, index)
  let r = arr.slice(index + 1, arr.length)
  finalArr = l.concat(r)
  return finalArr
}
