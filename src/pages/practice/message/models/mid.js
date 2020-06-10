import * as service from '../services/mid';
import router from 'umi/router';
import { message } from 'antd';
import { clearExpiredStateProperties, genTimeFlag, isStateExpired } from '../../../../util/misc';
const initialState = {
  detail: {},
};

export default {
  namespace: 'mid',

  state: initialState,
  effects: {
    *getMessage({ payload: params }, { call, put, select }) {
      const savedState = yield select(state => state.mid.detail[params.mid]);
      if (!isStateExpired(savedState)) {
        yield put({
          type: 'saveMessage',
          payload: {
            data: savedState,
          },
        });
      } else {
        let { data } = yield call(service.getMessage, params.mid);
        yield put({
          type: 'saveMessage',
          payload: {
            data: data,
          },
        });
      }
    },
    *subPractice({ payload: params }, { call, put }) {
      let { data } = yield call(service.subPractice, params.status);
      let result = yield call(service.subCh, params.ch);
      if (data.success == true && result.data.success == true) {
        message.success('提交成功');
        localStorage.setItem('ch', params.ch.ch);
        router.push('/status/1');
      }
      // yield put({
      //   type: 'saveMessage',
      //   payload: {
      //     data: data[0].message
      //   }
      // })
    },
  },

  reducers: {
    saveMessage(
      state,
      {
        payload: { data: result },
      },
    ) {
      const Message = result.data.message;
      const Mename = result.data.name;
      state.detail[result.data.mid] = {
        ...result,
        ...genTimeFlag(60 * 60 * 1000),
      };
      return { ...state, Message, Mename };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');

        if (list.length === 4) {
          // console.log(list);
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'practice' && list[2] === 'message') {
            dispatch({
              type: 'getMessage',
              payload: {
                mid: list[3],
              },
            });
          }
        }
      });
    },
  },
};
