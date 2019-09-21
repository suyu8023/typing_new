import * as service from '../services/contest'


export default {

  namespace: 'contest',

  state: {

  },
  effects: {
    * getContestNum(_, { call, put }) {
      const UserNum = yield call(service.getContestNum);
      if (parseInt(UserNum.data.msg) === 200) {
        yield put({
          type: 'saveContestNum',
          payload: {
            data: UserNum.data.data.num
          }
        });
      }
    },
    * getContestList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContestList, params.page, params.limit)
      yield put({
        type: 'saveContestList',
        payload: {
          data: data
        }
      })
    },
  },

  reducers: {
    saveContestNum(state, { payload: { data: result } }) {
      const ContestNum = result;
      return { ...state, ContestNum }
    },
    saveContestList(state, { payload: { data: result } }) {
      const ContestList = result;
      return { ...state, ContestList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3){
          let reg = /^\d+$/;
          if (reg.test(list[2])&&list[1] === 'contest'){
            dispatch({ type: 'getContestNum' })
            dispatch({ type: 'getContestList', payload: {
              page: parseInt(list[2]),
              limit : 10
            }})
          }
        }
      });
    },
  }
}
