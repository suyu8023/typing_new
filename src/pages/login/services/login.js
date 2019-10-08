import request from '../../../util/Request'

// 获取数据

export function time(){
  return request(`../api/time`)
}

export function login(params){
  return request(`../api/user`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}