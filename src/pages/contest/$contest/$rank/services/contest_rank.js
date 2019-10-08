import request from '../../../../../util/Request'

// 获取数据

export function getContestRankNum(cid){
  return request(`../../../api/contest/${cid}`)
}

export function getContestRankList(cid, page, limit){
  return request(`../../../api/contest/${cid}/${page}/${limit}`)
}