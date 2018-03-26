import React from 'react';
import PropTypes from 'prop-types';
import SmallTable from 'components/SmallTable';
import DropOption from 'components/DropOption';
import { Link } from 'dva/router';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  showModal,
  onDelete,
}) => {
  const onMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        showModal(record);
        break;
      case '2':
        onDelete(record.id);
        break;
      default:
        break;
    }
  };
  const columns = [
    {
      title: '货架号',
      dataIndex: 'shelf_no',
      render: (text) => {
        return <Link to={`/query/shelvesdetail?shelfNo=${text}`}>{text}</Link>;
      },
    },
    {
      title: '入架数量',
      dataIndex: 'in',
    },
    {
      title: '出架数量',
      dataIndex: 'out',
    },
    {
      title: '剩余件数',
      dataIndex: 'surplus',
      render: (text, record) => {
        return <span>{Number(record.in) - Number(record.out)}</span>;
      },
    },
    {
      title: '操作',
      width: 100,
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
