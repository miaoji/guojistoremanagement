import modelExtend from 'dva-model-extend';
import { message, notification } from 'antd';
import { pageModel } from './common';
import { query, create, update, remove } from '../services/setting/distributor';

export default modelExtend(pageModel, {
  namespace: 'distributor',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    item: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, { currentPage: 1, pageSize: 10, ...payload });
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
        message.waring('当前没有可用的数据,请创建');
      }
    },

    *create({ payload }, { call, put }) {
      const source = {
        distributor_name: payload.distributor_name,
        distributor_code: payload.distributor_code,
        remark: payload.remark,
      };
      const data = yield call(create, source);
      if (data.code === 200) {
        yield put({
          type: 'query',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        notification.success({
          message: '新增成功',
        });
      } else {
        notification.waring({
          message: data.msg,
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      const currentItem = yield select(({ distributor }) => distributor.currentItem);
      const tmp = {};
      for (const item in payload) {
        if (payload[item] !== currentItem[item]) {
          tmp[item] = payload[item];
        }
      }
      const source = {
        id: currentItem.id,
        distributor_name: tmp.distributor_name,
        distributor_code: tmp.distributor_code,
        remark: tmp.remark,
      };
      const res = yield call(update, source);
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
      } else {
        notification.success({
          message: res.msg,
        });
      }
    },

    *remove({ payload }, { call, put }) {
      const res = yield call(remove, { ids: [payload.id] });
      if (res.code === 200) {
        yield put({
          type: 'query',
        });
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
