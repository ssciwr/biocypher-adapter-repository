import { Card, Typography, Space, Divider, Tag, Spin } from 'antd'
import { GithubOutlined, BookOutlined, DatabaseOutlined, UserOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { getAdapterDetails, type AdapterDetails } from '../../../services/adapterService'

const { Title, Text } = Typography

interface ModelCardProps {
    adapterId: string
}

const ModelCard: React.FC<ModelCardProps> = ({ adapterId }) => {
    const [adapterDetails, setAdapterDetails] = useState<AdapterDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)
            try {
                const details = await getAdapterDetails(adapterId)
                setAdapterDetails(details)
            } catch (error) {
                console.error('Failed to fetch adapter details:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()
    }, [adapterId])

    if (loading) {
        return (
            <Card className="model-card">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: '16px' }}>
                        <Text type="secondary">Loading adapter details...</Text>
                    </div>
                </div>
            </Card>
        )
    }

    if (!adapterDetails) {
        return (
            <Card className="model-card">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Text type="secondary">No adapter details available</Text>
                </div>
            </Card>
        )
    }

    return (
        <Card className="model-card">
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div>
                    <Title level={4} className="section-header">📋 Model Overview</Title>
                    <Text className="model-description">
                        This adapter provides seamless integration with {adapterId} database, enabling efficient data transformation and loading for bioinformatics workflows.
                        The adapter supports multiple data formats and provides comprehensive mapping to BioCypher's knowledge graph structure.
                    </Text>
                </div>

                <Divider />

                <div>
                    <Title level={5} className="section-header">🔧 Technical Details</Title>
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Component Type:</Text>
                            <Tag color="blue">{adapterDetails.componentType}</Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Granularity:</Text>
                            <Tag color={adapterDetails.adapterGranularity === 'Primary' ? 'green' : 'orange'}>
                                {adapterDetails.adapterGranularity}
                            </Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Input Format:</Text>
                            <Tag color="purple">{adapterDetails.adapterInputFormat}</Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Resource Type:</Text>
                            <Tag color="cyan">{adapterDetails.resourceType}</Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Data Type:</Text>
                            <Tag color="magenta">{adapterDetails.dataType}</Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>Resource URL:</Text>
                            <Tag color={adapterDetails.resourceUrl === 'Y' ? 'green' : adapterDetails.resourceUrl === 'broken' ? 'red' : 'default'}>
                                {adapterDetails.resourceUrl}
                            </Tag>
                        </div>
                        {adapterDetails.assignee && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text strong>Assignee:</Text>
                                <Tag icon={<UserOutlined />} color="geekblue">{adapterDetails.assignee}</Tag>
                            </div>
                        )}
                    </Space>
                </div>

                <div>
                    <Title level={5} className="section-header">🚀 Quick Example</Title>
                    <pre className="code-example code-block-base">
{`from biocypher import BioCypher
from biocypher_${adapterId.replace('-', '_')} import ${adapterId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Adapter

# Initialize BioCypher
bc = BioCypher()

# Load ${adapterId} adapter
adapter = ${adapterId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Adapter()
bc.add_adapter(adapter)

# Run pipeline
bc.run()`}
                    </pre>
                </div>
            </Space>
        </Card>
    )
}

export default ModelCard
