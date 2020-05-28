import request from '../../../util/Request';

// 获取数据

export function getMessageList(page, limit) {
  return request(`../api/message/all?page=${page}&limit=${limit}`);
}
