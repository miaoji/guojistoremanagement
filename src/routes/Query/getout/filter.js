import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import DateRange from '../../../components/DateRange';
import styles from './index.less';

const FormItem = Form.Item;
const Filter = ({
  handleFormReset,
  handleSearch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
}) => {
  const handleFields = (fields) => {
    const tmp = fields;
    const { createTime } = tmp;
    if (createTime && createTime.length === 2) {
      tmp.startDate = createTime[0].format('YYYY-MM-DD');
      tmp.endDate = createTime[1].format('YYYY-MM-DD');
      delete tmp.createTime;
    }
    return tmp;
  };

  const onFormReset = () => {
    resetFields();
    handleFormReset();
    const fields = getFieldsValue();
    fields.createTime = [];
  };

  const onSearch = (fields) => {
    let item = fields;
    if (!item.createTime) {
      item = getFieldsValue();
    }
    const values = handleFields(item);
    handleSearch({ ...values, createTime: undefined });
  };

  const onTimeChange = (key, values) => {
    const fields = getFieldsValue();
    fields[key] = values;
    onSearch(fields);
  };
  const initialCreateTime = [];

  return (
    <Form layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={5} sm={24}>
          <FormItem label="单号">
            {getFieldDecorator('no')(
              <Input placeholder="按单号搜索" />
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <FormItem label="国内单号">
            {getFieldDecorator('cnno')(
              <Input placeholder="按国内单号搜索" />
            )}
          </FormItem>
        </Col>
        <Col md={9} sm={24}>
          <FormItem label="时间">
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <DateRange onChange={onTimeChange.bind(null, 'createTime')} size="default" />
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="success" onClick={onSearch}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={onFormReset}>重置</Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  handleFormReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Form.create()(Filter);
