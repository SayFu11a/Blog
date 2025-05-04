import { FC, useState } from 'react';
import { Button, Form, Input, Flex, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Article } from '../../../modules/articles/types';

type formData = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

type ArticleFormProps = {
    onFinish: (values: formData) => void;
    title: string;
    article: Article | undefined;
};

interface FieldData {
    name: string | number | (string | number)[];
    value?: string | null | string[];
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const ArticleForm: FC<ArticleFormProps> = ({ onFinish, title, article }) => {
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['title'], value: article ? 'cumm' : '' },
        { name: ['description'], value: article ? 'cumm' : '' },
        { name: ['body'], value: article ? 'cumm' : '' },
        { name: ['tagList'], value: article ? ['cumm'] : '' },
    ]);
    console.log('typeof article', article);

    const conditionalProps =
        typeof article === 'object'
            ? {
                  onFieldsChange: (_, allFields: FieldData[]) => setFields(allFields),
              }
            : {};

    return (
        <Flex align="center" justify="center">
            <Card title={title}>
                <Form
                    name="createArticle"
                    style={{ minWidth: 900 }}
                    fields={fields}
                    {...conditionalProps}
                    onFinish={onFinish}
                >
                    Title
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title!',
                            },
                        ]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    Short description
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: 'Please input your description!' },
                        ]}
                    >
                        <Input placeholder="description" />
                    </Form.Item>
                    Text
                    <Form.Item
                        name="body"
                        rules={[{ required: true, message: 'Please input your text!' }]}
                    >
                        <TextArea placeholder="text" style={{ height: '160px' }} />
                    </Form.Item>
                    <Form.List
                        name="tagList"
                        rules={[
                            {
                                validator: async (_, tagList) => {
                                    if (!tagList || tagList.length < 1) {
                                        return Promise.reject(
                                            new Error('At least 1 tag')
                                        );
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                Tags
                                {fields.map((field, i) => (
                                    <Form.Item required={false} key={i}>
                                        <Form.Item
                                            {...field}
                                            key={i}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Please input passenger's name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="passenger name"
                                                style={{ width: '60%' }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add tag
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default ArticleForm;
