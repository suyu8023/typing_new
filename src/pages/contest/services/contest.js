import request from '../../../util/Request';

// 获取数据

export function getContestList(page, limit) {
  return request(`../api/contest/all?page=${page}&limit=${limit}`);
}

export function getConnameList(page, limit, name) {
  return request(`../api/contest/findconname?page=${page}&limit=${limit}&name=${name}`);
}
