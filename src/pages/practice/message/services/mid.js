import request from '../../../../util/Request'

// 获取数据

export function getMessage(mid){
  // console.log(mid);
  
  return request(`../../api/practice/${mid}`)
}

export function subPractice(params){
  console.log(JSON.stringify(params))
  return request(`../../api/status/add`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

