import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ country, loading }) => ({
  country,
  loading: loading.models.country,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'country/query',
      payload: location.query,
    });
  }

  render() {
    const {
      form,
      location,
      country: {
        data,
        list,
        total,
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
          type: 'country/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'country/query',
          payload: values,
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
      onDelete(id) {
        dispatch({
          type: 'country/remove',
          payload: {
            id,
          },
        });
      },
      showModal(item) {
        dispatch({
          type: 'country/getCountryInfo',
        });
        dispatch({
          type: 'country/setStates',
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
          type: 'country/setStates',
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
          type: 'country/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'country/remove',
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
      </PageHeaderLayout>
    );
  }
}
