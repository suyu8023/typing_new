import * as service from '../services/header'
import { message } from 'antd'

export default {

  namespace: 'header',

  state: {

  },
  effects: {
    * login({ payload: params }, { call, put }) {
      const User = yield call(service.login, params);      
      if (parseInt(User.data.msg) === 200) {
        localStorage.setItem('status', User.data.data.status);
        localStorage.setItem('username', User.data.data.username);
        localStorage.setItem('uid', User.data.data.uid);
        yield put({
          type: 'saveLogin',
          payload: {
            data: true
          }
        });
      }
      else{
        yield put({
          type: 'saveLogin',
          payload: {
            data: false
          }
        });
        message.error('账号或密码错误')
      }
    },
  },

  reducers: {
    saveLogin(state, { payload: { data: result } }) {
      const Login = result;
      return { ...state, Login }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // let list = pathname.split('/');
        // if (list.length === 3){
        //   let reg = /^\d+$/;
        //   if (reg.test(list[2])&&list[1] === 'rank'){
        //     dispatch({ type: 'getStatusNum' })
        //     dispatch({ type: 'getRankList', payload: {
        //       page: parseInt(list[2]),
        //       limit : 10
        //     }})
        //   }
        // }
      });
    },
  }
}
