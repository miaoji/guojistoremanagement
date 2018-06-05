import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ cargo, loading }) => ({
  cargo,
  loading: loading.models.cargo,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cargo/query',
    });
  }

  render() {
    const {
      form,
      location,
      cargo: { data, list, total, modalVisible, modalType, currentItem },
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
          type: 'cargo/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'cargo/query',
          payload: values,
        });
      },
      showModal() {
        dispatch({
          type: 'cargo/setStates',
          payload: {
            modalVisible: true,
            modalType: 'create',
            currentItem: {},
          },
        });
      },
      form,
    };

    const listProps = {
      selectedRows,
      loading,
      data: {
        list,
        pagination: { ...data.pagination, total },
      },
      showModal(item) {
        dispatch({
          type: 'cargo/setStates',
          payload: {
            modalVisible: true,
            modalType: 'updata',
            currentItem: item,
          },
        });
      },
      onSelectRow(rows) {
        global.setState({
          selectedRows: rows,
        });
        dispatch({
          type: 'cargo/setStates',
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
          type: 'cargo/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'cargo/remove',
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

    const modalProps = {
      item: currentItem,
      title: modalType === 'create' ? '新建规则' : '修改合单',
      onOk(item) {
        dispatch({
          type: `cargo/${modalType}`,
          payload: {
            ...item,
          },
        });
      },
      hideModal() {
        dispatch({
          type: 'cargo/setStates',
          payload: {
            modalVisible: false,
          },
        });
      },
      modalVisible,
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
        {modalVisible && <Modal {...modalProps} />}
      </PageHeaderLayout>
    );
  }
}
