import request from '../../../../../util/Request';

// 获取数据

export function getContest(cid) {
  return request(`../../../api/contest/find/${cid}`);
}

export function getAllMessage() {
  return request(`../../../api/message/list`);
}

export function updateContest(params) {
  return request(`../../../api/contest/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
