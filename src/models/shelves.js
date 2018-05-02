import modelExtend from 'dva-model-extend';
import { notification } from 'antd';
import { pageModel } from './common';
import { query, create, updata, remove } from '../services/query/shelves';

export default modelExtend(pageModel, {
  namespace: 'shelves',

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
  },

  effects: {

    *query({ payload = {
      currentPage: 1,
      pageSize: 10,
    } }, { call, put }) {
      const data = yield call(query, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
      if (data.code === 200) {
        const list = data.data.map((item, index) => {
          return { key: index, ...item };
        });
        yield put({
          type: 'setStates',
          payload: {
            list,
            total: data.total,
          },
        });
      } else {
        notification.warning({
          message: data.msg || '当前网络无法使用',
        });
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.code === 200) {
        notification.success({
          message: '货架号新增成功',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        yield put({ type: 'query' });
      } else {
        notification.success({
          message: data.msg,
        });
      }
    },

    *updata({ payload }, { call, put, select }) {
      const currentItem = yield select(({ shelves }) => shelves.currentItem);
      const res = yield call(updata, { ...payload, id: currentItem.id });
      if (res.code === 200) {
        notification.success({
          message: '货架号修改成功',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        yield put({ type: 'query' });
      } else {
        notification.success({
          message: res.msg,
        });
      }
    },

    *remove({ payload }, { call, put }) {
      const res = yield call(remove, [payload.id]);
      if (res.code === 200) {
        yield put({ type: 'query' });
        notification.success({
          message: '删除成功',
        });
      } else {
        notification.success({
          message: res.msg,
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
