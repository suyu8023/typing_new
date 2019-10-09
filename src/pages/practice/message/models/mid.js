import * as service from '../services/mid'


export default {

  namespace: 'mid',

  state: {

  },
  effects: {
    * getMessage({ payload: params }, { call, put }) {
      
      let { data } = yield call(service.getMessage, params.mid)
      yield put({
        type: 'saveMessage',
        payload: {
          data: data[0].message
        }
      })
    },
    * subPractice({ payload: params }, { call, put }) {
      
      let { data } = yield call(service.subPractice, params)
      // yield put({
      //   type: 'saveMessage',
      //   payload: {
      //     data: data[0].message
      //   }
      // })
    },
  },

  reducers: {
    saveMessage(state, { payload: { data: result } }) {
      const Message = result;
      return { ...state, Message }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        
        if (list.length === 4){
          // console.log(list);
          let reg = /^\d+$/;
          if (reg.test(list[3])&&list[1]==='practice'&&list[2]==='message'){
            dispatch({ type: 'getMessage', payload: {
              mid: list[3]
            }})
          }
        }
      });
    },
  }
}
