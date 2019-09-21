import * as service from '../services/status'


export default {

  namespace: 'status',

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
    * getStatusList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getStatusList, params.page, params.limit)
      yield put({
        type: 'saveStatusList',
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
    saveStatusList(state, { payload: { data: result } }) {
      const StatusList = result;
      return { ...state, StatusList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3){
          let reg = /^\d+$/;
          console.log(pathname)
          if (reg.test(list[2])&&list[1] === 'status'){
            dispatch({ type: 'getStatusNum' })
            dispatch({ type: 'getStatusList', payload: {
              page: parseInt(list[2]),
              limit : 10
            }})
          }
        }
      });
    },
  }
}
