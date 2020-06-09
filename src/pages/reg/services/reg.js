import request from '../../../util/Request';

// 获取数据

export function username(username) {
  return request(`../api/user/findUsername?name=${username}`);
}

export function judge(email, code) {
  return request(`../api/email/judge?email=${email}&code=${code}`);
}

export function reg(params) {
  return request(`../api/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
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
