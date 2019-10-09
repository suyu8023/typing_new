import * as service from '../services/user'


export default {

  namespace: 'user',

  state: {

  },
  effects: {
    * getUserNum(_, { call, put }) {
      const UserNum = yield call(service.getUserNum);
      // console.log(UserNum);
      yield put({
        type: 'saveUserNum',
        payload: {
          data: UserNum.data[0].num
        }
      });
      // if (parseInt(UserNum.data.msg) === 200) {
      //   yield put({
      //     type: 'saveUserNum',
      //     payload: {
      //       data: UserNum.data.data.num
      //     }
      //   });
      // }
    },
    * getUserList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUserList, params.page, params.limit)
      yield put({
        type: 'saveUserList',
        payload: {
          data: data
        }
      })
    },
    * deleteUser({ payload: params }, { call, put }) {
      // console.log(location);
      let { data } = yield call(service.deleteUser, params.obj)
      // yield put({ type: 'getUserNum' })
      // // yield put({
      // //   type: 'getMessageList', payload: {
      // //     page: parseInt(params.page),
      // //     limit: 10
      // //   }
      // // })
    },

    * addMessage({ payload: params }, { call, put }) {
      // console.log(location);
      let { data } = yield call(service.addMessage, params)
    },
  },

  reducers: {
    saveUserNum(state, { payload: { data: result } }) {
      console.log(result);
      
      const UserNum = result;
      return { ...state, UserNum }
    },
    saveUserList(state, { payload: { data: result } }) {
      const UserList = result;
      return { ...state, UserList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'admin' && list[2] === 'user') {
            dispatch({ type: 'getUserNum' })
            dispatch({
              type: 'getUserList', payload: {
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
