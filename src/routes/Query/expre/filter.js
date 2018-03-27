import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Filter = ({ handleFormReset, handleSearch, form }) => {
  const { getFieldDecorator } = form;
  const onFormReset = () => {
    form.resetFields();
    handleFormReset();
  };
  const onSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      handleSearch(values);
    });
  };
  return (
    <Form onSubmit={onSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="单号">
            {getFieldDecorator('orderNo')(
              <Input placeholder="请输入单号" onPressEnter={onSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="客户编码">
            {getFieldDecorator('customerNo')(
              <Input placeholder="请输入客户编码" onPressEnter={onSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="客户手机号">
            {getFieldDecorator('customerMobile')(
              <Input placeholder="请输入客户手机号" onPressEnter={onSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={onFormReset}>重置</Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(Filter);
