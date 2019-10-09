import request from '../../../../../util/Request'

// 获取数据

export function getMessage(mid){
  return request(`../../../api/message/${mid}`)
}


export function updateMessage(params){
  return request(`../../../api/message/update`,{
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
