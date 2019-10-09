import * as service from '../services/admin_contest'


export default {

  namespace: 'admin_contest',

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
    * addContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.addContest, params)
    },
    * deleteContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteContest, params.obj)
    },
    * getAllMessage(_, { call, put }) {
      
      let { data } = yield call(service.getAllMessage)
      yield put({
        type: 'saveAllMessage',
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
    saveAllMessage(state, { payload: { data: result } }) {
      const AllMessage = result;
      console.log(AllMessage)
      return { ...state, AllMessage }
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
        if (list.length === 4){
          // console.log("qwqwqwqw");
          let reg = /^\d+$/;
          if (reg.test(list[3])&&list[2] === 'contest'&&list[1] === 'admin'){
            dispatch({ type: 'getContestNum' })
            dispatch({ type: 'getContestList', payload: {
              page: parseInt(list[3]),
              limit : 10
            }})
            dispatch({ type: 'getAllMessage'})
          }
        }
      });
    },
  }
}
