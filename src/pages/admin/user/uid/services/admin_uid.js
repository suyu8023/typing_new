import request from '../../../../../util/Request';

// 获取数据

export function getUser(uid) {
  return request(`../../../api/user/find/${uid}`);
}

export function updateUser(params) {
  return request(`../../../api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
