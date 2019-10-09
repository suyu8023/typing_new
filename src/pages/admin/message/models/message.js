import * as service from '../services/message'


export default {

  namespace: 'message',

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
    * deleteMessage({ payload: params }, { call, put }) {
      // console.log(location);
      let { data } = yield call(service.deleteMessage, params.obj)
      yield put({ type: 'getUserNum' })
      yield put({
        type: 'getMessageList', payload: {
          page: parseInt(params.page),
          limit: 10
        }
      })
    },

    * addMessage({ payload: params }, { call, put }) {
      // console.log(location);
      let { data } = yield call(service.addMessage, params)
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
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'admin' && list[2] === 'message') {
            dispatch({ type: 'getUserNum' })
            dispatch({
              type: 'getMessageList', payload: {
                page: parseInt(list[3]),
                limit: 10
              }
            })
          }
        }
      });
    },
  }
}
