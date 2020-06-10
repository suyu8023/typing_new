import * as service from '../services/admin_mid';
import { message } from 'antd';
export default {
  namespace: 'admin_mid',

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
    *getMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMessage, params.mid);
      yield put({
        type: 'saveMessage',
        payload: {
          data: data,
        },
      });
    },
    *updateMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.updateMessage, params);
      if (data.success == true) message.success('更新成功');
      else message.success(data.msg);
    },
    *deleteMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteMessage, params);
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
    saveMessage(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Message = result.data;

      // const Message = result[0].message;
      // const diff = result[0].diff;
      // const name = result[0].name;
      // const ID = result[0].mid;

      return { ...state, Message };
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
            list[2] === 'message' &&
            list[3] === 'mid'
          ) {
            dispatch({
              type: 'getMessage',
              payload: {
                mid: parseInt(list[4]),
              },
            });
          }
        }
      });
    },
  },
};
