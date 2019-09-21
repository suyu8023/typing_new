import request from '../../../util/Request'

// 获取数据

export function getContestNum(){
  return request(`../api/contest`)
}

export function getContestList(page, limit){
  return request(`../api/contest/${page}/${limit}`)
}