import modelExtend from 'dva-model-extend';
import { notification } from 'antd';
import { pageModel } from './common';
import { getOrderDetail, update } from '../services/cargo';

export default modelExtend(pageModel, {
  namespace: 'cargo',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
    expressList: [],
  },

  effects: {

    *query({ payload = {
      currentPage: 1,
      pageSize: 10,
    } }, { call, put }) {
      const data = yield call(getOrderDetail, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
      if (data.code === 200) {
        const list = data.data.map((item) => {
          return { key: item.id, ...item };
        });
        yield put({
          type: 'setStates',
          payload: {
            list,
            total: data.total,
          },
        });
      } else {
        yield put({
          type: 'setStates',
          payload: {
            list: [],
            total: 0,
          },
        });
      }
    },

    *updata({ payload }, { call, put, select }) {
      const id = yield select(({ cargo }) => cargo.currentItem.ID);
      const newpayload = payload;
      newpayload.id = id;
      const res = yield call(update, newpayload);
      if (res.code === 200) {
        notification.success({
          message: '修改成功',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        yield put({
          type: 'query',
        });
      }
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});
