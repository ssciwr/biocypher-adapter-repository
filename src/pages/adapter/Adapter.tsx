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
        name: 'OpenTargetsAdapter',
        version: '1.2.0',
        license: 'MIT',
        lastUpdate: 'Updated 2 weeks ago',
        githubUrl: 'https://github.com/biocypher/open-targets',
        dataSources: [
            { name: 'Target-Disease Associations', percentage: 45.2 },
            { name: 'Drug Information', percentage: 28.7 },
            { name: 'Evidence Data', percentage: 26.1 },
        ],
        downloads: 28500,
        forks: 3968,
        adapters: 2222
    }

    return (
        <div className="adapter-page">
            <Header />

            <div className="adapter-content">
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Card className="adapter-main-content">
                            <div className="adapter-header-in-card">
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

                            <div className="adapter-tabs">
                                <div className="tab-item" 
                                     onClick={() => setActiveTab('model')}
                                     className={`tab-item ${activeTab === 'model' ? 'active' : ''}`}
                                >
                                    <span className="tab-emoji">🧬</span> Model
                                </div>
                                <div className="tab-item" 
                                     onClick={() => setActiveTab('usage')}
                                     className={`tab-item ${activeTab === 'usage' ? 'active' : ''}`}
                                >
                                    <span className="tab-emoji">📚</span> Usage
                                </div>
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