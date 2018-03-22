import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

const Filter = ({ form, handleSearch, handleSearchReset }) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="快递名称">
            {getFieldDecorator('companyName', {
              initialValue: '',
            })(
              <Input placeholder="请输入快递名称" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="快递代码">
            {getFieldDecorator('companyCode', {
              initialValue: '',
            })(
              <Input placeholder="请输入快递代码" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
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
