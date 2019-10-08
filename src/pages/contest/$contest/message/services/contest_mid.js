import request from '../../../../../util/Request'

// 获取数据

export function getMessage(mid){
  return request(`../../../api/practice/${mid}`)
}

export function subContestPractice(params){
  console.log(JSON.stringify(params))
  return request(`../../../api/conteststatus/add`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
