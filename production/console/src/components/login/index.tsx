import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { userStore } from '../../store/user';
import { fetchLogin } from '../../apis/user';

import './index.css';

const LoginForm = () => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    fetchLogin().then(token => {
      console.log('Success:', values);
      userStore.setToken(token);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-form-wrapper">
      <Form
        name="basic"
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: t('LOGIN.USER_NAME_ERROR_EMPTY') as string,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('LOGIN.USER_NAME_PLACEHOLDER') as string}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('LOGIN.PASSWORD_ERROR_EMPTY') as string,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('LOGIN.PASSWORD_PLACEHOLDER') as string}
          />
        </Form.Item>

        {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {t('LOGIN.SUBMIT')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const LoginSection = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginSection;
