import request from '../../../../util/Request';

// 获取数据

export function getMessageList(page, limit) {
  return request(`../../api/message/all?page=${page}&limit=${limit}`);
}

export function getMesnameList(page, limit, mesname) {
  return request(`../../api/message/findMesname?page=${page}&limit=${limit}&mesname=${mesname}`);
}

export function deleteMessage(params) {
  return request(`../../api/message/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function addMessage(params) {
  return request(`../../api/message/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
export function addMessageList(params) {
  return request(`../../api/message/createList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
