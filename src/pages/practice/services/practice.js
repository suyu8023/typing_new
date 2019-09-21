import request from '../../../util/Request'

// 获取数据

export function getUserNum(){
  return request(`../api/practice`)
}

export function getMessageList(page, limit){
  return request(`../api/practice/${page}/${limit}`)
}

