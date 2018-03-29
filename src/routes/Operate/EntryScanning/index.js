import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Modal, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Filter from './Filter';
import ModalForm from './Modal';
import List from './List';
import HeaderCreate from './HeaderCreate';
import { handleScanval } from '../../../utils';

import styles from './index.less';

const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ entryscanning, loading }) => ({
  entryscanning,
  loading: loading.models.entryscanning,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalType: 'add',
    formValues: {},
    currentItem: {},
    selectedRows: [],
    scanVal: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'entryscanning/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
      type: 'entryscanning/fetch',
      payload: params,
    });
  }

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'entryscanning/fetch',
      payload: {},
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'entryscanning/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleModalType = (type) => {
    this.setState({
      modalType: type,
    });
  }

  handleModalConfirm = (fields, type) => {
    this.props.dispatch({
      type: `entryscanning/${type}`,
      payload: {
        ...fields,
      },
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleBatchDel = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    const _ = this;

    confirm({
      title: '确定要批量删除客户?',
      onOk() {
        const ids = selectedRows.map(row => row.id);

        dispatch({
          type: 'entryscanning/remove',
          payload: ids,
          callback: () => {
            _.setState({
              selectedRows: [],
            });
          },
        });
      },
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleAddBtn = () => {
    this.setState({
      currentItem: {},
    });
    this.handleModalVisible(true);
    this.handleModalType('add');
  }

  handleTableUpdate = (record) => {
    this.setState({
      modalVisible: true,
      modalType: 'update',
      currentItem: record,
    });
  }

  handleTableDel = (id) => {
    this.props.dispatch({
      type: 'entryscanning/remove',
      payload: [id],
    });
  }

  handleScanning = (e, form) => {
    const val = e.target.value;
    this.setState({
      scanVal: val,
    });
    const formVal = handleScanval(val);
    form.setFieldsValue(formVal);
    const _ = this;
    setTimeout(() => {
      _.setState({
        scanVal: '',
      });
    }, 400);
  }

  handleScanClear = () => {
    this.setState({
      scanVal: '',
    });
  }

  render() {
    const { entryscanning: { data }, loading, form } = this.props;
    const { selectedRows, modalVisible, modalType, currentItem, scanVal } = this.state;

    const modalProps = {
      scanVal,
      modalType,
      currentItem,
      modalVisible,
      handleScanning: this.handleScanning,
      handleScanClear: this.handleScanClear,
      handleModalConfirm: this.handleModalConfirm,
      handleModalVisible: this.handleModalVisible,
    };

    const filterProps = {
      form,
      handleSearch: this.handleSearch,
      handleSearchReset: this.handleSearchReset,
      handleAddBtn: this.handleAddBtn,
    };

    const listProps = {
      data,
      loading,
      selectedRows,
      handleBatchDel: this.handleBatchDel,
      handleSelectRows: this.handleSelectRows,
      handleTableUpdate: this.handleTableUpdate,
      handleTableDel: this.handleTableDel,
      handleStandardTableChange: this.handleStandardTableChange,
    };

    return (
      <PageHeaderLayout title="">
        <Card style={{ marginBottom: '10px' }} title="创建入库信息" bordered={false}>
          <HeaderCreate {...modalProps} />
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter
                {...filterProps}
              />
            </div>
            <List
              {...listProps}
            />
          </div>
        </Card>
        <ModalForm
          {...modalProps}
        />
      </PageHeaderLayout>
    );
  }
}
