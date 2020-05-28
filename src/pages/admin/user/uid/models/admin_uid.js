import * as service from '../services/admin_uid';
import { message } from 'antd';
export default {
  namespace: 'admin_uid',

  state: {},
  effects: {
    *getUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUser, params.uid);
      yield put({
        type: 'saveUser',
        payload: {
          data: data,
        },
      });
    },
    *updateUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.updateUser, params);
      if (data.success == true) message.success('更新成功');
      else message.success(data.msg);
    },
  },

  reducers: {
    saveUser(
      state,
      {
        payload: { data: result },
      },
    ) {
      const User = result.data;

      return { ...state, User };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');

        if (list.length === 5) {
          let reg = /^\d+$/;
          if (reg.test(list[4]) && list[1] === 'admin' && list[2] === 'user' && list[3] === 'uid') {
            dispatch({
              type: 'getUser',
              payload: {
                uid: parseInt(list[4]),
              },
            });
          }
        }
      });
    },
  },
};
