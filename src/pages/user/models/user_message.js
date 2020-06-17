import * as service from '../services/user_message';
import { message } from 'antd';
import router from 'umi/router';
import { localeData } from 'moment';

export default {
  namespace: 'user_message',

  state: {},
  effects: {
    *getUserRecordList({ payload: params }, { call, put }) {
      const { data } = yield call(service.username, params.username);
      if (data.success === true) {
        yield put({
          type: 'saveUserRecordList',
          payload: {
            data: data,
          },
        });
      }
    },
    *getUser({ payload: params }, { call, put }) {
      const { data } = yield call(service.user, params.uid);
      if (data.success === true) {
        yield put({
          type: 'saveUser',
          payload: {
            data: data,
          },
        });
      }
    },
    *updateUser({ payload: params }, { call, put }) {
      const { data } = yield call(service.updateUser, params);
      if (data.success === true) {
        message.success('修改昵称成功');
        yield put({
          type: 'getUser',
          payload: {
            uid: params.uid,
          },
        });
      } else {
        message.error('修改昵称失败');
      }
    },
    *updatePassword({ payload: params }, { call, put }) {
      const result = yield call(service.judgeUser, params.username, params.old_password);
      if (result.data.success == true) {
        let obj = {
          password: params.password1,
          username: params.username,
          uid: params.uid,
        };
        const { data } = yield call(service.updateUser, obj);
        if (data.success === true) {
          message.success('修改密码成功');
        } else {
          message.error('修改密码失败');
        }
      } else {
        message.error('旧密码输入错误');
      }
    },
    *code({ payload: params }, { call, put }) {
      const data = yield call(service.email, params);
      if (data.data.success) {
        message.success('验证码发送成功');
      }
    },
    *updateEmail({ payload: params }, { call, put }) {
      const judge = yield call(service.judge, params.email, params.code);
      if (judge.data.success === true) {
        let obj = {
          email: params.email,
          uid: params.uid,
        };
        const { data } = yield call(service.updateUser, obj);
        if (data.success === true) {
          message.success('修改邮箱成功');
          yield put({
            type: 'getUser',
            payload: {
              uid: params.uid,
            },
          });
        } else {
          message.error('修改邮箱失败');
        }
      } else {
        message.error('验证码和邮箱不匹配');
      }
    },
  },

  reducers: {
    saveUserRecordList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const UserRecord = result.data.rows;
      return { ...state, UserRecord };
    },
    saveUser(
      state,
      {
        payload: { data: result },
      },
    ) {
      const User = result.data;
      return { ...state, User };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3) {
          if (list[1] === 'user') {
            dispatch({
              type: 'getUserRecordList',
              payload: {
                username: list[2],
              },
            });
            dispatch({
              type: 'getUser',
              payload: {
                uid: localStorage.getItem('uid'),
              },
            });
          }
        }
      });
    },
  },
};
