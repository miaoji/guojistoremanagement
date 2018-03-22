import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

// const { Option } = Select;

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
    getFieldsValue,
  },
  onOk,
  hideModal,
  title,
  countryInfo,
  getPackageInfo,
  getProductInfo,
  packageInfo,
  productInfo,
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

  const handleCountryChange = (e) => {
    const countryId = Number(e.split('/')[0]);
    getPackageInfo({ countryId });
  };

  const handlePackageChange = (e) => {
    const packageTypeId = Number(e.split('/')[0]);
    getProductInfo({ packageTypeId });
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={handleOk} onCancel={() => hideModal()}>
      <FormItem label="目的地国家" hasFeedback {...formItemLayout}>
        {getFieldDecorator('destination', {
          initialValue: item.destination,
          rules: [
            {
              required: true,
              message: '请选择目的地国家!',
            },
          ],
        })(
          <Select style={{ width: '100%' }} showSearch onChange={handleCountryChange}>
            {countryInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('package_type', {
          initialValue: item.package_type,
          rules: [
            {
              required: true,
              message: '请选择包裹类型!',
            },
          ],
        })(
          <Select style={{ width: '100%' }} onChange={handlePackageChange}>
            {packageInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="产品类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('product_type', {
          initialValue: item.product_type,
          rules: [
            {
              required: true,
              message: '请选择产品类型!',
            },
          ],
        })(
          <Select style={{ width: '100%' }}>
            {productInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="首重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('init_price', {
          initialValue: item.init_price,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="首重重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('init_weight', {
          initialValue: item.init_weight,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="续重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('stepping_price', {
          initialValue: item.stepping_price,
          rules: [
            {
              required: true,
              message: '请输入续重价格!',
            },
          ],
        })(<Input placeholder="请输入续重价格" />)}
      </FormItem>
      <FormItem label="步进重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('stepping_weight', {
          initialValue: item.stepping_weight,
          rules: [
            {
              required: true,
              message: '请输入步进重量!',
            },
          ],
        })(<Input placeholder="请输入步进重量" />)}
      </FormItem>
      <FormItem label="燃油附加费(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('fuel_charge', {
          initialValue: item.fuel_charge,
          rules: [
            {
              required: true,
              message: '请输入燃油附加费!',
            },
          ],
        })(<Input placeholder="请输入燃油附加费" />)}
      </FormItem>
      <FormItem label="邮编段" hasFeedback {...formItemLayout}>
        {getFieldDecorator('postcode', {
          initialValue: item.postcode,
          rules: [
            {
              required: true,
              message: '请添加邮编段!',
            },
          ],
        })(<Input placeholder="请添加邮编段" />)}
      </FormItem>
      <FormItem label="备注" hasFeedback {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue: item.remark,
          rules: [
            {
              // required: true,
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
