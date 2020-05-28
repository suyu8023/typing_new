import request from '../../../util/Request';

// 获取数据

export function getStatusList(page, limit) {
  return request(`../api/status/all?page=${page}&limit=${limit}`);
}
