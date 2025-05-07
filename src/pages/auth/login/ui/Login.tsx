import { FC } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Card } from 'antd';

import { Link } from 'react-router-dom';
import { useLogin } from '../model';

export const Login: FC = () => {
  const { onFinish, isError } = useLogin();

  return (
    <Flex align="center" justify="center">
      <Card title="Sign In">
        <Form name="register" style={{ maxWidth: 360 }} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              {
                min: 6,
                max: 40,
                message: 'The password must be between 6 and 40 characters (inclusive)',
              },
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </Form.Item>
          {isError ? (
            <span style={{ color: 'red', fontSize: '16px' }}>
              email or password: is invalid
            </span>
          ) : null}
        </Form>
      </Card>
    </Flex>
  );
};
