import request from '../../../util/Request';

// 获取数据

export function username(username) {
  return request(`../api/status/findUserStatusRecord?name=${username}`);
}

export function user(uid) {
  return request(`../api/user/find/${uid}`);
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

export function judgeUser(username, password) {
  return request(`../api/user/judge?username=${username}&password=${password}`);
}

export function email(params) {
  return request(`../api/email/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function judge(email, code) {
  return request(`../api/email/judge?email=${email}&code=${code}`);
}
