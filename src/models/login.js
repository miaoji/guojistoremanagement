import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { accountLogin } from '../services/api';
import { setAuthority, setToken, delToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // right payload
      // imageCode:"11"
      // password:"888888"
      // type:"account"
      // username:"admin"
      const newOptions = { ...payload };
      if (payload.type === 'account') {
        newOptions.uuid = window.localStorage.getItem('login-uuid');
      }
      const response = yield call(accountLogin, newOptions);
      // right response
      // currentAuthority:"admin"
      // status:"ok"
      // type:"account"
      let loginStatus = {};
      if (response.code !== 200) {
        notification.error({
          message: `请求错误 ${response.code}`,
          description: response.msg,
        });
        loginStatus = {
          currentAuthority: 'guest',
          status: 'error',
          type: payload.type,
        };
      } else {
        loginStatus = {
          currentAuthority: 'admin',
          status: 'ok',
          type: payload.type,
        };
      }
      yield put({
        type: 'changeLoginStatus',
        payload: loginStatus,
      });
      // Login successfully
      if (loginStatus.status === 'ok') {
        // yield put({
        //   type: 'user/saveCurrentUser',
        //   payload: response.data,
        // });
        reloadAuthorized();
        const { token } = response;
        setToken(token);
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        delToken();
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
