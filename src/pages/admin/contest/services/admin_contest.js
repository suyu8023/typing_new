import request from '../../../../util/Request'

// 获取数据

export function getContestNum(){
  return request(`../../api/contest`)
}

export function getContestList(page, limit){
  return request(`../../api/contest/${page}/${limit}`)
}
export function getAllMessage(){
  return request(`../../api/message`)
}

export function addContest(params){
  return request(`../../../api/contest_cid/add`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

export function deleteContest(params){
  return request(`../../../api/contest_cid/delete`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}