import request from '../../../../util/Request';

// 获取数据

export function getContestList(page, limit) {
  return request(`../../api/contest/all?page=${page}&limit=${limit}`);
}
export function getAllMessage() {
  return request(`../../api/message/list`);
}

export function addContest(params) {
  return request(`../../../api/contest/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function deleteContest(params) {
  return request(`../../../api/contest/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
