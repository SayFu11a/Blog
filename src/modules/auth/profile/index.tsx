import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Card } from 'antd';
import { useRegisterUserMutation } from '../api';

import authService from '../service';
import { useNavigate, Link } from 'react-router-dom';

type formData = {
    email: string;
    password: string;
    username: string;
    avatarUrl: string;
};

const Profile: React.FC = () => {
    const [number, setNumber] = useState('s');

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(e);
    };

    const onFinish = async (values: formData) => {
        console.log('Received values of form: ', values);
        values.username = '123123';
    };

    return (
        <Flex align="center" justify="center">
            <Card title="Edit Profile">
                <Form name="edit" style={{ minWidth: 360 }} onFinish={onFinish}>
                    Username
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                min: 3,
                                max: 20,
                                message: 'name must be from 3 to 20 characters ',
                            },
                        ]}
                    >
                        {/*  тут не работает автозаполненеи   */}
                        <Input value={number} onChange={onNumberChange} />
                    </Form.Item>
                    <Input value={number} onChange={onNumberChange} /> // а тут работает
                    автозаполненеи Email
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder="Email address" />
                    </Form.Item>
                    Password
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                min: 6,
                                max: 40,
                                message: 'pass must be between 6 and 40 characters',
                            },
                        ]}
                    >
                        <Input type="password" placeholder="Password" />
                    </Form.Item>
                    Avatar image (url)
                    <Form.Item
                        name="avatarUrl"
                        rules={[{ type: 'url', message: 'Please enter URL' }]}
                    >
                        <Input type="url" placeholder="Repeat Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Profile;
