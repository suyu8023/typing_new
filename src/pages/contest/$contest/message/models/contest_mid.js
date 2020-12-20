import * as service from '../services/contest_mid';
import {
  clearExpiredStateProperties,
  genTimeFlag,
  isStateExpired
} from '../../../../../util/misc';
import router from 'umi/router';
import {
  message
} from 'antd';

const initialState = {
  detail: {},
};
export default {
  namespace: 'contest_mid',

  state: initialState,
  effects: {
    * getMessage({
      payload: params
    }, {
      call,
      put,
      select
    }) {
      const savedState = yield select(state => state.contest_mid.detail[params.mid]);
      let {
        data
      } = yield call(service.getContest, params.cid);
      yield put({
        type: 'saveContest',
        payload: {
          data: data,
        },
      });
      if (!isStateExpired(savedState)) {
        yield put({
          type: 'saveMessage',
          payload: {
            data: savedState,
          },
        });
      } else {
        let {
          data
        } = yield call(service.getMessage, params.mid);
        yield put({
          type: 'saveMessage',
          payload: {
            data: data,
          },
        });
      }
    },
    * subContestPractice({
      payload: params
    }, {
      call,
      put
    }) {

      let {
        data
      } = yield call(service.subContestPractice, params.status);
      let result = yield call(service.subCh, params.ch);
      if (data.success == true && result.data.success == true) {
        message.success('提交成功');
        localStorage.setItem('ch', params.ch.ch);
        router.push(`/contest/${params.status.cid}/rank/1`);
      }
    },
  },

  reducers: {
    saveMessage(
      state, {
        payload: {
          data: result
        },
      },
    ) {
      const Message = result.data.message;
      const Mesname = result.data.name;
      state.detail[result.data.mid] = {
        ...result,
        ...genTimeFlag(60 * 60 * 1000),
      };
      return {
        ...state,
        Message,
        Mesname
      };
    },
    saveContest(
      state, {
        payload: {
          data: result
        },
      },
    ) {
      const Contest = result.data;
      return {
        ...state,
        Contest
      };
    },
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      return history.listen(({
        pathname,
        query
      }) => {
        let list = pathname.split('/');
        if (list.length === 5) {
          let reg = /^\d+$/;
          if (
            reg.test(list[2]) &&
            reg.test(list[4]) &&
            list[1] === 'contest' &&
            list[3] === 'message'
          ) {
            dispatch({
              type: 'getMessage',
              payload: {
                mid: list[4],
                cid: list[2],
              },
            });
          }
        }
      });
    },
  },
};
