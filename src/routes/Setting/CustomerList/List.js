import React, { Fragment } from 'react';
import { Button, Modal } from 'antd';
import StandardTable from 'components/StandardTable';
import DropOption from 'components/DropOption';
import styles from './index.less';
import { qr } from '../../../utils/api';
import { formatDate } from '../../../utils/';

const { confirm } = Modal;
const queryQr = qr.query;

const List = ({
  loading,
  data,
  selectedRows,
  handleBatchDel,
  handleStandardTableChange,
  handleSelectRows,
  handleTableUpdate,
  handleTableDel,
  handleAddBtn,
  handleRecharge,
}) => {
  const expandedRowRender = (record) => {
    return (
      <div>
        <p>客户公司:{record.customer_company}</p>
        <p>客户地址:{record.customer_address}</p>
      </div>
    );
  };
  const onMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        handleTableUpdate(record);
        break;
      case '2':
        confirm({
          cancelText: '取消',
          okText: '确认删除',
          title: '删除',
          content: '确定要删除这一条客户吗?',
          onOk: () => {
            handleTableDel(record.id);
          },
        });
        break;
      case '3':
        handleRecharge(record);
        break;
      default:
        break;
    }
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
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '客户邮编',
      dataIndex: 'customer_postcode',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '累计充值金额',
      dataIndex: 'total_amount',
    },
    {
      title: '剩余可用金额',
      dataIndex: 'balance',
    },
    {
      title: '创建时间',
      key: 'gmt_create',
      dataIndex: 'gmt_create',
      render: text => <span>{formatDate('yyyy-MM-dd hh:mm', new Date(text))}</span>,
    },
    {
      title: '打印',
      render: (text, record) => (
        <Fragment>
          <a
            href={`${queryQr}?width=245&height=70&barcode=${record.customer_no}`}
            target="_blank"
          >打印编码
          </a>
        </Fragment>
      ),
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => onMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }, { key: '3', name: '操作金额' }]} />;
      },
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
