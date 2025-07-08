import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button, Tag, Space, Typography, Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import Header from '../../components/Header'
import ModelCard from './components/ModelCard'
import DataSourcesPanel from './components/DataSourcesPanel'
import DuplicationPanel from './components/DuplicationPanel'
import CookbookTutorials from './components/CookbookTutorials'
import { useAdapterStore } from '../../stores/AdapterStore'
import './Adapter.css'

const { Text, Title } = Typography

const Adapter = observer(() => {
    const { id } = useParams<{ id: string }>()
    const adapterStore = useAdapterStore()
    const [activeTab, setActiveTab] = useState('model')

    // Mock data - replace with actual API call
    const adapterData = {
        name: 'ExampleAdapter',
        version: '2.2.2',
        license: 'MIT',
        lastUpdate: '3/6 win/minimum 2',
        githubUrl: 'https://github.com/biocypher/biocypher-adapter-example',
        dataSources: [
            { name: 'Dataset 1', percentage: 36.7 },
            { name: 'win', percentage: 33.9 },
            { name: 'minimum', percentage: 22.2 },
            { name: '2', percentage: 22.2 }
        ],
        downloads: 222222,
        forks: 3968,
        adapters: 2222
    }

    return (
        <div className="adapter-page">
            <Header />

            <div className="adapter-content">
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <div className="adapter-header">
                            <Space direction="vertical" size={0}>
                                <Text className="adapter-path">
                                    <a href="/overview" style={{ color: '#666', textDecoration: 'none' }}>
                                        🏠 biocypher
                                    </a>
                                    {' / ' + id}
                                </Text>
                                <Title level={2} className="adapter-title">
                                    {adapterData.name}
                                </Title>
                            </Space>
                        </div>

                        <Card className="adapter-main-content">
                            <div className="adapter-tabs">
                                <Button
                                    type={activeTab === 'model' ? 'primary' : 'text'}
                                    onClick={() => setActiveTab('model')}
                                    className="tab-button"
                                >
                                    <span className="tab-emoji">🧬</span> Model
                                </Button>
                                <Button
                                    type={activeTab === 'usage' ? 'primary' : 'text'}
                                    onClick={() => setActiveTab('usage')}
                                    className="tab-button"
                                >
                                    <span className="tab-emoji">📚</span> Usage
                                </Button>
                            </div>

                            <div className="adapter-tab-content">
                                {activeTab === 'model' && (
                                    <ModelCard adapterId={id || ''} />
                                )}
                                {activeTab === 'usage' && (
                                    <div className="usage-content">
                                        <Title level={4}>🚀 Quick Start</Title>
                                        <pre className="code-block">
                            {`pip install biocypher
biocypher use ${id}`}
                      </pre>
                                        <Text>Full documentation available in the tutorials below.</Text>
                                    </div>
                                )}
                            </div>
                        </Card>

                        <CookbookTutorials adapterId={id || ''} />
                    </Col>

                    <Col xs={24} lg={8}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <DataSourcesPanel 
                                dataSources={adapterData.dataSources} 
                                githubUrl={adapterData.githubUrl}
                                version={adapterData.version}
                                license={adapterData.license}
                                lastUpdate={adapterData.lastUpdate}
                            />
                            <DuplicationPanel adapterId={id || ''} />

                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
})

export default Adapter