import * as service from '../services/admin_contest';
import { message } from 'antd';
import router from 'umi/router';
export default {
  namespace: 'admin_contest',

  state: {},
  effects: {
    *getContestList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getContestList, params.page, params.limit);
      yield put({
        type: 'saveContestList',
        payload: {
          data: data,
        },
      });
    },
    *getConnameList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getConnameList, params.page, params.limit, params.name);
      yield put({
        type: 'saveContestList',
        payload: {
          data: data,
        },
      });
    },
    *addContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.addContest, params);
      if (data.success == true) {
        message.success('添加成功');
        router.push('/admin/contest/1');
      } else message.success(data.msg);
    },
    *deleteContest({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteContest, params.obj);
      if (data.success == true) message.success('删除成功');
      else message.success(data.msg);
    },
    *getAllMessage(_, { call, put }) {
      let { data } = yield call(service.getAllMessage);
      yield put({
        type: 'saveAllMessage',
        payload: {
          data: data,
        },
      });
    },
  },

  reducers: {
    saveAllMessage(
      state,
      {
        payload: { data: result },
      },
    ) {
      const AllMessage = result.data;

      return { ...state, AllMessage };
    },
    saveContestList(
      state,
      {
        payload: { data: result },
      },
    ) {
      const ContestList = result.data.rows;
      const ContestNum = result.data.count;
      return { ...state, ContestList, ContestNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[2] === 'contest' && list[1] === 'admin') {
            if (JSON.stringify(query) == '{}') {
              dispatch({
                type: 'getContestList',
                payload: {
                  page: parseInt(list[3]),
                  limit: 10,
                },
              });
            } else {
              dispatch({
                type: 'getConnameList',
                payload: {
                  page: parseInt(list[3]),
                  limit: 10,
                  name: query.name,
                },
              });
            }
            dispatch({ type: 'getAllMessage' });
          }
        }
      });
    },
  },
};
