import request from '../../../../../util/Request';

// 获取数据

export function getContestRankList(cid, page, limit) {
  return request(`../../../api/contest/rank/${cid}?page=${page}&limit=${limit}`);
}

export function getUserContestRankList(cid, page, limit, username) {
  return request(`../../../api/contest/rank/${cid}/${username}?page=${page}&limit=${limit}`);
}
