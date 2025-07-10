import { useState } from 'react'
import { Card, Form, Input, Button, Upload, message, Typography, Alert } from 'antd'
import { UploadOutlined, LinkOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { registerAdapter } from '../services/adapterService'

const { Title, Text } = Typography

const Register = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [useFileUpload, setUseFileUpload] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        try {
            const adapterData = {
                name: values.author, // Use author as name for now
                githubUrl: values.githubUrl,
                author: values.author,
                croissantFile: useFileUpload ? values.croissantFile?.[0]?.originFileObj : null,
                croissantUrl: useFileUpload ? null : values.croissantUrl
            }

            await registerAdapter(adapterData)
            message.success('Adapter registered successfully! It will be reviewed before being published.')

            // Redirect to overview page
            navigate('/overview')
        } catch (error) {
            console.error('Registration failed:', error)
            message.error('Failed to register adapter. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Header showRegisterButton={false} />

            <div style={{ padding: '40px 24px' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Card>
                        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
                            Register Your Adapter
                        </Title>

                        <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                            Submit your BioCypher adapter for review. Once approved, it will be available in the adapter repository.
                        </Text>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            size="large"
                        >
                            <Form.Item
                                label="Your Name"
                                name="author"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>

                            <Form.Item
                                label="GitHub Repository URL"
                                name="githubUrl"
                                rules={[
                                    { required: true, message: 'Please enter the GitHub repository URL' },
                                    { type: 'url', message: 'Please enter a valid URL' }
                                ]}
                            >
                                <Input placeholder="https://github.com/username/repository" />
                            </Form.Item>

                            {!useFileUpload ? (
                                <>
                                    <Alert
                                        message="Recommended: Use a URL for your Croissant file"
                                        description="Providing a URL (e.g., from GitHub) is the best way to keep your adapter data in sync. This allows automatic updates when you modify your Croissant file."
                                        type="info"
                                        showIcon
                                        style={{ marginBottom: '16px' }}
                                    />

                                    <Form.Item
                                        label="Croissant File URL"
                                        name="croissantUrl"
                                        rules={[
                                            { required: true, message: 'Please enter the Croissant file URL' },
                                            { type: 'url', message: 'Please enter a valid URL' }
                                        ]}
                                    >
                                        <Input
                                            placeholder="https://github.com/username/repository/blob/main/croissant.json"
                                            prefix={<LinkOutlined />}
                                        />
                                    </Form.Item>

                                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                        <Button
                                            type="link"
                                            onClick={() => setUseFileUpload(true)}
                                            style={{ padding: 0 }}
                                        >
                                            Upload Croissant file instead
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Form.Item
                                        label="Croissant File"
                                        name="croissantFile"
                                        rules={[{ required: true, message: 'Please upload a croissant file' }]}
                                    >
                                        <Upload
                                            maxCount={1}
                                            accept=".json,.jsonld"
                                            beforeUpload={() => false}
                                        >
                                            <Button icon={<UploadOutlined />}>
                                                Upload Croissant File
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                setUseFileUpload(false)
                                                form.resetFields(['croissantFile'])
                                            }}
                                            style={{ padding: 0 }}
                                        >
                                            Use URL instead (recommended)
                                        </Button>
                                    </div>
                                </>
                            )}

                            <Form.Item style={{ marginTop: '32px' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    size="large"
                                    block
                                >
                                    Register Adapter
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Register
