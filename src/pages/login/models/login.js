import * as service from '../services/login';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'login',

  state: {},
  effects: {
    *login({ payload: params }, { call, put }) {
      const User = yield call(service.login, params);

      if (User.data.success === true) {
        localStorage.setItem('status', User.data.data.status);
        localStorage.setItem('username', User.data.data.username);
        localStorage.setItem('nickname', User.data.data.nickname);
        localStorage.setItem('uid', User.data.data.uid);
        localStorage.setItem('ch', User.data.data.ch);
        sessionStorage.setItem('username', User.data.data.username);
        // localStorage.setItem('time', Time.data.time)
        yield put({
          type: 'saveLogin',
          payload: {
            data: true,
          },
        });
        router.push(`/`);
      } else {
        yield put({
          type: 'saveLogin',
          payload: {
            data: false,
          },
        });
        message.error('账号或密码错误');
      }
    },
  },

  reducers: {
    saveLogin(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Login = result;
      return { ...state, Login };
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
  },
};
