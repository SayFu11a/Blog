import React from 'react';
import { Button, Form, Input, Flex, Card } from 'antd';
import { useEditUserMutation } from '../api';

import authService from '../service';
import { useNavigate } from 'react-router-dom';

type formData = {
    email: string;
    password: string;
    username: string;
    image: string;
};

const Profile: React.FC = () => {
    const [form] = Form.useForm();

    const [editUser] = useEditUserMutation();
    const navigate = useNavigate();

    // const {isAuth, token} = useAuth();

    // const [fields, setFields] = useState<FieldData[]>([
    //     { name: ['username'], value: localStorage.getItem('username') },
    //     { name: ['email'], value: localStorage.getItem('email') },
    // ]);

    const onFinish = async (values: formData) => {
        try {
            console.log('Received values of form: ', values);
            const { username, email, password, image } = values;

            const userData = await editUser({
                user: {
                    username,
                    email,
                    password,
                    image,
                    token: localStorage.getItem('token'),
                },
            }).unwrap();

            authService.setAllEditData(userData.user);
            navigate('/articles/0');

            // console.log(token);

            console.log('edit success:', userData);
        } catch (e) {
            console.log('edit feils', e);
        }
    };

    return (
        <Flex align="center" justify="center">
            <Card title="Edit Profile">
                <Form
                    form={form}
                    name="edit"
                    style={{ minWidth: 360 }}
                    // fields={fields}
                    // onFieldsChange={(_, allFields) => {
                    //     setFields(allFields);
                    // }}
                    initialValues={{
                        username: localStorage.getItem('username') || '',
                        email: localStorage.getItem('email') || '',
                    }}
                    onFinish={onFinish}
                >
                    Username
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                min: 3,
                                max: 20,
                                message: 'name must be from 3 to 20 characters ',
                            },
                            {
                                pattern: /^[a-z][a-z0-9]*$/,
                                message:
                                    'You can only use lowercase English letters and numbers, no spase',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    Email
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
                        name="image"
                        rules={[{ type: 'url', message: 'Please enter URL' }]}
                    >
                        <Input type="url" placeholder="Repeat Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Profile;

// https://i09.fotocdn.net/s219/7768774dff8e4faf/gallery_s/3012842686.jpg
