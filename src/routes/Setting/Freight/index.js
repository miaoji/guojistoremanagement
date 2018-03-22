import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ freight, loading }) => ({
  freight,
  loading: loading.models.freight,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'freight/query',
      payload: location.query,
    });
  }

  render() {
    const {
      form,
      location,
      freight: {
        countryInfo,
        productInfo,
        packageInfo,
        data,
        list,
        total,
        modalVisible,
        modalType,
        currentItem,
        packageDis,
        productDis,
      },
      loading,
      dispatch,
    } = this.props;
    const { selectedRows } = this.state;
    const global = this;
    const formValues = {};

    const filterProps = {
      filter: {
        ...location.query,
      },
      handleFormReset() {
        dispatch({
          type: 'freight/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'freight/query',
          payload: values,
        });
      },
      showModal() {
        dispatch({
          type: 'freight/getCountryInfo',
        });
        dispatch({
          type: 'freight/setStates',
          payload: {
            modalVisible: true,
            modalType: 'create',
            currentItem: {},
            packageDis: true,
            productDis: true,
          },
        });
      },
      form,
    };

    const modalProps = {
      item: currentItem,
      countryInfo,
      productInfo,
      packageInfo,
      modalVisible,
      packageDis,
      productDis,
      title: modalType === 'create' ? '新建运费规则' : '修改运费规则',
      onOk(val) {
        dispatch({
          type: `freight/${modalType}`,
          payload: {
            ...val,
          },
        });
      },
      hideModal() {
        dispatch({
          type: 'freight/setStates',
          payload: {
            modalVisible: false,
          },
        });
      },
      getPackageInfo(val) {
        dispatch({
          type: 'freight/getPackageInfo',
          payload: val,
        });
      },
      getProductInfo(val) {
        dispatch({
          type: 'freight/getProductInfo',
          payload: val,
        });
      },
    };

    const listProps = {
      selectedRows,
      loading,
      data: {
        list,
        pagination: { ...data.pagination, total },
      },
      onDelete(id) {
        dispatch({
          type: 'freight/remove',
          payload: {
            id,
          },
        });
      },
      showModal(item) {
        dispatch({
          type: 'freight/getCountryInfo',
        });
        dispatch({
          type: 'freight/setStates',
          payload: {
            modalVisible: true,
            modalType: 'update',
            currentItem: item,
            packageDis: true,
            productDis: true,
          },
        });
      },
      onSelectRow(rows) {
        global.setState({
          selectedRows: rows,
        });
        dispatch({
          type: 'freight/setStates',
          payload: {
            selectedRows: [...rows],
          },
        });
      },
      onChange(pagination, filtersArg, sorter) {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = { ...obj };
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});
        const params = {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          ...formValues,
          ...filters,
        };
        if (sorter.field) {
          params.sorter = `${sorter.field}_${sorter.order}`;
        }
        dispatch({
          type: 'freight/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'freight/remove',
              payload: {
                no: selectedRows.map(row => row.no).join(','),
              },
              callback: () => {
              },
            });
            break;
          default:
            break;
        }
      },
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter {...filterProps} />
            </div>
            <List {...listProps} />
          </div>
        </Card>
        <Modal
          {...modalProps}
        />
      </PageHeaderLayout>
    );
  }
}
