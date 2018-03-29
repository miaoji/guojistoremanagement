import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SmallTable from 'components/SmallTable';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
}) => {
  const columns = [
    {
      title: '货架号',
      dataIndex: 'shelfNo',
    },
    {
      title: '单号',
      dataIndex: 'orderNo',
    },
    {
      title: '国内单号',
      dataIndex: 'cnNo',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text) => {
        return <span>{text === 0 ? '入库' : '出库'}</span>;
      },
    },
    {
      title: '入库时间',
      dataIndex: 'startTime',
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '/'}</span>;
      },
    },
    {
      title: '出库时间',
      dataIndex: 'endTime',
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '/'}</span>;
      },
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
  // selectedRows: PropTypes.any,
  // loading: PropTypes.bool,
  // onSelectRow,
  // onChange
};

export default List;
