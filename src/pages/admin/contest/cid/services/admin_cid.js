import request from '../../../../../util/Request'

// 获取数据

export function getContest(cid){
  return request(`../../../api/contest_cid/${cid}`)
}

export function getAllMessage(){
  return request(`../../../api/message`)
}


export function updateContest(params){
  return request(`../../../api/contest_cid/update`,{
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
