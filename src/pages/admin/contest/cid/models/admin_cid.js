import * as service from '../services/admin_cid';
import { message } from 'antd';
export default {
  namespace: 'admin_cid',

  state: {},
  effects: {
    // * getUserNum(_, { call, put }) {
    //   const UserNum = yield call(service.getUserNum);
    //   if (parseInt(UserNum.data.msg) === 200) {
    //     yield put({
    //       type: 'saveUserNum',
    //       payload: {
    //         data: UserNum.data.data.num
    //       }
    //     });
    //   }
    // },
    *getContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContest, params.cid);
      yield put({
        type: 'saveContest',
        payload: {
          data: data,
        },
      });
    },
    *getAllMessage(_, { call, put }) {
      let { data } = yield call(service.getAllMessage);
      yield put({
        type: 'saveAllMessage',
        payload: {
          data: data,
        },
      });
    },
    *updateContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.updateContest, params);
      if (data.success == true) message.success('更新成功');
      else message.success(data.msg);
    },
  },

  reducers: {
    saveUserNum(
      state,
      {
        payload: { data: result },
      },
    ) {
      const UserNum = result;
      return { ...state, UserNum };
    },
    saveAllMessage(
      state,
      {
        payload: { data: result },
      },
    ) {
      const AllMessage = result.data;
      return { ...state, AllMessage };
    },
    saveContest(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Contest = result.data;
      return { ...state, Contest };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 5) {
          let reg = /^\d+$/;
          if (
            reg.test(list[4]) &&
            list[1] === 'admin' &&
            list[2] === 'contest' &&
            list[3] === 'cid'
          ) {
            dispatch({
              type: 'getContest',
              payload: {
                cid: parseInt(list[4]),
              },
            });
            dispatch({ type: 'getAllMessage' });
          }
        }
      });
    },
  },
};
