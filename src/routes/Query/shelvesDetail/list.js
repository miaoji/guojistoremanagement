import React from 'react';
import PropTypes from 'prop-types';
import SmallTable from 'components/SmallTable';
import DropOption from 'components/DropOption';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
}) => {
  const onMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        console.log(1);
        break;
      case '2':
        console.log(2);
        break;
      default:
        break;
    }
  };
  const columns = [
    {
      title: '货架号',
      dataIndex: 'customerNo',
    },
    {
      title: '入架数量',
      dataIndex: 'description',
    },
    {
      title: '出架数量',
      dataIndex: 'callNo',
    },
    {
      title: '剩余件数',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => {
        return <DropOption onMenuClick={e => onMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />;
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
