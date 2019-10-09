import request from '../../../../../util/Request'

// 获取数据

export function getUser(uid){
  return request(`../../../api/user_uid/${uid}`)
}


export function updateUser(params){
  return request(`../../../api/user_uid/update`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

export function deleteMessage(params){
  return request(`../../../api/message/delete`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
