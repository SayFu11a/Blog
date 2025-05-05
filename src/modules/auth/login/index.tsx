import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Card } from 'antd';
import { useLogInUserMutation } from '../api';

import authService from '../service';
import { Link, useNavigate } from 'react-router-dom';

type formData = {
    email: string;
    password: string;
    username: string;
};

const Login: React.FC = () => {
    const [loginUser] = useLogInUserMutation();
    const navigate = useNavigate();

    const onFinish = async (values: formData) => {
        console.log('Received values of form: ', values);
        try {
            const { email, password } = values;
            const userData = await loginUser({
                user: { email, password },
            }).unwrap();

            authService.setAllLoginRespounseDate(userData.user);

            navigate('/articles/0');

            console.log('login success:', userData);
        } catch (error) {
            console.error('login failed:', error);
        }
    };

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
                                message:
                                    'The password must be between 6 and 40 characters (inclusive)',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Login
                        </Button>
                        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Login;
