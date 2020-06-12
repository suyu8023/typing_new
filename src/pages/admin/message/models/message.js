import * as service from '../services/message';
import { message } from 'antd';
export default {
  namespace: 'message',

  state: {},
  effects: {
    *getMessageList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMessageList, params.page, params.limit);
      yield put({
        type: 'saveMessageList',
        payload: {
          data: data,
        },
      });
    },
    *getMesnameList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getMesnameList, params.page, params.limit, params.name);
      yield put({
        type: 'saveMessageList',
        payload: {
          data: data,
        },
      });
    },
    *deleteMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteMessage, params.obj);
      if (data.success == true) {
        message.success('删除成功');
      } else message.success(data.msg);
      yield put({
        type: 'getMessageList',
        payload: {
          page: parseInt(params.page),
          limit: 10,
        },
      });
    },

    *addMessage({ payload: params }, { call, put }) {
      let { data } = yield call(service.addMessage, params);
      if (data.success == true) {
        message.success('添加成功');
      } else message.success(data.msg);
    },
    *addMessageList({ payload: params }, { call, put }) {
      let { data } = yield call(service.addMessageList, params);
      if (data.success == true) {
        message.success('导入成功');
      } else message.success(data.msg);
    },
  },

  reducers: {
    saveMessageList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const MessageList = result.data.rows;
      const MessageNum = result.data.count;
      return { ...state, MessageList, MessageNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'admin' && list[2] === 'message') {
            if (JSON.stringify(query) == '{}') {
              dispatch({
                type: 'getMessageList',
                payload: {
                  page: parseInt(list[3]),
                  limit: 10,
                },
              });
            } else {
              dispatch({
                type: 'getMesnameList',
                payload: {
                  page: parseInt(list[3]),
                  limit: 10,
                  name: query.name,
                },
              });
            }
          }
        }
      });
    },
  },
};
