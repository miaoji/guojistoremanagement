import React, { Fragment } from 'react';
import SmallTable from 'components/SmallTable';
import { formatDate } from '../../../utils/';

const List = ({
  loading,
  data,
  handleStandardTableChange,
}) => {
  const columns = [
    {
      title: '客户编码',
      key: 'customer_no',
      render: (text, record) => (
        <Fragment>
          <a
            href={`/query/customerbatch?customerNo=${record.customer_no}`}
            target="_blank"
          >{record.customer_no}
          </a>
        </Fragment>
      ),
    },
    {
      title: '客户姓名',
      key: 'customer_name',
      dataIndex: 'customer_name',
    },
    {
      title: '出库数',
      key: 'out_count',
      dataIndex: 'out_count',
    },
    {
      title: '入库数',
      key: 'in_count',
      dataIndex: 'in_count',
    },
    {
      title: '累计充值金额',
      key: 'total_amount',
      dataIndex: 'total_amount',
    },
    {
      title: '余额',
      key: 'balance',
      dataIndex: 'balance',
    },
    {
      title: '总快递费',
      key: 'total_express_charge',
      dataIndex: 'total_express_charge',
    },
    {
      title: '总仓管费',
      key: 'total_cargo_charge',
      dataIndex: 'total_cargo_charge',
    },
    {
      title: '批次数',
      key: 'batchCount',
      dataIndex: 'batchCount',
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
