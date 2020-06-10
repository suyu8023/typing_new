import * as service from '../services/practice';

export default {
  namespace: 'practice',

  state: {},
  effects: {
    *getMessageList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMessageList, params.page, params.limit);
      if (data.success === true) {
        yield put({
          type: 'saveMessageList',
          payload: {
            data: data,
          },
        });
      }
    },
    *getMesnameList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMesnameList, params.page, params.limit, params.mesname);
      if (data.success === true) {
        yield put({
          type: 'saveMessageList',
          payload: {
            data: data,
          },
        });
      }
    },
  },

  reducers: {
    saveMessageList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const MessageList = result.data.rows;
      const MessageNum = result.data.count;
      return { ...state, MessageList, MessageNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');

        if (list.length === 3) {
          let reg = /^\d+$/;
          if (reg.test(list[2]) && list[1] === 'practice') {
            if (JSON.stringify(query) == '{}') {
              dispatch({
                type: 'getMessageList',
                payload: {
                  page: parseInt(list[2]),
                  limit: 10,
                },
              });
            } else {
              dispatch({
                type: 'getMesnameList',
                payload: {
                  page: parseInt(list[2]),
                  limit: 10,
                  mesname: query.name,
                },
              });
            }
          }
        }
      });
    },
  },
};
