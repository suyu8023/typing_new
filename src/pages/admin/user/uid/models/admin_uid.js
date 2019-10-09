import * as service from '../services/admin_uid'


export default {

  namespace: 'admin_uid',

  state: {

  },
  effects: {
    // * getUserNum(_, { call, put }) {
    //   const UserNum = yield call(service.getUserNum);
    //   if (parseInt(UserNum.data.msg) === 200) {
    //     yield put({
    //       type: 'saveUserNum',
    //       payload: {
    //         data: UserNum.data.data.num
    //       }
    //     });
    //   }
    // },
    * getUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUser, params.uid)
      yield put({
        type: 'saveUser',
        payload: {
          data: data
        }
      })
    },
    * updateUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.updateUser, params)
    },
    * deleteMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteMessage, params)
    },
  },

  reducers: {
    saveUserNum(state, { payload: { data: result } }) {
      const UserNum = result;
      return { ...state, UserNum }
    },
    saveUser(state, { payload: { data: result } }) {
      // console.log(result);
      const email = result[0].email;
      const nickname = result[0].nickname;
      const status = result[0].status;
      const ID = result[0].uid;
      const username = result[0].username;
      return { ...state, email, nickname, status, ID, username  }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        console.log(list);
        
        if (list.length === 5){
          let reg = /^\d+$/;
          if (reg.test(list[4])&&list[1]==='admin'&&list[2]==='user'&&list[3]==='uid'){
            dispatch({ type: 'getUser', payload: {
              uid: parseInt(list[4]),
            }})
          }
        }
      });
    },
  }
}
