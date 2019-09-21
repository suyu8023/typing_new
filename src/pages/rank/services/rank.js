import request from '../../../util/Request'

// 获取数据

export function getStatusNum(){
  return request(`../api/status`)
}

export function getRankList(page, limit){
  return request(`../api/rank/${page}/${limit}`)
}