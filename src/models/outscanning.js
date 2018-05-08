import React from 'react';
import { message, notification, Select } from 'antd';
import { update, add, query, remove } from '../services/cargo';
import { query as queryShelfInfo } from '../services/query/shelves';
import { getOrderNo } from '../services/api';
import { countrylist, productlist, packagelist, freightprice } from '../services/setting/freight';
import { storage } from '../utils';

const { Option } = Select;

export default {
  namespace: 'outscanning',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    shelNoCount: 0,
    outOrderCount: '0',
    outBatchCount: '0',
    orderNo: '',
    countryInfo: [],
    productInfo: [],
    packageInfo: [],
    shelNoOption: [],
    packageDis: true,
    productDis: true,
    musicPlay: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'getShelNo' });
      /* eslint-disable no-param-reassign */
      if (!payload) {
        payload = {
          currentPage: 1,
          pageSize: 10,
        };
      }
      const response = yield call(query, {
        ...payload,
        type: 1,
      });
      const { data, total } = response;
      const pagination = {
        ...payload,
        total,
      };
      const outOrderCount = storage({ key: 'outOrderCount' }) || '0';
      const outBatchCount = storage({ key: 'outBatchCount' }) || '0';
      yield put({
        type: 'save',
        payload: {
          list: data,
          pagination,
          outOrderCount,
          outBatchCount,
        },
      });
    },
    *add({ payload, callback }, { call, put, select }) {
      const outOrderCount = Number(storage({ key: 'outOrderCount' }));
      const outBatchCount = Number(storage({ key: 'outBatchCount' }));
      const priceOptions = {
        countryId: Number(payload.destination.split('/')[0]),
        packageTypeId: Number(payload.packageType.split('/')[0]),
        productTypeId: Number(payload.productType.split('/')[0]),
        weight: Number(payload.weight),
      };
      const { orderNo } = yield select(_ => _.outscanning);
      const priceData = yield call(freightprice, priceOptions);
      const { finalPrice } = priceData.data;
      const response = yield call(add, {
        data: {
          cnNo: payload.cnNo,
          orderNo,
          customerNo: payload.customerNo,
          shelfNo: payload.shelfNo,
          destination: payload.destination.split('/')[1],
          packageTypeId: payload.packageType.split('/')[0],
          productTypeId: payload.productType.split('/')[0],
          expressCompanyCode: payload.expressCompanyCode,
          height: payload.height,
          length: payload.length,
          weight: payload.weight,
          wide: payload.wide,
          expressCharge: finalPrice,
          volumeWeight: payload.volumeWeight,
          distributorId: payload.distributorId,
        },
        params: {
          type: 1,
        },
      });
      if (response.code === 200) {
        storage({ type: 'set', key: 'outOrderCount', val: outOrderCount + 1 });
        const storageOrderNo = storage({ key: 'orderNo' });
        if (orderNo !== storageOrderNo || outBatchCount === 0) {
          storage({ type: 'set', key: 'outBatchCount', val: outBatchCount + 1 });
        }
        storage({ type: 'set', key: 'orderNo', val: orderNo });
        yield put({ type: 'setStates', payload: { musicPlay: true } });
        notification.success({
          message: '添加成功',
        });
        yield put({ type: 'fetch' });
      } else {
        notification.warning({
          message: '添加失败',
        });
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 200) {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '当前网络无法使用');
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const priceOptions = {
        countryId: Number(payload.destination.split('/')[0]),
        packageTypeId: Number(payload.packageType.split('/')[0]),
        productTypeId: Number(payload.productType.split('/')[0]),
        weight: Number(payload.weight),
      };
      const priceData = yield call(freightprice, priceOptions);
      const { finalPrice } = priceData.data;
      const response = yield call(update, {
        id: payload.id,
        cnNo: payload.cnNo,
        orderNo: payload.orderNo,
        customerNo: payload.customerNo,
        shelfNo: payload.shelfNo,
        destination: payload.destination.split('/')[1],
        packageTypeId: payload.packageType.split('/')[0],
        productTypeId: payload.productType.split('/')[0],
        expressCompanyCode: payload.expressCompanyCode,
        height: payload.height,
        length: payload.length,
        weight: payload.weight,
        wide: payload.wide,
        expressCharge: finalPrice,
        volumeWeight: payload.volumeWeight,
      });
      if (response.code === 200) {
        message.success('更新成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '当前网络无法使用');
      }
      if (callback) callback();
    },
    *initOrderNo(_, { put }) {
      const orderNo = window.localStorage.getItem('orderno');
      if (orderNo) {
        yield put({
          type: 'setStates',
          payload: {
            orderNo,
          },
        });
      } else {
        yield put({
          type: 'getOrderNo',
        });
      }
    },
    *getOrderNo({ callback }, { call, put }) {
      const data = yield call(getOrderNo);
      const source = data.data;
      if (data.code === 200 && source) {
        yield put({
          type: 'setStates',
          payload: {
            orderNo: source,
          },
        });
        window.localStorage.setItem('orderno', source);
      } else {
        message.warning('内单号获取失败');
      }
      if (callback) callback();
    },
    *getCountryInfo(_, { call, put }) {
      const data = yield call(countrylist);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.country_code}`;
          return <Option key={id}>{items.country_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            countryInfo: options,
          },
        });
      } else {
        message.warning('国家列表信息获取失败');
      }
    },
    *getPackageInfo({ payload }, { call, put }) {
      const data = yield call(packagelist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.name_cn}`;
          return <Option key={id}>{items.name_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            packageInfo: options,
            packageDis: false,
            productDis: true,
            productInfo: [],
          },
        });
      } else {
        message.warning('您选择的国家没有对应包裹类型,请创建');
      }
    },
    *getProductInfo({ payload }, { call, put }) {
      const data = yield call(productlist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.product_name}`;
          return <Option key={id}>{items.product_name}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            productInfo: options,
            productDis: false,
          },
        });
      } else {
        message.warning('您选择的包裹类型没有对应的产品类型,请创建');
      }
    },
    *getShelNoCount({ payload }, { call, put }) {
      const data = yield call(queryShelfInfo, payload);
      if (data.code === 200 && data.data && data.data.length > 0) {
        const shelNoCount = data.data[0].in - data.data[0].out;
        yield put({
          type: 'setStates',
          payload: {
            shelNoCount,
          },
        });
      }
    },
    *getShelNo(_, { call, put }) {
      const data = yield call(queryShelfInfo, { currentPage: 1, pageSize: 10000 });
      if (data.code === 200) {
        if (data.data && data.data.length === 0) {
          message.warning('当前没有货架号,请添加货架号后进行入库操作');
          return;
        }
        const options = data.data.map((items) => {
          return <Option key={items.shelf_no}>{items.shelf_no}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            shelNoOption: options,
          },
        });
      } else {
        message.warning(data.msg || '网络延迟, 请刷新');
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
        outOrderCount: action.payload.outOrderCount,
        outBatchCount: action.payload.outBatchCount,
      };
    },
    setStates(state, { payload }) {
      return { ...state, ...payload };
    },
    stopMusic(state, { payload }) {
      return { ...state, ...payload, musicPlay: false };
    },
  },
};
