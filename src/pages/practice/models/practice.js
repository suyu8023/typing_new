import * as service from '../services/practice'


export default {

  namespace: 'practice',

  state: {

  },
  effects: {
    * getUserNum(_, { call, put }) {
      const UserNum = yield call(service.getUserNum);
      if (parseInt(UserNum.data.msg) === 200) {
        yield put({
          type: 'saveUserNum',
          payload: {
            data: UserNum.data.data.num
          }
        });
      }
    },
    * getMessageList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMessageList, params.page, params.limit)
      yield put({
        type: 'saveMessageList',
        payload: {
          data: data
        }
      })
    },
  },

  reducers: {
    saveUserNum(state, { payload: { data: result } }) {
      const UserNum = result;
      return { ...state, UserNum }
    },
    saveMessageList(state, { payload: { data: result } }) {
      const MessageList = result;
      return { ...state, MessageList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3){
          let reg = /^\d+$/;
          if (reg.test(list[2])&&list[1]==='practice'){
            dispatch({ type: 'getUserNum' })
            dispatch({ type: 'getMessageList', payload: {
              page: parseInt(list[2]),
              limit : 10
            }})
          }
        }
      });
    },
  }
}
