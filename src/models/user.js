import { notification } from 'antd';
import { Base64 } from 'js-base64';
import { query as queryUsers, queryCurrent } from '../services/user';
import { getToken } from '../utils/authority';
import store from '../index';
import { getToken as getMzToken } from '../services/token';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const mzToken = yield call(getMzToken, {
        timestamp: '1522112875223',
        nonceStr: '35077935fccf407e69262e04c2120539',
        sign: '2207bcfbee4bf9f7dd31247ca49c504b',
      });
      if (mzToken.statusCode === 200) {
        console.log('获取明彰token成功----');
        window.localStorage.setItem('mztoken', mzToken.repldata);
      }
      const token = getToken();
      const response = yield call(queryCurrent, token);
      if (response.code !== 200 && process.env.NODE_ENV !== 'development') {
        const { dispatch } = store;
        dispatch({
          type: 'login/logout',
        });
        notification.error({
          message: '登录状态已过期, 请重新登录',
          description: '登录状态提醒',
        });
      } else {
        const userInfo = Base64.encode(JSON.stringify(response.data));
        localStorage.setItem('mzck-pro-user', userInfo);
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
