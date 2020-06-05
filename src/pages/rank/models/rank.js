import * as service from '../services/rank';

export default {
  namespace: 'rank',

  state: {},
  effects: {
    *getRankList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getRankList, params.page, params.limit);
      yield put({
        type: 'saveRankList',
        payload: {
          data: data,
        },
      });
    },
    *getUserRankList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUserRankList, params.page, params.limit, params.name);
      yield put({
        type: 'saveRankList',
        payload: {
          data: data,
        },
      });
    },
  },

  reducers: {
    saveRankList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const RankList = result.data.rows;
      const StatusNum = result.data.count;
      return { ...state, RankList, StatusNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3) {
          let reg = /^\d+$/;
          if (reg.test(list[2]) && list[1] === 'rank') {
            if (JSON.stringify(query) == '{}') {
              dispatch({
                type: 'getRankList',
                payload: {
                  page: parseInt(list[2]),
                  limit: 10,
                },
              });
            } else {
              dispatch({
                type: 'getUserRankList',
                payload: {
                  page: parseInt(list[2]),
                  limit: 10,
                  name: query.name,
                },
              });
            }
          }
        }
      });
    },
  },
};
