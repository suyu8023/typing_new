import request from '../../../util/Request'

// 获取数据

export function username(username){
  return request(`../api/user/reg/${username}`)
}

export function reg(params){
  return request(`../api/user/reg`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}