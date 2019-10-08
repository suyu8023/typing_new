import request from '../../../../util/Request'

// 获取数据

export function getMessage(mid){
  // console.log(mid);
  
  return request(`../../api/practice/${mid}`)
}

