import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'antd';
import SmallTable from 'components/SmallTable';
import DropOption from 'components/DropOption';

const { confirm } = Modal;
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
        confirm({
          cancelText: '取消',
          okText: '确认删除',
          title: '删除',
          content: '你确定要删除这一条运费信息吗?',
          onOk: () => {
            onDelete(record.id);
          },
        });
        break;
      default:
        break;
    }
  };
  const columns = [
    {
      title: '目的地国家',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: '包裹类型',
      dataIndex: 'package_type',
      key: 'package_type',
    },
    {
      title: '产品类型',
      dataIndex: 'product_type',
      key: 'product_type',
    },
    {
      title: '首重价格',
      dataIndex: 'init_price',
      key: 'init_price',
    },
    {
      title: '首重重量',
      dataIndex: 'init_weight',
      key: 'init_weight',
    },
    {
      title: '续重价格',
      dataIndex: 'stepping_price',
      key: 'stepping_price',
    },
    {
      title: '步进重量',
      dataIndex: 'stepping_weight',
      key: 'stepping_weight',
    },
    {
      title: '燃油附加费',
      dataIndex: 'fuel_charge',
      key: 'fuel_charge',
    },
    {
      title: '邮编段',
      dataIndex: 'postcode',
      key: 'postcode',
    },
    {
      title: '创建时间',
      width: 120,
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD') : '未知时间'}</span>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'create_user_id',
      key: 'create_user_id',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'operation',
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
};

export default List;
