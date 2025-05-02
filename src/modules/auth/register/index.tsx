import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card } from 'antd';
import { useRegisterUserMutation } from '../api';

import authService from '../service';
import { useNavigate, Link } from 'react-router-dom';

type formData = {
    agreement: boolean;
    email: string;
    password: string;
    password2: string;
    username: string;
};

const Register: React.FC = () => {
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const onFinish = async (values: formData) => {
        console.log('Received values of form: ', values);
        try {
            const { username, email, password } = values;
            const userData = await registerUser({
                user: { username, email, password },
            }).unwrap();

            authService.setAllRegisterRespounseDate(userData.user);

            navigate('/articles/0', { replace: true });

            console.log('Registration success:', userData);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Flex align="center" justify="center">
            <Card title="Create new account">
                <Form name="register" style={{ maxWidth: 360 }} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your Username!' },
                            {
                                min: 3,
                                max: 20,
                                message:
                                    'name must be from 3 to 20 characters (inclusive)',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
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
                    <Form.Item
                        name="password2"
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Repeat Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      new Error('Should accept agreement')
                                                  ),
                                    },
                                ]}
                                noStyle
                            >
                                <Checkbox>
                                    I agree to the processing of my personal information
                                </Checkbox>
                            </Form.Item>
                        </Flex>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Create
                        </Button>
                        Already have an account?<Link to="/sign-in">Sing in.</Link>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Register;
