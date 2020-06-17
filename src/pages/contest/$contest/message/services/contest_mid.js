import request from '../../../../../util/Request';

// 获取数据

export function getMessage(mid) {
  return request(`../../../api/message/find/${mid}`);
}

export function subContestPractice(params) {
  return request(`../../../api/contest/status/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function subCh(params) {
  return request(`../../../api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function getContest(cid) {
  return request(`../../../api/contest/find/${cid}`);
}
