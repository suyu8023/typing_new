import * as service from '../services/contest_mid';

export default {
  namespace: 'contest_mid',

  state: {},
  effects: {
    *getMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMessage, params.mid);
      yield put({
        type: 'saveMessage',
        payload: {
          data: data,
        },
      });
    },
    *subContestPractice({ payload: params }, { call, put }) {
      let { data } = yield call(service.subContestPractice, params);
    },
  },

  reducers: {
    saveMessage(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Message = result.data.message;
      const Mesname = result.data.name;
      return { ...state, Message, Mesname };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 5) {
          let reg = /^\d+$/;
          if (
            reg.test(list[2]) &&
            reg.test(list[4]) &&
            list[1] === 'contest' &&
            list[3] === 'message'
          ) {
            dispatch({
              type: 'getMessage',
              payload: {
                mid: list[4],
              },
            });
          }
        }
      });
    },
  },
};
