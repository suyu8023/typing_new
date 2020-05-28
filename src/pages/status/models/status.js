import * as service from '../services/status';

export default {
  namespace: 'status',

  state: {},
  effects: {
    *getStatusList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getStatusList, params.page, params.limit);
      yield put({
        type: 'saveStatusList',
        payload: {
          data: data,
        },
      });
    },
  },

  reducers: {
    saveStatusList(
      state,
      {
        payload: { data: result },
      },
    ) {
      console.log(result);
      const StatusList = result.data.rows;
      const StatusNum = result.data.count;
      return { ...state, StatusList, StatusNum };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 3) {
          let reg = /^\d+$/;
          // console.log(pathname)
          if (reg.test(list[2]) && list[1] === 'status') {
            dispatch({
              type: 'getStatusList',
              payload: {
                page: parseInt(list[2]),
                limit: 10,
              },
            });
          }
        }
      });
    },
  },
};
