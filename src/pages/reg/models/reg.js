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

      if (Username.data.success === true) {
        message.error('用户名已存在');
      } else {
        const judge = yield call(service.judge, params.email, params.code);
        if (judge.data.success === true) {
          const User = yield call(service.reg, params);
          if (User.data.success === true) {
            message.success('注册成功,请登录!');
            router.push(`/login`);
          } else {
            message.error('注册失败');
          }
        } else {
          message.error('验证码和邮箱不匹配');
        }
      }
    },
    *code({ payload: params }, { call, put }) {
      const data = yield call(service.email, params);
      if (data.data.success) {
        message.success('验证码发送成功');
      }
    },
  },

  reducers: {},
  subscriptions: {},
};
