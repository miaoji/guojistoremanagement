import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const ModalForm = ({ modalVisible, modalType, form, handleModalConfirm,
  handleModalVisible, currentItem, handleScanning }) => {
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const modalFormVal = {
        ...fieldsValue,
      };
      if (modalType === 'update') {
        modalFormVal.id = currentItem.id;
      }
      handleModalConfirm(modalFormVal, modalType);
    });
  };
  const title = modalType === 'add' ? '新建' : '修改';
  return (
    <Modal
      title={`${title}入库`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <div className={styles.scannBox}>
        <Input
          size="large"
          onChange={e => handleScanning(e)}
          placeholder="扫描区"
        />
      </div>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="单号"
      >
        {form.getFieldDecorator('orderNo', {
          initialValue: currentItem.order_no,
          rules: [{ required: true, message: '请输入单号' }],
        })(
          <Input placeholder="请输入单号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户编码"
      >
        {form.getFieldDecorator('customerNo', {
          initialValue: currentItem.customer_no,
          rules: [{
            required: true,
            message: '客户编码',
          }],
        })(
          <Input placeholder="请输入客户编码" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="快递公司"
      >
        {form.getFieldDecorator('expressCompany', {
          initialValue: currentItem.express_company,
          rules: [{ required: true, message: '请输入快递公司' }],
        })(
          <Input placeholder="请输入快递公司" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="货架号"
      >
        {form.getFieldDecorator('shelfNo', {
          initialValue: currentItem.shelf_no,
          rules: [{ required: true, message: '请输入货架号' }],
        })(
          <Input placeholder="请输入货架号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="重量/kg"
      >
        {form.getFieldDecorator('weight', {
          initialValue: currentItem.weight,
          rules: [{ required: true, message: '请输入重量' }],
        })(
          <InputNumber min={0} placeholder="请输入重量" />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(ModalForm);
