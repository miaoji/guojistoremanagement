import React from 'react';
import PropTypes from 'prop-types';
import SmallTable from 'components/SmallTable';

import styles from './index.less';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  showExpreModal,
}) => {
  const handleExpreClick = (record) => {
    showExpreModal(record);
  };
  const columns = [
    {
      title: '单号',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '国内单号',
      dataIndex: 'cn_no',
      key: 'cn_no',
    },
    {
      title: '货架号',
      dataIndex: 'shelf_no',
      key: 'shelf_no',
    },
    {
      title: '客户编码',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: '客户手机号',
      dataIndex: 'customer_mobild',
      key: 'customer_mobild',
    },
    {
      title: '操作',
      key: 'option',
      width: 130,
      render: (text, record) => {
        return (
          <span className={styles.button} onClick={() => handleExpreClick(record)}>查看物流信息</span>
        );
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
