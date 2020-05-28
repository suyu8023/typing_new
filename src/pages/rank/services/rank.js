import request from '../../../util/Request';

// 获取数据

export function getRankList(page, limit) {
  return request(`../api/status/rank?page=${page}&limit=${limit}`);
}
