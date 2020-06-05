import * as service from '../services/reg';
import { message } from 'antd';
import router from 'umi/router';
import { localeData } from 'moment';

export default {
  namespace: 'reg',

  state: {},
  effects: {
    *reg({ payload: params }, { call, put }) {
      const Username = yield call(service.username, params.username);
      console.log(Username);

      if (Username.data.success === true) {
        message.error('用户名已存在');
      } else {
        const User = yield call(service.reg, params);
        if (parseInt(User.data.success) === 200) {
          message.success('注册成功,请登录!');
          router.push(`/login`);
        } else {
          message.err('注册失败');
        }
      }
    },
    *code({ payload: params }, { call, put }) {
      const data = yield call(service.email, params);
      if (data.data.success) {
        yield put({
          type: 'saveCode',
          payload: {
            data: data,
          },
        });
        message.success('验证码发送成功');
      }
    },
  },

  reducers: {
    saveCode(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Code = result.data.data;
      return { ...state, Code };
    },
  },
  subscriptions: {},
};
