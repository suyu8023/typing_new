import * as service from '../services/user';
import { message } from 'antd';
export default {
  namespace: 'user',

  state: {},
  effects: {
    *getUserList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUserList, params.page, params.limit);
      yield put({
        type: 'saveUserList',
        payload: {
          data: data,
        },
      });
    },
    *deleteUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteUser, params.obj);
      if (data.success == true) message.success('删除成功');
      else message.success(data.msg);
    },

    *addUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.addUser, params);
      if (data.success == true) message.success('添加成功');
      else message.success(data.msg);
    },
  },

  reducers: {
    saveUserList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const UserList = result.data.rows;
      const UserNum = result.data.count;
      return { ...state, UserList, UserNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'admin' && list[2] === 'user') {
            dispatch({
              type: 'getUserList',
              payload: {
                page: parseInt(list[3]),
                limit: 10,
              },
            });
          }
        }
      });
    },
  },
};
