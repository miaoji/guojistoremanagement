import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, Divider } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { qr } from '../../utils/api';
import styles from './CustomerList.less';

const { confirm } = Modal;
const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const queryQr = qr.query;

// Modal
const ModalForm = Form.create()((props) => {
  const { modalVisible, modalType, form,
    handleModalConfirm, handleModalVisible, currentItem } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const modalFormVal = {
        ...fieldsValue,
      };
      if (modalType === 'update') {
        modalFormVal.id = currentItem.id;
      }
      handleModalConfirm(modalFormVal, modalType);
    });
  };
  const title = modalType === 'add' ? '新建' : '修改';
  return (
    <Modal
      title={`${title}用户`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户名称"
      >
        {form.getFieldDecorator('customerName', {
          initialValue: currentItem.customer_name,
          rules: [{ required: true, message: '请输入客户名称' }],
        })(
          <Input placeholder="请输入客户名称" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户手机号"
      >
        {form.getFieldDecorator('customerMobile', {
          initialValue: currentItem.customer_mobile,
          rules: [{
            required: true,
            message: '请输入客户手机号',
            pattern: /^1\d{10}$/,
          }],
        })(
          <Input placeholder="请输入客户手机号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户公司"
      >
        {form.getFieldDecorator('customerCompany', {
          initialValue: currentItem.customer_company,
          rules: [{ required: true, message: '请输入客户公司' }],
        })(
          <Input placeholder="请输入客户公司" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户邮编"
      >
        {form.getFieldDecorator('customerPostcode', {
          initialValue: currentItem.customer_postcode,
          rules: [{ required: true, message: '请输入客户邮编' }],
        })(
          <Input placeholder="请输入客户邮编" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户地址"
      >
        {form.getFieldDecorator('customerAddress', {
          initialValue: currentItem.customer_address,
          rules: [{ required: true, message: '请输入客户地址' }],
        })(
          <Input placeholder="请输入客户地址" />
        )}
      </FormItem>
    </Modal>
  );
});

// Filter
const Filter = Form.create()((props) => {
  const { form, handleSearch, handleSearchReset } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="客户编码">
            {getFieldDecorator('customerNo', {
              initialValue: '',
            })(
              <Input placeholder="请输入客户编码" />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="客户姓名">
            {getFieldDecorator('customerName', {
              initialValue: '',
            })(
              <Input placeholder="请输入客户姓名" />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="客户手机号">
            {getFieldDecorator('customerMobile', {
              initialValue: '',
            })(
              <Input placeholder="请输入客户手机号" />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={handleSearchReset}>重置</Button>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
});

// List
const List = ((props) => {
  const { loading, data, selectedRows, handleBatchDel, handleStandardTableChange,
    handleSelectRows, handleTableUpdate, handleTableDel, handleAddBtn } = props;
  const expandedRowRender = (record) => {
    return (
      <div>
        <p>客户公司:{record.customer_company}</p>
        <p>客户地址:{record.customer_address}</p>
      </div>
    );
  };
  const handleListDel = (record) => {
    confirm({
      title: '确定要删除这一条客户吗?',
      onOk() {
        handleTableDel(record.id);
      },
    });
  };
  const columns = [
    {
      title: '客户编码',
      dataIndex: 'customer_no',
    },
    {
      title: '客户姓名',
      dataIndex: 'customer_name',
    },
    {
      title: '客户手机号',
      dataIndex: 'customer_mobile',
    },
    {
      title: '客户邮编',
      dataIndex: 'customer_postcode',
    },
    {
      title: '充值金额',
      dataIndex: 'total_amount',
    },
    {
      title: '剩余金额',
      dataIndex: 'balance',
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => { handleListDel(record); }} >删除</a>
          <Divider type="vertical" />
          <a className={styles.operateLine} onClick={() => { handleTableUpdate(record); }}>修改</a>
          <Divider type="vertical" />
          <a
            href={`${queryQr}?width=300&height=70&barcode=${record.customer_no}`}
            target="_blank"
          >打印编码
          </a>
        </Fragment>
      ),
    },
  ];
  return (
    <div>
      <div className={styles.tableListOperator}>
        <Button icon="plus" type="primary" onClick={() => handleAddBtn()}>
          新建
        </Button>
        {
          selectedRows.length > 0 && (
            <span>
              <Button onClick={handleBatchDel}>批量删除</Button>
            </span>
          )
        }
      </div>
      <StandardTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        columns={columns}
        onChange={handleStandardTableChange}
        expandedRowRender={expandedRowRender}
        onSelectRow={handleSelectRows}
      />
    </div>
  );
});

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalType: 'add',
    formValues: {},
    currentItem: {},
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetch',
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
      type: 'customer/fetch',
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
      type: 'customer/fetch',
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
        type: 'customer/fetch',
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
      type: `customer/${type}`,
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
          type: 'customer/remove',
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
      type: 'customer/remove',
      payload: [id],
    });
  }

  render() {
    const { customer: { data }, loading, form } = this.props;
    const { selectedRows, modalVisible, modalType, currentItem } = this.state;

    const modalProps = {
      modalType,
      currentItem,
      modalVisible,
      handleModalConfirm: this.handleModalConfirm,
      handleModalVisible: this.handleModalVisible,
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
      handleAddBtn: this.handleAddBtn,
      handleTableUpdate: this.handleTableUpdate,
      handleTableDel: this.handleTableDel,
      handleStandardTableChange: this.handleStandardTableChange,
    };

    return (
      <PageHeaderLayout title="">
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
