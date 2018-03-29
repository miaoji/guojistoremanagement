import { notification } from 'antd';
import { Base64 } from 'js-base64';
import { query as queryUsers, queryCurrent } from '../services/user';
import { getToken } from '../utils/authority';
import store from '../index';

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
      const token = getToken();
      const response = yield call(queryCurrent, token);
      if (response.code !== 200 && process.env.NODE_ENV !== 'development') {
        const { dispatch } = store;
        dispatch({
          type: 'login/logout',
        });
        notification.error({
          message: `请求错误 ${response.code}`,
          description: response.msg,
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
