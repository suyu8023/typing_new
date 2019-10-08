import * as service from '../services/reg'
import { message } from 'antd'
import router from 'umi/router';

export default {

  namespace: 'reg',

  state: {

  },
  effects: {
    * reg({ payload: params }, { call, put }) {
      const Username = yield call(service.username, params.username);
      if (Username.data.msg === 200) {
        message.error('用户名已存在')
      }
      else {
        const User = yield call(service.reg, params);
        if (parseInt(User.data.msg) === 200) {
          message.success('注册成功,请登录!')
          router.push(`/login`)
        }
        else {
          message.err('注册失败')
        }
      }

    },
  },

  reducers: {
  },
  subscriptions: {
  }
}
