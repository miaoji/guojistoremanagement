import React from 'react';
import { Form, Input, Modal, Radio, InputNumber } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const ModalForm = ({ modalVisible, modalType, form, handleModalConfirm,
  handleModalVisible, currentItem }) => {
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
      title={`${title}用户`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="快递名称"
      >
        {form.getFieldDecorator('companyName', {
          initialValue: currentItem.company_name,
          rules: [{ required: true, message: '请输入快递名称' }],
        })(
          <Input placeholder="请输入快递名称" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="快递代码"
      >
        {form.getFieldDecorator('companyCode', {
          initialValue: currentItem.company_code,
          rules: [{
            required: true,
            message: '请输入快递代码',
          }],
        })(
          <Input placeholder="请输入快递代码" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="快递类型"
      >
        {form.getFieldDecorator('type', {
          initialValue: currentItem.type,
          rules: [{ required: true, message: '请选择快递类型' }],
        })(
          <RadioGroup>
            <Radio value={0}>国内快递</Radio>
            <Radio value={1}>国外快递</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="快递排序"
      >
        {form.getFieldDecorator('sort', {
          initialValue: currentItem.sort,
        })(
          <InputNumber min={1} max={999} placeholder="快递排序" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="备注"
      >
        {form.getFieldDecorator('remark', {
          initialValue: currentItem.remark,
          rules: [{ max: 140, message: '备注不能超过140字' }],
        })(
          <Input placeholder="备注不能超过140字" />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(ModalForm);
