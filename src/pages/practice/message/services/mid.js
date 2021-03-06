import request from '../../../../util/Request';

// 获取数据

export function getMessage(mid) {
  return request(`../../api/message/find/${mid}`);
}

export function subPractice(params) {
  return request(`../../api/status/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function subCh(params) {
  return request(`../../api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
