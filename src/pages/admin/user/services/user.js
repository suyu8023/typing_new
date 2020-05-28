import request from '../../../../util/Request';

// 获取数据

export function getUserList(page, limit) {
  return request(`../../api/user/all?page=${page}&limit=${limit}`);
}

export function deleteUser(params) {
  return request(`../../api/user/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function addUser(params) {
  return request(`../../api/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
