import * as service from '../services/admin_cid'


export default {

  namespace: 'admin_cid',

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
    * getContest({ payload: params }, { call, put }) {
      // console.log(params);
      
      let { data } = yield call(service.getContest, params.cid)
      yield put({
        type: 'saveContest',
        payload: {
          data: data
        }
      })
    },
    * getAllMessage(_, { call, put }) {
      // console.log(params);
      
      let { data } = yield call(service.getAllMessage)
      yield put({
        type: 'saveAllMessage',
        payload: {
          data: data
        }
      })
    },
    * updateContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.updateContest, params)
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
    saveAllMessage(state, { payload: { data: result } }) {
      const AllMessage = result;
      console.log(AllMessage)
      return { ...state, AllMessage }
    },
    saveContest(state, { payload: { data: result } }) {
      console.log(result.data.num[0]);
      // const Message = result[0].message;
      // const diff = result[0].diff;
      // const name = result[0].name;
      const ID = result.data.num[0].cid;
      const begin_time = result.data.num[0].begin_time;
      const end_time = result.data.num[0].end_time;
      const mid = result.data.num[0].mid;
      const contests_name = result.data.num[0].contests_name;
      return { ...state, ID, begin_time, end_time, mid, contests_name }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');        
        if (list.length === 5){
          let reg = /^\d+$/;
          if (reg.test(list[4])&&list[1]==='admin'&&list[2]==='contest'&&list[3]==='cid'){
            dispatch({ type: 'getContest', payload: {
              cid: parseInt(list[4]),
            }})
            dispatch({ type: 'getAllMessage'})
          }
        }
      });
    },
  }
}
