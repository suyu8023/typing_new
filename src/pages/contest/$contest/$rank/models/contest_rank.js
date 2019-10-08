import * as service from '../services/contest_rank'


export default {

  namespace: 'contest_rank',

  state: {

  },
  effects: {
    * getContestRankNum({ payload: params }, { call, put }) {
      const UserNum = yield call(service.getContestRankNum, params.cid);
      if (parseInt(UserNum.data.msg) === 200) {
        yield put({
          type: 'saveContestRankNum',
          payload: {
            data: UserNum.data.data.num
          }
        });
      }
    },
    * getContestRankList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContestRankList, params.cid ,params.page, params.limit)
      yield put({
        type: 'saveContestRankList',
        payload: {
          data: data
        }
      })
    },
  },

  reducers: {
    saveContestRankNum(state, { payload: { data: result } }) {
      const ContestRankNum = result;
      return { ...state, ContestRankNum }
    },
    saveContestRankList(state, { payload: { data: result } }) {
      const ContestRankList = result;
      return { ...state, ContestRankList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 5) {
          let reg = /^\d+$/;
          if (reg.test(list[2]) && reg.test(list[4]) && list[1] === 'contest'&&list[3]!=='message') {
            dispatch({
              type: 'getContestRankNum', payload: {
                cid: parseInt(list[2]),
              }
            })
            dispatch({
              type: 'getContestRankList', payload: {
                cid: parseInt(list[2]),
                page: parseInt(list[4]),
                limit: 10
              }
            })
          }
        }
      });
    },
  }
}
