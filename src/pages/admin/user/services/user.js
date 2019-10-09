import request from '../../../../util/Request'

// 获取数据

export function getUserNum(){
  return request(`../../api/user/num`)
}

export function getUserList(page, limit){
  return request(`../../api/user/${page}/${limit}`)
}

export function deleteUser(params){
  return request(`../../api/user_uid/delete`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

export function addMessage(params){
  return request(`../../api/message/add`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
