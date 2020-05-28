import * as service from '../services/contest_rank';

export default {
  namespace: 'contest_rank',

  state: {},
  effects: {
    *getContestRankList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContestRankList, params.cid, params.page, params.limit);
      yield put({
        type: 'saveContestRankList',
        payload: {
          data: data,
        },
      });
    },
  },

  reducers: {
    saveContestRankList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const ContestRankList = result.data.rows;
      const ContestRankNum = result.data.count[0][0].count;
      return { ...state, ContestRankList, ContestRankNum };
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
            list[3] !== 'message'
          ) {
            dispatch({
              type: 'getContestRankNum',
              payload: {
                cid: parseInt(list[2]),
              },
            });
            dispatch({
              type: 'getContestRankList',
              payload: {
                cid: parseInt(list[2]),
                page: parseInt(list[4]),
                limit: 10,
              },
            });
          }
        }
      });
    },
  },
};
