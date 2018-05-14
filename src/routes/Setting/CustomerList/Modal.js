import React from 'react';
import { Form, Input, Modal, InputNumber, Select } from 'antd';

const FormItem = Form.Item;

const ModalForm = ({
  modalVisible,
  modalType,
  form,
  handleModalConfirm,
  handleModalVisible,
  currentItem,
  customerTypeOption,
}) => {
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
  const title = modalType === 'add' ? '新建客户信息' : '修改客户信息';
  return (
    <Modal
      title={`${title}用户`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户名称"
      >
        {form.getFieldDecorator('customerName', {
          initialValue: currentItem.customer_name,
          rules: [{ required: true, message: '请输入客户名称' }],
        })(
          <Input placeholder="请输入客户名称" />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户类型" style={{ display: modalType === 'add' ? 'block' : 'none' }}>
        {form.getFieldDecorator('ruleTypeId', {
          initialValue: currentItem.customer_type,
          rules: [{
            required: modalType === 'add',
            message: '请选择客户类型',
          }],
        })(
          <Select showSearch style={{ width: '100%' }} placeholder="请选择客户类型">{customerTypeOption}</Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户手机号"
      >
        {form.getFieldDecorator('customerMobile', {
          initialValue: currentItem.customer_mobile,
          rules: [{
            required: false,
            message: '请输入客户手机号',
            pattern: /^1\d{10}$/,
          }],
        })(
          <Input placeholder="请输入客户手机号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户地址"
      >
        {form.getFieldDecorator('customerAddress', {
          initialValue: currentItem.customer_address,
          rules: [{ required: false, message: '请输入客户地址' }],
        })(
          <Input placeholder="请输入客户地址" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户公司"
      >
        {form.getFieldDecorator('customerCompany', {
          initialValue: currentItem.customer_company,
        })(
          <Input placeholder="请输入客户公司" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="充值金额"
      >
        {form.getFieldDecorator('totalAmount', {
          initialValue: currentItem.total_amount,
        })(
          <InputNumber placeholder="请输入充值金额" style={{ width: '100%' }} min={0} />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户邮编"
      >
        {form.getFieldDecorator('customerPostcode', {
          initialValue: currentItem.customer_postcode,
        })(
          <Input placeholder="请输入客户邮编" />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(ModalForm);
