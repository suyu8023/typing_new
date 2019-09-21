import * as service from '../services/rank'


export default {

  namespace: 'rank',

  state: {

  },
  effects: {
    * getStatusNum(_, { call, put }) {
      const UserNum = yield call(service.getStatusNum);
      if (parseInt(UserNum.data.msg) === 200) {
        yield put({
          type: 'saveStatusNum',
          payload: {
            data: UserNum.data.data.num
          }
        });
      }
    },
    * getRankList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getRankList, params.page, params.limit)
      yield put({
        type: 'saveRankList',
        payload: {
          data: data
        }
      })
    },
  },

  reducers: {
    saveStatusNum(state, { payload: { data: result } }) {
      const StatusNum = result;
      return { ...state, StatusNum }
    },
    saveRankList(state, { payload: { data: result } }) {
      const RankList = result;
      return { ...state, RankList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3){
          let reg = /^\d+$/;
          if (reg.test(list[2])&&list[1] === 'rank'){
            dispatch({ type: 'getStatusNum' })
            dispatch({ type: 'getRankList', payload: {
              page: parseInt(list[2]),
              limit : 10
            }})
          }
        }
      });
    },
  }
}
