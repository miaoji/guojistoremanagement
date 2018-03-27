import React from 'react';
import PropTypes from 'prop-types';
import SmallTable from 'components/SmallTable';
import { qr } from '../../../utils/api';

const queryQr = qr.query;
const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
}) => {
  const columns = [
    {
      title: '目的地国家中文名',
      dataIndex: 'country_cn',
      key: 'country_cn',
    },
    {
      title: '国家英文名',
      dataIndex: 'country_en',
      key: 'country_en',
    },
    {
      title: '国家ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '国家代码',
      dataIndex: 'country_code',
      key: 'country_code',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <a
          href={`${queryQr}?width=300&height=70&barcode=GJ_${record.id}/${record.country_code}`}
          target="_blank"
        >
          打印编码
        </a>
      ),
    },
  ];

  return (
    <div>
      <SmallTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        pagination={data.pagination}
        columns={columns}
        onSelectRow={onSelectRow}
        onChange={onChange}
        total={30}
      />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
};

export default List;
