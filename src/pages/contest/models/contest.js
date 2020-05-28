import * as service from '../services/contest';

export default {
  namespace: 'contest',

  state: {},
  effects: {
    *getContestList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContestList, params.page, params.limit);
      yield put({
        type: 'saveContestList',
        payload: {
          data: data,
        },
      });
    },
  },

  reducers: {
    saveContestList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const ContestList = result.data.rows;
      const ContestNum = result.data.count;
      return { ...state, ContestList, ContestNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3) {
          // console.log("qwqwqwqw");
          let reg = /^\d+$/;
          if (reg.test(list[2]) && list[1] === 'contest') {
            dispatch({
              type: 'getContestList',
              payload: {
                page: parseInt(list[2]),
                limit: 10,
              },
            });
          }
        }
      });
    },
  },
};
