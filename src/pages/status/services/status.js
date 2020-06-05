import request from '../../../util/Request';

// 获取数据

export function getStatusList(page, limit) {
  return request(`../api/status/all?page=${page}&limit=${limit}`);
}

export function getStatusUserList(page, limit, name) {
  return request(`../api/status/findUserStatus?page=${page}&limit=${limit}&name=${name}`);
}
