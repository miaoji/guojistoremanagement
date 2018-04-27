import React from 'react';
import SmallTable from 'components/SmallTable';
import { formatDate } from '../../../utils/';

const List = ({
  loading,
  data,
  handleStandardTableChange,
}) => {
  const columns = [
    {
      title: '客户编号',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '订单号',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '寄件费用',
      dataIndex: 'express_charge',
      key: 'express_charge',
    },
    {
      title: '仓管费',
      dataIndex: 'cargo_charge',
      key: 'cargo_charge',
    },
    {
      title: '发件数',
      dataIndex: 'sendCount',
      key: 'sendCount',
    },
    {
      title: '创建时间',
      key: 'gmt_create',
      dataIndex: 'gmt_create',
      render: text => <span>{formatDate('yyyy-MM-dd hh:mm', new Date(text))}</span>,
    },
  ];
  return (
    <div>
      <SmallTable
        selectedRows={[]}
        loading={loading}
        data={data}
        pagination={data.pagination}
        columns={columns}
        onChange={handleStandardTableChange}
        total={30}
      />
    </div>
  );
};

export default List;
