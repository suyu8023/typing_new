import request from '.././../util/Request';

export function getSession() {
  return request(`../../api/user/session`);
}
