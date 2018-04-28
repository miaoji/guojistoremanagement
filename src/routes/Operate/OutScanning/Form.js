import React from 'react';
import { Row, Col, Icon, Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';

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
const formLockLayout = {
  labelCol: {
    span: 17,
  },
  wrapperCol: {
    span: 2,
  },
};
const ModalForm = ({
  orderNo,
  form,
  shelNoOption,
  shelNoCount,
  onShelfChange,
  outOrderCount,
  outBatchCount,
  scanVal,
  handleScanning,
  handleModalConfirm,
  refreshOrderNo,
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
      initValue(fieldsValue);
      handleModalConfirm(modalFormVal, 'add');
    });
  };

  const initValue = (fieldsValue) => {
    const {
      customerNo,
      customerNoLock,
      destination,
      destinationLock,
      expressCompanyCode,
      expressCompanyCodeLock,
      packageType,
      packageTypeLock,
      productType,
      productTypeLock,
      shelfNo,
      shelfNoLock,
      weight,
      weightLock,
    } = fieldsValue;
    form.setFieldsValue({
      customerNoLock,
      destinationLock,
      expressCompanyCodeLock,
      packageTypeLock,
      productTypeLock,
      shelfNoLock,
      weightLock,
    });
    if (customerNoLock) {
      form.setFieldsValue({
        customerNo,
      });
    }
    if (destinationLock) {
      form.setFieldsValue({
        destination,
      });
    }
    if (expressCompanyCodeLock) {
      form.setFieldsValue({
        expressCompanyCode,
      });
    }
    if (packageTypeLock) {
      form.setFieldsValue({
        packageType,
      });
    }
    if (productTypeLock) {
      form.setFieldsValue({
        productType,
      });
    }
    if (shelfNoLock) {
      form.setFieldsValue({
        shelfNo,
      });
    }
    if (weightLock) {
      form.setFieldsValue({
        weight,
      });
    }
  };

  const handleClear = () => {
    const fieldsValue = { ...form.getFieldsValue() };
    form.resetFields();
    initValue(fieldsValue);
  };

  const handleCountryChange = (e) => {
    const countryId = Number(e.split('/')[0]);
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
      console.info('price can be defined destination', destination);
      console.info('price can be defined', packageType);
      console.info('price can be defined', productType);
    }
  };

  const handleOrderNo = () => {
    refreshOrderNo();
  };

  const handleShelfNoChange = (e) => {
    onShelfChange({ shelfNo: e });
  };

  document.onkeydown = (e) => {
    if (e.keyCode === 113 || e.keyCode === 174) {
      const inp = document.querySelector('.autofocus');
      inp.focus();
    }
    if (e.keyCode === 187) {
      okHandle();
    }
  };
  return (
    <div>
      <div className={styles.scannBox}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
          <Col md={12} sm={24}>
            <Input
              size="large"
              className="autofocus"
              autoFocus
              value={scanVal}
              onChange={e => handleScanning(e, form)}
              placeholder="扫描区（F2移动鼠标焦点到框内）"
            />
          </Col>
          <Col md={8} sm={24}>
            <Button size="large" type="default" onClick={handleClear}>
              <Icon type="close-circle-o" />清空
            </Button>
            <Button size="large" type="primary" onClick={okHandle} style={{ marginLeft: '20px' }}>
              <Icon type="check-circle-o" />创建出库 (快捷键 = )
            </Button>
          </Col>
        </Row>
      </div>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="内单号"
          >
            <Input disabled value={orderNo} placeholder="请输入内单号" />
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <Button type="primary" onClick={handleOrderNo}>刷新内单号</Button>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="单号"
          >
            {form.getFieldDecorator('cnNo', {
              rules: [{ required: true, message: '请输入单号' }],
            })(
              <Input placeholder="请输入单号" />
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
            {form.getFieldDecorator('length')(
              <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入长度" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="宽/cm"
          >
            {form.getFieldDecorator('wide')(
              <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入宽度" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="高度/cm"
          >
            {form.getFieldDecorator('height')(
              <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入高度" />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="客户编码"
          >
            {form.getFieldDecorator('customerNo', {
              rules: [{
                required: true,
                message: '客户编码',
              }],
            })(
              <Input placeholder="请输入客户编码" />
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="客户编码锁定"
          >
            {form.getFieldDecorator('customerNoLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="快递公司"
          >
            {form.getFieldDecorator('expressCompanyCode', {
              rules: [{ required: true, message: '请输入快递公司' }],
            })(
              <Input placeholder="请输入快递公司" />
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="快递公司锁定"
          >
            {form.getFieldDecorator('expressCompanyCodeLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
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
              rules: [{ required: true, message: '请输入货架号' }],
            })(
              <Select showSearch style={{ width: '100%' }} onChange={handleShelfNoChange} placeholder="请选择货架号">
                {shelNoOption}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="货架号锁定"
          >
            {form.getFieldDecorator('shelfNoLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="重量/kg"
          >
            {form.getFieldDecorator('weight', {
              rules: [{ required: true, message: '请输入重量' }],
            })(
              <InputNumber
                min={0}
                style={{ width: '100%', height: '33px' }}
                onChange={handleFreightPrice}
                placeholder="请输入重量"
              />
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="重量锁定"
          >
            {form.getFieldDecorator('weightLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="目的地国家"
          >
            {form.getFieldDecorator('destination', {
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="目的地国家锁定"
          >
            {form.getFieldDecorator('destinationLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="包裹类型" hasFeedback {...formItemLayout}>
            {form.getFieldDecorator('packageType', {
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="包裹类型锁定"
          >
            {form.getFieldDecorator('packageTypeLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="产品类型" hasFeedback {...formItemLayout}>
            {form.getFieldDecorator('productType', {
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="产品类型锁定"
          >
            {form.getFieldDecorator('productTypeLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={24}>
          <div style={{ fontSize: '20px', lineHeight: '40px', textAlign: 'center' }}>货架上剩余 {shelNoCount} 件</div>
        </Col>
        <Col md={6} sm={24}>
          <div style={{ fontSize: '20px', lineHeight: '40px', textAlign: 'center' }}>出库国内单号数 {outOrderCount} 件</div>
        </Col>
        <Col md={6} sm={24}>
          <div style={{ fontSize: '20px', lineHeight: '40px', textAlign: 'center' }}>出库批次数 {outBatchCount} 件</div>
        </Col>
      </Row>


    </div>
  );
};

export default Form.create()(ModalForm);
