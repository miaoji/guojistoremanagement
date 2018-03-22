import React, { Fragment } from 'react';
import { Button, Modal, Divider } from 'antd';
import StandardTable from 'components/StandardTable';
import styles from './index.less';
import { qr } from '../../../utils/api';
import { formatDate } from '../../../utils/';

const { confirm } = Modal;
const queryQr = qr.query;

const List = ({
  loading, data, selectedRows,
  handleBatchDel, handleStandardTableChange,
  handleSelectRows, handleTableUpdate, handleTableDel, handleAddBtn }) => {
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
      key: 'gmt_create',
      dataIndex: 'gmt_create',
      render: text => <span>{formatDate('yyyy-MM-dd hh:mm', new Date(text))}</span>,
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
};

export default List;
