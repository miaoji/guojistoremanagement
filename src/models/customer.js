import { message } from 'antd';
import { update, add, query, remove, recharge } from '../services/setting/customer';

export default {
  namespace: 'customer',

  state: {
    rechargeModalVisible: false,
    dbCurrentItem: [],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      /* eslint-disable no-param-reassign */
      if (!payload) {
        payload = {
          currentPage: 1,
          pageSize: 10,
        };
      }
      const response = yield call(query, payload);
      const { data, total } = response;
      const pagination = {
        ...payload,
        total,
      };
      yield put({
        type: 'save',
        payload: {
          list: data,
          pagination,
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.code === 200) {
        message.success('添加成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('添加失败' || response.msg);
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 200) {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('删除失败' || response.msg);
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (response.code === 200) {
        message.success('更新成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('更新失败' || response.msg);
      }
      if (callback) callback();
    },
    *recharge({ payload }, { call, put, select }) {
      const id = yield select(({ customer }) => customer.dbCurrentItem.id);
      const res = yield call(recharge, {
        id,
        money: payload.money,
        type: payload.type,
      });
      if (res.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            rechargeModalVisible: false,
          },
        });
        message.success('操作成功');
        yield put({
          type: 'fetch',
        });
      } else {
        message.warning(res.msg || '网络连接失败');
      }
    },
  },

  reducers: {
    setStates(state, { payload }) {
      console.log('payload', payload);
      return { ...state, ...payload };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
