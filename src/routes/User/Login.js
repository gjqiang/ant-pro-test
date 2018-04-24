import React, { Component } from 'react';
import { connect } from 'dva';
import Cookies from 'js-cookie';
import compose from 'recompact/compose';
import { Link, routerRedux } from 'dva/router';
import { Input, Icon, Form, Button } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

const enhance = compose(
  connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
  })),
  Form.create(),
);

@enhance

export default class LoginPage extends Component {
  handleSubmit(err, values) {

    const {
      dispatch,
      form: { validateFields },
    } = this.props;


    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
          },
        }).then(res => {
          if (res.code === 1) {
            Cookies.set('wlrs', 'true')
            dispatch(routerRedux.push('/'));
          }
        })
      }
    })
  };

  render() {
    const {
      login, submitting,
      form: { getFieldDecorator },
    } = this.props;

    console.log(this.props)

    return (
      <div className={styles.loginpagewrap}>
        <div className={styles.box}>
          <div className={styles.loginWrap}>
            <p style={{ marginBottom: '30px' }}>未来人生后台管理系统</p>
            <Form>
              <FormItem
                label="账号"
              >
                {getFieldDecorator('mobileNum', {
                  rules: [{ required: true, message: '请输入账号' }],
                })(
                  <Input placeholder="请输入管理员账号" />,
                )}
              </FormItem>
              <FormItem
                label="密码"
              >
                {getFieldDecorator('userPassword', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input type="password" placeholder="请输入密码" />,
                )}
              </FormItem>

              <Button type="primary" htmlType="submit" loading={submitting} style={{ width: '100%' }} onClick={() => this.handleSubmit()}>
                登陆
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
