import modelExtend from 'dva-model-extend';
// import { notification } from 'antd';
import { pageModel } from './common';
import { query } from '../services/query/getinto';
import { query as feeQuery } from '../services/setting/warehouse-fee';

export default modelExtend(pageModel, {
  namespace: 'getinto',

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
      const feeRes = yield call(feeQuery);
      console.log('feeRes', feeRes);
      const data = yield call(query, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
      if (data.code === 200) {
        const list = data.data.map((item) => {
          let cargoCharge = '未获取';
          if (feeRes.code === 200) {
            const tmpTime = new Date().getTime() - item.scan_time;
            if (tmpTime > feeRes.data[0].expire_time) {
              const tmpCount = Math.ceil(tmpTime / 86400000);
              cargoCharge = `${tmpCount * feeRes.data[0].cargo_fee} 元`;
            }
          }
          return {
            key: item.id,
            ...item,
            cargo_charge: cargoCharge,
          };
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
