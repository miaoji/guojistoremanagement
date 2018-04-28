import React from 'react';
import { Row, Col, Button, Form, Icon, Input, Modal, InputNumber, Checkbox } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const ModalForm = ({
  modalVisible,
  modalType,
  form,
  handleModalConfirm,
  handleModalVisible,
  currentItem,
  scanVal,
  handleScanning,
}) => {
  const handleCancel = () => {
    form.setFieldsValue({
      cnNo: undefined,
      customerNo: undefined,
      expressCompanyCode: undefined,
      shelfNo: undefined,
      weight: undefined,
    });
  };
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
  const title = modalType === 'add' ? '新建' : '修改';

  return (
    <Modal
      title={`${title}入库`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
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
            <Button type="primary" onClick={handleCancel}>
              <Icon type="close-circle-o" />清空
            </Button>
          </Col>
        </Row>
      </div>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="单号"
      >
        {form.getFieldDecorator('cnNo', {
          initialValue: currentItem.cn_no || '',
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
        label="快递代码"
      >
        {form.getFieldDecorator('expressCompanyCode', {
          initialValue: currentItem.express_company_code,
          rules: [{ required: true, message: '请输入快递代码' }],
        })(
          <Input placeholder="请输入快递代码" />
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
      {
        modalType === 'add' ?
        (
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="重量锁定"
          >
            {form.getFieldDecorator('weightremain', {
              defaultChecked: false,
            })(
              <Checkbox>是否锁定重量</Checkbox>
            )}
          </FormItem>
        ) : ''
      }
    </Modal>
  );
};

export default Form.create()(ModalForm);
