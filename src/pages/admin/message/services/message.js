import request from '../../../../util/Request'

// 获取数据

export function getUserNum(){
  return request(`../../api/practice`)
}

export function getMessageList(page, limit){
  return request(`../../api/practice/${page}/${limit}`)
}

export function deleteMessage(params){
  return request(`../../api/message/delete`,{
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
