import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const Modalbox = ({
  item = {},
  modalVisible,
  form: {
    validateFields,
    getFieldDecorator,
    // resetFields,
    getFieldsValue,
  },
  onOk,
  hideModal,
  title,
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };
  return (
    <Modal title={title} visible={modalVisible} onOk={handleOk} onCancel={() => hideModal()}>
      <FormItem label="目的地国家" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no1', {
          initialValue: item.no1,
          rules: [
            {
              required: true,
              message: '请选择目的地国家!',
            },
          ],
        })(<Input placeholder="请选择目的地国家" />)}
      </FormItem>
      <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no2', {
          initialValue: item.no2,
          rules: [
            {
              required: true,
              message: '请选择包裹类型!',
            },
          ],
        })(<Input placeholder="请选择包裹类型" />)}
      </FormItem>
      <FormItem label="产品类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请选择产品类型!',
            },
          ],
        })(<Input placeholder="请选择产品类型" />)}
      </FormItem>
      <FormItem label="首重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="首重重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="续重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入续重价格!',
            },
          ],
        })(<Input placeholder="请输入续重价格" />)}
      </FormItem>
      <FormItem label="步进重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入步进重量!',
            },
          ],
        })(<Input placeholder="请输入步进重量" />)}
      </FormItem>
      <FormItem label="燃油附加费(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入燃油附加费!',
            },
          ],
        })(<Input placeholder="请输入燃油附加费" />)}
      </FormItem>
      <FormItem label="邮编段" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请添加邮编段!',
            },
          ],
        })(<Input placeholder="请添加邮编段" />)}
      </FormItem>
      <FormItem label="备注" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no3', {
          initialValue: item.no3,
          rules: [
            {
              required: true,
              message: '请输入备注信息!',
            },
          ],
        })(<Input placegolder="请输入备注信息" />)}
      </FormItem>
    </Modal>
  );
};

// Model.propTypes = {
//     onAdd: PropTypes.func,
//     switchIsMotion: PropTypes.func,
//     form: PropTypes.object,
//     Model: PropTypes.object,
//     onModelChange: PropTypes.func,
//     onDownLoad: PropTypes.func,
//     onSetJdConfig: PropTypes.func
// }

export default Form.create()(Modalbox);
