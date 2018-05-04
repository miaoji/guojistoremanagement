import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Modal, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import Filter from './Filter';
import AddForm from './Form';
import UpdateForm from './Modal';
import List from './List';
import { handleScanval } from '../../../utils';

const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ unusualscanning, loading }) => ({
  unusualscanning,
  loading: loading.models.unusualscanning,
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
      type: 'unusualscanning/fetch',
    });
    dispatch({
      type: 'unusualscanning/getCountryInfo',
    });
    // 初始化 orderNo
    dispatch({
      type: 'unusualscanning/initOrderNo',
    });
  }

  getPackageInfo = (val) => {
    this.props.dispatch({
      type: 'unusualscanning/getPackageInfo',
      payload: val,
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
      type: 'unusualscanning/fetch',
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
      type: 'unusualscanning/fetch',
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

      console.log('values', values);

      dispatch({
        type: 'unusualscanning/fetch',
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
      type: `unusualscanning/${type}`,
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
          type: 'unusualscanning/remove',
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
      type: 'unusualscanning/remove',
      payload: [id],
    });
  }

  handleScanning = (e, form) => {
    const val = e.target.value;
    this.setState({
      scanVal: val,
    });
    const formVal = handleScanval(val);
    if (!formVal) {
      console.log('false');
    } else {
      form.setFieldsValue(formVal);
      if (formVal.destination) {
        const countryId = Number(formVal.destination.split('/')[0]);
        console.log('countryId', countryId);
        this.getPackageInfo({ countryId });
        form.setFieldsValue({
          packageType: undefined,
          productType: undefined,
        });
      }
      const _ = this;
      setTimeout(() => {
        _.setState({
          scanVal: '',
        });
      }, 200);
    }
  }

  handleScanClear = () => {
    this.setState({
      scanVal: '',
    });
  }

  render() {
    const {
      unusualscanning: {
        data,
        countryInfo,
        packageInfo,
        productInfo,
        packageDis,
        productDis,
        orderNo,
      },
      loading,
      form,
      dispatch,
    } = this.props;
    const { scanVal, selectedRows, modalVisible, modalType, currentItem } = this.state;

    const addProps = {
      orderNo,
      scanVal,
      modalType,
      currentItem,
      modalVisible,
      countryInfo,
      packageInfo,
      productInfo,
      packageDis,
      productDis,
      getProductInfo({ packageTypeId }) {
        dispatch({
          type: 'unusualscanning/getProductInfo',
          payload: { packageTypeId },
        });
      },
      refreshOrderNo() {
        dispatch({
          type: 'unusualscanning/getOrderNo',
        });
      },
      getPackageInfo: this.getPackageInfo,
      handleScanning: this.handleScanning,
      handleModalConfirm: this.handleModalConfirm,
    };

    const filterProps = {
      form,
      handleSearch: this.handleSearch,
      handleSearchReset: this.handleSearchReset,
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

    const updateProps = {
      scanVal,
      modalType,
      currentItem,
      modalVisible,
      countryInfo,
      packageInfo,
      productInfo,
      packageDis,
      productDis,
      getProductInfo({ packageTypeId }) {
        dispatch({
          type: 'unusualscanning/getProductInfo',
          payload: { packageTypeId },
        });
      },
      getPackageInfo: this.getPackageInfo,
      handleScanning: this.handleScanning,
      handleScanClear: this.handleScanClear,
      handleModalConfirm: this.handleModalConfirm,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="">
        <Card title="扫描区" bordered>
          <AddForm
            {...addProps}
          />
        </Card>
        <Card title="查询区" bordered={false}>
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
        <UpdateForm
          {...updateProps}
        />
      </PageHeaderLayout>
    );
  }
}
