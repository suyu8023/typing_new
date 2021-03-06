import request from '../../../../util/Request';

// 获取数据

export function getUserList(page, limit) {
  return request(`../../api/user/all?page=${page}&limit=${limit}`);
}

export function getUserNameList(page, limit, name) {
  return request(`../../api/user/findNickname?page=${page}&limit=${limit}&name=${name}`);
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

export function addUserList(params) {
  return request(`../../api/user/createList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
