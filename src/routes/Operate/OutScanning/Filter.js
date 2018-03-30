import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

const Filter = ({ form, handleSearch, handleSearchReset }) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="单号">
            {getFieldDecorator('orderNo', {
              initialValue: '',
            })(
              <Input placeholder="请输入单号" onPressEnter={handleSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="货架号">
            {getFieldDecorator('shelfNo', {
              initialValue: '',
            })(
              <Input placeholder="请输入货架号" onPressEnter={handleSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="客户编号">
            {getFieldDecorator('customerNo', {
              initialValue: '',
            })(
              <Input placeholder="请输入客户编号" onPressEnter={handleSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={handleSearchReset}>重置</Button>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(Filter);
