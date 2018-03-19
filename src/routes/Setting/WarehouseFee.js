import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './CustomerList.less';

const FormItem = Form.Item;

@connect(({ warehouseFee, loading }) => ({
  warehouseFee,
  loading: loading.models.warehouseFee,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    onEdit: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'warehouseFee/fetch',
    });
  }

  handleFormEdit = () => {
    this.setState({
      onEdit: false,
    });
  }

  handleFormReset = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'warehouseFee/update',
      payload: {},
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log('11111', fieldsValue);
      const values = {
        ...fieldsValue,
      };

      dispatch({
        type: 'warehouseFee/update',
        payload: values,
      });
    });
  }

  renderForm() {
    const { onEdit } = this.state;
    const { warehouseFee: { data } } = this.props;
    const { getFieldDecorator } = this.props.form;
    /* eslint-disable camelcase */
    const { cargo_fee, expire_time } = data;
    return (
      <Form onSubmit={this.handleFormSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="免仓管费时间">
              {getFieldDecorator('expireTime', {
                initialValue: expire_time,
              })(
                <Input
                  disabled={onEdit}
                  placeholder="请输入天数"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="仓管费计费单位(元/天)">
              {getFieldDecorator('cargoFee', {
                initialValue: cargo_fee,
              })(
                <Input
                  disabled={onEdit}
                  placeholder="请输入仓管费计费单位"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={this.handleFormEdit}>修改</Button>
              <Button htmlType="submit" style={{ marginLeft: 8 }}>保存修改</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    return (
      <PageHeaderLayout title="修改表单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
