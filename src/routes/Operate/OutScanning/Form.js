import React from 'react';
import { Row, Col, Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const ModalForm = ({
  form,
  scanVal,
  modalType,
  currentItem,
  handleScanning,
  handleModalConfirm,
  getPackageInfo,
  getProductInfo,
  countryInfo,
  packageInfo,
  productInfo,
  packageDis,
  productDis,
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
      } else {
        const { weightremain, weight } = fieldsValue;
        if (weightremain) {
          form.setFieldsValue({
            weight,
          });
        }
      }
      handleModalConfirm(modalFormVal, modalType);
    });
  };

  const handleCountryChange = (e) => {
    const countryId = Number(e.split('/')[0]);
    console.log('countryId', countryId);
    getPackageInfo({ countryId });
    form.setFieldsValue({
      packageType: undefined,
      productType: undefined,
    });
  };

  const handlePackageChange = (e) => {
    const packageTypeId = Number(e.split('/')[0]);
    getProductInfo({ packageTypeId });
    form.setFieldsValue({
      productType: undefined,
    });
  };

  const handleFreightPrice = () => {
    const { destination, packageType, productType, weight } = form.getFieldsValue();
    if (destination && packageType && productType && weight) {
      console.log('price can be defined destination', destination);
      console.log('price can be defined', packageType);
      console.log('price can be defined', productType);
    }
  };

  return (
    <div>
      <div className={styles.scannBox}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
          <Col md={18} sm={24}>
            <Input
              size="large"
              value={scanVal}
              onChange={e => handleScanning(e, form)}
              placeholder="扫描区"
            />
          </Col>
          <Col md={6} sm={24}>
            <Button type="primary" onClick={okHandle}>
              创建出库
            </Button>
          </Col>
        </Row>
      </div>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="单号"
          >
            {form.getFieldDecorator('cnNo', {
              initialValue: currentItem.cn_no,
              rules: [{ required: true, message: '请输入单号' }],
            })(
              <Input placeholder="请输入单号" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
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
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="快递公司"
          >
            {form.getFieldDecorator('expressCompanyCode', {
             initialValue: currentItem.express_company_code,
             rules: [{ required: true, message: '请输入快递公司' }],
           })(
             <Input placeholder="请输入快递公司" />
           )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="货架号"
          >
            {form.getFieldDecorator('shelfNo', {
              initialValue: currentItem.shelf_no,
              rules: [{ required: true, message: '请输入货架号' }],
            })(
              <Input placeholder="请输入货架号" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="重量/kg"
          >
            {form.getFieldDecorator('weight', {
              initialValue: currentItem.weight,
              rules: [{ required: true, message: '请输入重量' }],
            })(
              <InputNumber
                min={0}
                onChange={handleFreightPrice}
                placeholder="请输入重量"
              />
            )}
          </FormItem>
        </Col>
        {
          modalType === 'add' ?
          (
            <Col md={8} sm={24}>
              <FormItem
                {...formItemLayout}
                label="重量锁定"
              >
                {form.getFieldDecorator('weightremain', {
                  defaultChecked: false,
                })(
                  <Checkbox />
                )}
              </FormItem>
            </Col>
          ) : ''
        }
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="目的地国家"
          >
            {form.getFieldDecorator('destination', {
              initialValue: currentItem.destination,
              rules: [{ required: true, message: '请输入目的地国家' }],
            })(
              <Select
                placeholder="请选择目的地国家"
                style={{ width: '100%' }}
                onChange={handleCountryChange}
              >
                {countryInfo}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="包裹类型" hasFeedback {...formItemLayout}>
            {form.getFieldDecorator('packageType', {
              initialValue: `${currentItem.package_type_id}/${currentItem.name_cn}`,
              rules: [
                {
                  required: true,
                  message: '请选择包裹类型!',
                },
              ],
            })(
              <Select
                placeholder="请选择包裹类型"
                disabled={packageDis}
                style={{ width: '100%' }}
                onChange={handlePackageChange}
              >
                {packageInfo}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="产品类型" hasFeedback {...formItemLayout}>
            {form.getFieldDecorator('productType', {
             initialValue: `${currentItem.product_type_id}/${currentItem.product_name}`,
             rules: [
               {
                 required: true,
                 message: '请选择产品类型!',
               },
             ],
           })(
             <Select
               placeholder="请选择产品类型"
               disabled={productDis}
               style={{ width: '100%' }}
             >
               {productInfo}
             </Select>
           )}
          </FormItem>
        </Col>
      </Row>

      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="长/cm"
          >
            {form.getFieldDecorator('length', {
              initialValue: currentItem.length,
              rules: [{ required: true, message: '请输入长度' }],
            })(
              <InputNumber min={0} placeholder="请输入长度" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="宽/cm"
          >
            {form.getFieldDecorator('wide', {
              initialValue: currentItem.wide,
              rules: [{ required: true, message: '请输入宽度' }],
            })(
              <InputNumber min={0} placeholder="请输入宽度" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="高度/cm"
          >
            {form.getFieldDecorator('height', {
              initialValue: currentItem.height,
              rules: [{ required: true, message: '请输入高度' }],
            })(
              <InputNumber min={0} placeholder="请输入高度" />
            )}
          </FormItem>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(ModalForm);
