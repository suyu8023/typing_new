import * as service from '../services/header';
import {
  message
} from 'antd';
import {
  clearExpiredStateProperties,
  genTimeFlag,
  isStateExpired
} from '../../util/misc';

const initialState = {
  session: {},
};

export default {
  namespace: 'header',

  state: initialState,
  effects: {
    * getSession(_, {
      call,
      put,
      select
    }) {
      const savedState = yield select(state => state.header.session);
      if (!isStateExpired(savedState)) {
        yield put({
          type: 'saveSession',
          payload: {
            data: savedState,
            verify: false,
          },
        });
      } else {
        let {
          data
        } = yield call(service.getSession);
        yield put({
          type: 'saveSession',
          payload: {
            data: data,
            verify: true,
          },
        });
      }
    },
  },

  reducers: {
    saveSession(
      state, {
        payload: {
          data: result,
          verify
        },
      },
    ) {
      const Session = result.data;
      // console.log('wewew', Session);
      // console.log(verify);

      if (verify) {
        // console.log('qwqwqwq', result.data);

        state.session = {
          ...result,
          ...genTimeFlag(60 * 60 * 1000),
        };
      }
      return {
        ...state
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
        let reg = /^\d+$/;
        if (list[1] != 'login' && list[2] != 'reg') {
          dispatch({
            type: 'getSession',
            payload: {},
          });
        }
      });
    },
  },
};
